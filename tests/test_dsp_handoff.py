"""Exercise current DSP semantics using independent captured device readbacks."""
import asyncio
from copy import deepcopy
import json
from pathlib import Path
from unittest.mock import AsyncMock
from urllib.parse import parse_qs, quote_plus, urlsplit

import pytest
from homeassistant.exceptions import HomeAssistantError
from custom_components.eversolo.api import EversoloApiClient, EversoloApiClientError
from custom_components.eversolo.peq import editable, merge_settings, async_profile_command, revision
from test_peq import make_editor

EVIDENCE = Path(__file__).parent / 'fixtures'


def captured_profile():
    """Load the captured device profile."""
    return json.loads((EVIDENCE / 'dsp-correction-profile.json').read_text())


def test_mode_only_delta_preserves_unequal_banks_and_unknown_fields():
    """Mode only delta preserves unequal banks and unknown fields."""
    before = captured_profile()
    settings = editable(before)
    settings['settingType'] = 1 - before['settingType']
    result = merge_settings(before, settings)
    expected = deepcopy(before)
    expected['settingType'] = settings['settingType']
    assert result == expected
    assert before['audioTunningEQList'] != before['audioTunningEQListRight']


def test_concurrent_stages_shared_loudness_and_mono_right_correction():
    """Concurrent stages shared loudness and mono right correction."""
    before = captured_profile()
    settings = editable(before)
    settings.update(settingType=0, loudness=1, enableEQ=True, enableGeq=True,
                    enablePeqLeftFir=True, enablePeqRightFir=True, enableLeftFir=True)
    settings['peqFirListRight'][0]['gain'] = 7.5
    settings['eqGeqGainBeansRight'][0]['gain'] = -3.5
    result = merge_settings(before, settings)
    assert result['peqFirListRight'][0]['gain'] == 7.5
    assert result['eqGeqGainBeansRight'][0]['gain'] == -3.5
    for key in ['audioTunningEQList', 'audioTunningEQListRight', 'peqFirList', 'eqGeqGainBeans',
                'loudnessRight', 'enableLoudness', 'enableLoudnessRight']:
        assert result[key] == before[key]


@pytest.mark.parametrize(('field','value'), [('fc',20),('fc',20000),('q',100),('gain',-15),('gain',15),('volume',-300),('volume',120),('bypass',True)])
def test_observed_bounds_and_experimental_bypass_round_trip(field, value):
    """Observed bounds and experimental bypass round trip."""
    before = captured_profile()
    settings = editable(before)
    settings['audioTunningEQList'][0][field] = value
    result = merge_settings(before, settings)
    assert result['audioTunningEQList'][0][field] == value
    assert result['audioTunningEQListRight'] == before['audioTunningEQListRight']


def test_geq_frequency_and_invalid_correction_type_are_rejected():
    """Geq frequency and invalid correction type are rejected."""
    before = captured_profile()
    for key, field, value in [('eqGeqGainBeans','freq',30),('peqFirList','type',10)]:
        settings = editable(before)
        settings[key][0][field] = value
        with pytest.raises(HomeAssistantError):
            merge_settings(before, settings)


def test_file_and_import_queries_encode_returned_paths_once():
    """File and import queries encode returned paths once."""
    async def scenario():
        client = EversoloApiClient('device',9529,None)
        path = 'flash:///FIR Filters/L & R + 50% café.wav'
        client._api_wrapper = AsyncMock(return_value={'code':0,'data':{'list':[], 'total':0}})
        await client.async_get_fir_files('flash:///FIR Filters',7,1000)
        query = parse_qs(urlsplit(client._api_wrapper.call_args.kwargs['url']).query)
        assert query == {'url':['flash:///FIR Filters'],'sort':['7'],'startIndex':['1000'],'requestCount':['1000']}
        client._api_wrapper.return_value = {'status':200}
        await client.async_import_eq_fir(9,1,path)
        assert parse_qs(urlsplit(client._api_wrapper.call_args.kwargs['url']).query) == {'id':['9'],'type':['1'],'path':[path]}
        with pytest.raises(EversoloApiClientError):
            await client.async_get_fir_files('smb://remote')
        client._api_wrapper.return_value = None
        with pytest.raises(EversoloApiClientError):
            await client.async_get_fir_files('/')
    asyncio.run(scenario())


