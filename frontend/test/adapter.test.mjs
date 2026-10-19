import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'vite';

const result = await build({ logLevel: 'silent', build: { write: false,
  lib: { entry: 'src/adapter.ts', formats: ['es'] }, minify: false } });
const code = (Array.isArray(result) ? result[0] : result).output.find(item => item.type === 'chunk').code;
const adapter = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const band = { fc: 1000, gain: 6, q: 1, volume: -60, bypass: false, type: 6 };

test('Eversolo Peak=6 maps to DSPi Peaking=1 without leaking enum codes', () => {
  assert.equal(adapter.toUiBand(band).type, 1);
  assert.equal(adapter.patchBand(band, { type: 1, frequency: 500 }).type, 6);
  assert.equal(adapter.patchBand(band, { frequency: 500 }).fc, 500);
  assert.throws(() => adapter.patchBand(band, { type: 2 }), /Unverified/);
});
test('unknown device filter remains distinct from every DSPi filter', () => {
  const unknown = { ...band, type: 2 };
  assert.equal(adapter.toUiBand(unknown).type, 1002);
  assert.equal(adapter.patchBand(unknown, { gain: 3 }).type, 2);
  assert.equal(adapter.preview({ audioTunningEQList: [unknown] }, 0), null);
});
test('preamp scaling, bypass, and left/right previews are independent', () => {
  const settings = { enableEQ: true, enableEQRight: true,
    audioTunningEQList: [{ ...band, bypass: true }],
    audioTunningEQListRight: [{ ...band, gain: 0, volume: -30 }] };
  assert.equal(adapter.preamp(settings, 0), -6);
  assert.ok(adapter.preview(settings, 0).every(value => value === -6));
  assert.ok(adapter.preview(settings, 1).every(value => Math.abs(value + 3) < 1e-8));
  assert.ok(adapter.preview({ ...settings, enableEQ: false }, 0).every(value => value === -6));
});
test('peak response approaches its gain at center and is finite over the plot', () => {
  const points = adapter.preview({ audioTunningEQList: [{ ...band, volume: 0 }] }, 0);
  assert.equal(points.length, 201);
  assert.ok(points.every(Number.isFinite));
  assert.ok(Math.max(...points) > 5.9 && Math.max(...points) <= 6.01);
});

test('disabled stages and neutral preamp/balance disappear from the stack', () => {
  const settings = { audioTunningEQList: [{ ...band, volume: 0 }], enableEQ: false, balance: 0, loudness: 0 };
  const processing = { firEnabled: { left: false, right: false }, hasFir: true, hasLoudness: true };
  assert.deepEqual(adapter.processingStages(settings, 0, processing), []);
  settings.enableEQ = true;
  assert.deepEqual(adapter.processingStages(settings, 0, processing).map(stage => stage.id), ['peq']);
});

test('FIR log-frequency points interpolate in dB and reject unavailable data', () => {
  const curve = { loaded: true, coordinate: 'log10_hz', points: [{ x: Math.log10(20), y: -2 }, { x: Math.log10(20000), y: 2 }] };
  const response = adapter.firResponse(curve);
  assert.equal(response.length, 201);
  assert.ok(Math.abs(response[100]) < 1e-9);
  assert.ok(Math.abs(response[0] + 2) < 1e-9);
  assert.ok(Math.abs(response[200] - 2) < 1e-9);
  assert.equal(adapter.firResponse({ ...curve, loaded: false }), null);
  assert.equal(adapter.firResponse({ ...curve, coordinate: 'unknown' }), null);
});

test('loudness illustration is present only when enabled and never alters the numerical sum', () => {
  const settings = { audioTunningEQList: [band], enableEQ: true, loudness: 1, balance: -2 };
  const stages = adapter.processingStages(settings, 1);
  const loudness = adapter.processingStages(settings, 0).find(stage => stage.id === 'loudness');
  assert.ok(loudness.illustrative);
  assert.equal(loudness.points, null);
  const sum = adapter.sumStages([loudness]);
  assert.ok(sum.points.every(value => value === 0));
  assert.deepEqual(sum.omitted, ['Loudness']);
  assert.ok(stages.find(stage => stage.id === 'balance').points.every(value => value === -2));
  assert.ok(stages.find(stage => stage.id === 'loudness'));
  settings.loudness = 0;
  assert.ok(!adapter.processingStages(settings, 0).some(stage => stage.id === 'loudness'));
});