def test_fir_import_conflict_and_no_output_assignment():
    """Fir import conflict and no output assignment."""
    async def scenario():
        coordinator, client, profiles, _ = make_editor()
        client.async_import_eq_fir = AsyncMock()
        token = revision(profiles[5])
        payload = {'profile_id': 5,'revision': token,'channel': 1,'path': 'flash:///test.wav'}
        await async_profile_command(coordinator,'import_fir',payload)
        client.async_import_eq_fir.assert_awaited_once_with(5,1,'flash:///test.wav')
        client.async_save_eq_profile.assert_not_awaited()
        client.async_set_eq_output.assert_not_awaited()
        profiles[5]['balance'] = 1
        with pytest.raises(HomeAssistantError,match='changed'):
            await async_profile_command(coordinator,'import_fir',payload)
        assert client.async_import_eq_fir.await_count == 1
    asyncio.run(scenario())


def test_http_transport_preserves_encoded_file_and_import_paths():
    """Keep escaped slashes intact at the actual HTTP session boundary."""
    from types import SimpleNamespace
    from unittest.mock import Mock
    from yarl import URL

    async def scenario():
        response = SimpleNamespace(status=200, raise_for_status=Mock(), json=AsyncMock())
        session = SimpleNamespace(request=AsyncMock(return_value=response))
        client = EversoloApiClient("192.0.2.10", 9529, session)
        response.json.return_value = {"code": 0, "data": {"list": [], "total": 0}}
        for path in ("/", "flash://", "flash:///FIR Filters/L & R + 50% café"):
            await client.async_get_fir_files(path)
            url = session.request.call_args.kwargs["url"]
            assert isinstance(url, URL)
            assert "url=" + quote_plus(path) in url.raw_query_string
            assert parse_qs(url.raw_query_string)["url"] == [path]
        response.json.return_value = {"status": 200}
        path = "flash:///FIR Filters/L & R + 50% café.wav"
        await client.async_import_eq_fir(9, 1, path)
        url = session.request.call_args.kwargs["url"]
        assert "flash%3A%2F%2F%2F" in url.raw_query_string
        assert parse_qs(url.raw_query_string)["path"] == [path]
    asyncio.run(scenario())


@pytest.mark.parametrize('key', ['peqFirList', 'peqFirListRight'])
@pytest.mark.parametrize('code', range(2, 10))
def test_correction_supports_same_filter_codes_as_peq(key, code):
    """Accept the shared PEQ filter codes in both correction banks."""
    before = captured_profile()
    settings = editable(before)
    settings[key][0]['type'] = code
    result = merge_settings(before, settings)
    assert result[key][0]['type'] == code
    assert result['audioTunningEQList'] == before['audioTunningEQList']


@pytest.mark.parametrize('key', ['eqGeqGainBeans', 'eqGeqGainBeansRight'])
@pytest.mark.parametrize('gain', [-20, 20])
def test_geq_gain_limits(key, gain):
    """Accept both GEQ gain endpoints in each channel."""
    before = captured_profile()
    settings = editable(before)
    settings[key][0]['gain'] = gain
    assert merge_settings(before, settings)[key][0]['gain'] == gain


@pytest.mark.parametrize('gain', [-20.1, 20.1])
def test_geq_rejects_gain_outside_limits(gain):
    """Reject GEQ gain beyond its supported interval."""
    before = captured_profile()
    settings = editable(before)
    settings['eqGeqGainBeans'][0]['gain'] = gain
    with pytest.raises(HomeAssistantError):
        merge_settings(before, settings)