test('FIR belongs to the enabled channel only and adds once to the known response', () => {
  const settings = { audioTunningEQList: [{ ...band, gain: 0 }], enableEQ: true, loudness: 0 };
  const processing = { firEnabled: { left: true, right: false }, hasFir: true, hasLoudness: true };
  const fir = { loaded: true, coordinate: 'log10_hz', points: [{ x: 1, y: 2 }, { x: 5, y: 2 }] };
  const left = adapter.processingStages(settings, 0, processing, fir);
  assert.deepEqual(left.map(stage => stage.id), ['preamp', 'peq', 'fir']);
  assert.ok(adapter.sumStages(left).points.every(value => Math.abs(value + 4) < 1e-8));
  assert.ok(!adapter.processingStages(settings, 1, processing, fir).some(stage => stage.id === 'fir'));
});

test('unmapped filters and unavailable FIR are omitted; positive balance attenuates left', () => {
  const settings = { audioTunningEQList: [{ ...band, type: 2 }], enableEQ: true, balance: 2 };
  const processing = { firEnabled: { left: true, right: false }, hasFir: true, hasLoudness: true };
  const result = adapter.sumStages(adapter.processingStages(settings, 0, processing));
  assert.deepEqual(result.omitted, ['PEQ', 'FIR']);
  assert.ok(result.points.every(value => value === -8));
  const right = adapter.processingStages(settings, 1, processing).find(stage => stage.id === 'balance');
  assert.ok(right.points.every(value => value === 0));
});

test('the displayed processing pipeline is preamp, balance, PEQ, FIR, then loudness', () => {
  const settings = { audioTunningEQList: [band], enableEQ: true, balance: -2, loudness: 1 };
  const processing = { firEnabled: { left: true, right: false }, hasFir: true, hasLoudness: true };
  assert.deepEqual(adapter.processingStages(settings, 0, processing).map(stage => stage.id),
    ['preamp', 'balance', 'peq', 'fir', 'loudness']);
});


test('all-pass contributes unity magnitude without blocking other bands or changing preamp', () => {
  const settings = {enableEQ: true, audioTunningEQList: [band, {...band, type: 9, gain: -15}]};
  assert.deepEqual(adapter.preview(settings, 0), adapter.preview({...settings, audioTunningEQList: [band]}, 0));
  const allpass = adapter.processingStages({...settings, audioTunningEQList: [{...band, type: 9}]}, 0).find(stage => stage.id === 'peq');
  assert.ok(allpass.points.every(value => value === 0));
});

test('balance attenuates the opposite channel with both signs', () => {
  for (const [balance, left, right] of [[-6, 0, -6], [6, -6, 0], [-2.5, 0, -2.5], [2.5, -2.5, 0]]) {
    for (const [channel, expected] of [[0, left], [1, right]]) {
      const stage = adapter.processingStages({balance}, channel).find(stage => stage.id === 'balance');
      assert.ok(stage.points.every(value => value === expected));
    }
  }
});


test('GEQ interpolates selected bank gains without accumulating overlapping cuts', () => {
  const gains = [{freq: 1000, gain: 6}, {freq: 2500, gain: -3}];
  const settings = { enableGeq: true, enableGeqRight: true,
    eqGeqGainBeans: gains, eqGeqGainBeansRight: gains.map(b => ({...b, gain: 0})) };
  const stage = adapter.processingStages(settings, 0).find(s => s.id === 'geq');
  const expected = adapter.geqResponse(gains);
  assert.deepEqual(stage.points, expected);
  assert.ok(adapter.processingStages(settings, 1).find(s => s.id === 'geq').points.every(v => Math.abs(v) < 1e-10));
  assert.deepEqual(adapter.sumStages([stage]).points, expected);
  assert.ok(!adapter.processingStages({...settings, enableGeq:false}, 0).some(s => s.id === 'geq'));
});


test('equal GEQ gains are flat across the entire range, including edges', () => {
  const frequencies = [25,40,63,100,160,250,400,630,1000,1600,2500,4000,6300,10000,16000];
  for (const gain of [-15, 0, 15]) {
    const points = adapter.geqResponse(frequencies.map(freq => ({freq, gain})));
    assert.equal(points.length, 201);
    assert.ok(points.every(point => point === gain));
  }
  assert.equal(adapter.geqResponse([]), null);
});

test('GEQ transitions stay within adjacent slider gains without overshoot', () => {
  const points = adapter.geqResponse([{freq:25,gain:-15},{freq:1000,gain:15},{freq:16000,gain:-15}]);
  assert.ok(points.every(value => Number.isFinite(value) && value >= -15 && value <= 15));
  assert.equal(points[0], -15);
  assert.equal(points.at(-1), -15);
});

test('Mono preview uses left EQ banks while preserving independent FIR and stored right settings', () => {
  const settings = {settingType:0, enableEQ:true, enableEQRight:false,
    audioTunningEQList:[{...band,gain:2}], audioTunningEQListRight:[{...band,gain:-8}],
    enableGeq:true, enableGeqRight:false, eqGeqGainBeans:[{freq:1000,gain:4}], eqGeqGainBeansRight:[{freq:1000,gain:-4}],
    enablePeqLeftFir:true, enablePeqRightFir:false, peqFirList:[{...band,gain:3,volume:0}], peqFirListRight:[{...band,gain:-3}],
    enableLeftFir:true, enableRightFir:false};
  const before = structuredClone(settings);
  const routed = adapter.responseSettings(settings,1);
  assert.deepEqual(routed.audioTunningEQListRight,settings.audioTunningEQList);
  assert.deepEqual(routed.eqGeqGainBeansRight,settings.eqGeqGainBeans);
  assert.deepEqual(routed.peqFirListRight,settings.peqFirList);
  assert.equal(routed.enableRightFir,false);
  for (const id of ['peq','geq','correction','preamp']) {
    const left = adapter.processingStages(settings,0).find(s=>s.id===id);
    const right = adapter.processingStages(settings,1).find(s=>s.id===id);
    assert.deepEqual(right.points,left.points);
  }
  assert.ok(!adapter.processingStages(settings,1).some(s=>s.id==='fir'));
  assert.deepEqual(settings,before);
  assert.equal(adapter.responseSettings({...settings,settingType:1},1).audioTunningEQListRight,settings.audioTunningEQListRight);
});


test('preview cards follow the control tab order with balance beside preamp', () => {
  const settings = { audioTunningEQList:[band], enableEQ:true, balance:2, enableGeq:true,
    eqGeqGainBeans:[{freq:1000,gain:1}], enablePeqLeftFir:true, peqFirList:[band], enableLeftFir:true, loudness:1 };
  assert.deepEqual(adapter.processingStages(settings,0).map(stage=>stage.id),
    ['preamp','balance','geq','peq','correction','fir','loudness']);
});


test('enabled correction has its own GEQ-style preview and is omitted when disabled', () => {
  const correction = [{...band, fc:100, gain:3, volume:-20}, {...band, fc:1000, gain:-4, volume:-20}];
  const settings = {enablePeqLeftFir:true, peqFirList:correction};
  const stage = adapter.processingStages(settings,0).find(s=>s.id==='correction');
  assert.equal(stage.label,'Correction PEQ');
  const expected = adapter.geqResponse(correction.map(b=>({freq:b.fc,gain:b.gain}))).map(p=>p-2);
  assert.deepEqual(stage.points,expected);
  assert.deepEqual(adapter.sumStages([stage]).points,expected);
  assert.ok(!adapter.processingStages({...settings,enablePeqLeftFir:false},0).some(s=>s.id==='correction'));
  assert.ok(!adapter.processingStages(settings,1).some(s=>s.id==='correction'));
});
