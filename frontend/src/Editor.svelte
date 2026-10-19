<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import Panel from './components/chrome/Panel.svelte';
  import BankCycle from './components/chrome/BankCycle.svelte';
  import BandsPanel from './components/eq/BandsPanel.svelte';
  import LoudnessReference from './components/eq/LoudnessReference.svelte';
  import PreampPanel from './components/eq/PreampPanel.svelte';
  import ProcessingResponse from './components/eq/ProcessingResponse.svelte';
  import { FilterType, type ChannelId, type FilterParams } from './domain';
  import { bandKey, enableKey, loudnessKey, channelName, apiSettings, retainFilterGains, clone, channelBands, preamp, toUiBand, patchBand, setBandEnabled, resetBand,
    type Hass, type PanelInfo, type Profile, type Settings, type Snapshot, type FirCurves } from './adapter';

  const { hass, panel }: { hass: Hass; panel: PanelInfo } = $props();
  let catalog = $state<Snapshot>({ profiles: [], outputs: [] });
  let profile = $state<Profile | null>(null);
  let draft = $state<Settings>({});
  let channel = $state<ChannelId>(0);
  let peqChannel = $state<ChannelId>(0);
  let correctionChannel = $state<ChannelId>(0);
  let geqChannel = $state<ChannelId>(0);
  const stereo = $derived(draft.settingType === 1);
  let correction = $state(false);
  const editorChannel = $derived(correction ? correctionChannel : !stereo ? 0 : peqChannel);
  const gainKey = $derived(!stereo || geqChannel === 0 ? 'eqGeqGainBeans' : 'eqGeqGainBeansRight');
  const geqEnable = $derived(!stereo || geqChannel === 0 ? 'enableGeq' : 'enableGeqRight');
  const editKey = $derived(correction ? (editorChannel === 0 ? "peqFirList" : "peqFirListRight") : bandKey(editorChannel));
  const editEnableKey = $derived(correction ? (editorChannel === 0 ? "enablePeqLeftFir" : "enablePeqRightFir") : enableKey(editorChannel));
  let files = $state<{name: string; url: string; fileType: number; size?: number}[]>([]);
  let fileTrail = $state<string[]>([]);
  let fileUrl = $state("/");
  let fileSort = $state(0);
  let fileStart = $state(0);
  let fileTotal = $state(0);
  let selectedFileUrl = $state('');
  let fileFilter = $state('');
  const selectedFile = $derived(files.find(item => item.url === selectedFileUrl && item.fileType !== 0 && item.name.toLowerCase().endsWith('.wav')));
  const visibleFiles = $derived(files.filter(item => item.name.toLowerCase().includes(fileFilter.toLowerCase())));
  let directoryPath = $state('/');
  async function openDirectory() {
    const path = directoryPath.trim();
    const url = path === '/' ? '/' : path === 'flash://' ? path : path.startsWith('flash:///') ? path : 'flash:///' + path.replace(/^\/+/, '');
    await browse(url);
    const parts = url.startsWith('flash:///') ? url.slice(9).split('/').filter(Boolean) : [];
    fileTrail = url === '/' ? [] : ['/', ...(url === 'flash://' ? [] : ['flash://']), ...parts.slice(0, -1).map((_, index) => 'flash:///' + parts.slice(0, index + 1).join('/'))];
  }
  function dismissFilePicker(event: MouseEvent) {
    if (event.target !== fileDialog || !fileDialog) return;
    const rect = fileDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) fileDialog.close();
  }
  async function enterFolder(url: string) {
    const parent = fileUrl;
    await browse(url);
    fileTrail = [...fileTrail, parent];
  }
  async function ancestorFolder(index: number) {
    const url = fileTrail[index];
    if (!url) return;
    await browse(url);
    fileTrail = fileTrail.slice(0, index);
  }
  function fileSize(bytes: number | undefined) {
    if (bytes === undefined) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  let importChannel = $state<0 | 1>(0);
  let fileDialog = $state<HTMLDialogElement>();
  let importHistory = $state<Record<string, string>>({});
  async function browse(url = "/", start = 0) {
    const result = await request<{list: typeof files; total: number}>("files", {url, sort: fileSort, start});
    files = result.list.filter(item => item.url === "flash://" || item.url.startsWith("flash:///"));
    fileUrl = url; directoryPath = url; fileStart = start; fileTotal = result.total; selectedFileUrl = ''; fileFilter = '';
  }
  async function openFiles(bank: 0 | 1) {
    if (dirty) { error = "Save or discard profile edits before importing FIR."; return; }
    importChannel = bank; fileTrail = [];
    await run(async () => { await browse(); fileDialog?.showModal(); });
  }
  async function importFir(item: {name: string; url: string}) {
    if (!profile) return;
    const id = profile.id;
    const result = await request<Profile>("import_fir", {profile_id: id, revision: profile.revision, channel: importChannel, path: item.url});
    importHistory[`${id}:${importChannel}`] = item.name;
    accept(result); await refreshFir(); fileDialog?.close(); status = "FIR Imported";
  }
  let section = $state('peq');
  let previewRequest = $state<{ stage: string | null; serial: number }>({ stage: null, serial: 0 });
  function chooseSection(id: string) {
    if (id === 'peq' || id === 'correction') {
      selectedRows[editKey] = selectedBand;
      correction = id === 'correction';
      const nextKey = correction ? (correctionChannel === 0 ? 'peqFirList' : 'peqFirListRight') : bandKey(stereo ? peqChannel : 0);
      selectedBand = selectedRows[nextKey] ?? 0;
    }
    section = id;
    previewRequest = { stage: id === 'peq' ? 'peq' : id === 'correction' ? 'correction' : id === 'fir' ? 'fir' : id === 'geq' ? 'geq' : null, serial: previewRequest.serial + 1 };
  }
  let entityName = $state('');
  let profileToolbar = $state<HTMLDivElement>();
  let profileSelector = $state<HTMLLabelElement>();
  let profileActions = $state<HTMLDivElement>();
  let toolbarWrapped = $state(false);
  let reloadDialog = $state<HTMLDialogElement>();
  let pendingDraftAction: (() => void) | null = null;
  let discardLabel = $state('Discard And Reload');
  function confirmDraftAction(action: () => void, label = 'Discard And Reload') {
    if (busy) return;
    if (!dirty) { action(); return; }
    pendingDraftAction = action;
    discardLabel = label;
    reloadDialog?.showModal();
  }
  function cancelDraftAction() { pendingDraftAction = null; reloadDialog?.close(); }
  function acceptDraftAction() {
    const action = pendingDraftAction;
    pendingDraftAction = null;
    reloadDialog?.close();
    action?.();
  }
  let busy = $state(false);
  const autoSaveStorageKey = untrack(() => `eversolo:${panel.config.entry_id}:auto-save`);
  function readAutoSave(): boolean {
    try { return localStorage.getItem(autoSaveStorageKey) === 'true'; }
    catch { return false; }
  }
  let autoSave = $state(readAutoSave());
  $effect(() => {
    const value = autoSave;
    try { localStorage.setItem(autoSaveStorageKey, String(value)); }
    catch {}
  });
  let draggingRange = $state(false);
  $effect(() => {
    const serialized = JSON.stringify(apiSettings(draft));
    const id = profile?.id;
    if (!autoSave || !dirty || busy || stale || draggingRange) return;
    const timer = setTimeout(() => {
      untrack(() => {
        if (!autoSave || !dirty || busy || stale || draggingRange || profile?.id !== id || JSON.stringify(apiSettings(draft)) !== serialized) return;
        void run(async () => {
          try { await save(); }
          catch (err) { autoSave = false; throw err; }
        });
      });
    }, 200);
    return () => clearTimeout(timer);
  });
  let polling = false;
  let commandVersion = 0;
  let disabledGains = $state<Record<string, {gain: number; type: number}>>({});
  const bandId = (key: string, index: number) => `${profile?.id}:${key}:${index}`;
  const previewSettings = $derived.by(() => {
    const value = clone(draft);
    for (const key of ['audioTunningEQList', 'audioTunningEQListRight', 'peqFirList', 'peqFirListRight'] as const)
      value[key] = value[key]?.map((band, index) => ({...band, bypass: bandId(key, index) in disabledGains}));
    return value;
  });
  let error = $state('');
  let status = $state('Loading Profile…');
  $effect(() => {
    if (status !== 'Saved And Verified On Device') return;
    const timer = setTimeout(() => status = 'No Unsaved Changes', 3000);
    return () => clearTimeout(timer);
  });
  function toggleAutoSave() {
    autoSave = !autoSave;
    status = autoSave ? 'Auto Save On' : 'Auto Save Off';
  }
  let selectedBand = $state(0);
  let selectedRows = $state<Record<string, number>>({});
  let dialog = $state<HTMLDialogElement>();
  let modal = $state<'create' | 'save_as' | 'rename' | 'delete'>('create');
  let name = $state('');
  let stale = $state(false);
  let fir = $state<FirCurves | null>(null);
  let firError = $state('');
  let firMaster = $state(false);
  let firChoices = $state({left: false, right: false});
  function setFirMaster(enabled: boolean) {
    if (busy) return;
    if (!enabled) firChoices = {left: draft.enableLeftFir ?? false, right: draft.enableRightFir ?? false};
    firMaster = enabled;
    if (draft.enableLeftFir !== undefined) draft.enableLeftFir = enabled && firChoices.left;
    if (draft.enableRightFir !== undefined) draft.enableRightFir = enabled && firChoices.right;
  }
  function setFirChannel(bank: 'left' | 'right', enabled: boolean) {
    if (busy || !firMaster) return;
    firChoices[bank] = enabled;
    draft[bank === 'left' ? 'enableLeftFir' : 'enableRightFir'] = enabled;
  }
  let alive = true;
  const currentFir = $derived(fir?.profile_id === profile?.id && fir?.revision === profile?.revision ? fir : null);
  const dirty = $derived(profile !== null && JSON.stringify(apiSettings(draft)) !== JSON.stringify(apiSettings(profile.settings)));
  const bands = $derived(draft[editKey] ?? []);
  const uiBands = $derived(bands.map((band, index) => toUiBand({...band, ...disabledGains[bandId(editKey, index)], bypass: bandId(editKey, index) in disabledGains})));
  const currentBand = $derived(bands[selectedBand] ? {...bands[selectedBand], ...disabledGains[bandId(editKey, selectedBand)]} : undefined);
  const preampDb = $derived((bands[0]?.volume ?? 0) / 10);

  function request<T>(operation: string, payload = {}): Promise<T> {
    return hass.callWS<T>({ type: 'eversolo/eq', entry_id: panel.config.entry_id, operation, payload });
  }
  async function run(action: () => Promise<void>) {
    if (busy) return;
    commandVersion++; busy = true; error = '';
    try { await action(); }
    catch (err) { error = err instanceof Error ? err.message : String((err as { message?: string })?.message ?? err); status = 'Request Needs Attention'; }
    finally { busy = false; }
  }
  async function snapshot() {
    catalog = await request<Snapshot>('snapshot');
    try {
      const registry = await hass.callWS<{ entity_id: string; config_entry_id: string; name?: string; original_name?: string }[]>({ type: 'config/entity_registry/list' });
      const entity = registry.find(item => item.config_entry_id === panel.config.entry_id && item.entity_id.startsWith('media_player.'));
      if (entity) {
        const states = await hass.callWS<{ entity_id: string; attributes: { friendly_name?: string } }[]>({ type: 'get_states' });
        entityName = states.find(item => item.entity_id === entity.entity_id)?.attributes.friendly_name || entity.name || entity.original_name || entity.entity_id;
      }
    } catch { /* Keep the configured device title when registry access is unavailable. */ }
  }
  function requestReload() {
    confirmDraftAction(() => void run(reload));
  }
  function accept(value: Profile, preserveFirChoices = false, preserveGains = false) {
    const retainChoices = preserveFirChoices && profile?.id === value.id && !firMaster;
    if (!retainChoices) {
      firChoices = {left: value.settings.enableLeftFir ?? false, right: value.settings.enableRightFir ?? false};
      firMaster = firChoices.left || firChoices.right;
    }
    if (!preserveFirChoices) disabledGains = {};
    const nextDraft = preserveGains ? retainFilterGains(value.settings, draft) : clone(value.settings);
    profile = value; draft = nextDraft; stale = false;
    fir = null; firError = '';
    selectedBand = 0;
    if (!channelBands(draft, channel).length) channel = 0;
    status = 'Read From Device';
  }
  async function refreshFir(value = profile) {
    if (!alive || document.hidden || !value || value.processing?.hasFir === false) return;
    try {
      const result = await request<FirCurves>('curves', { profile_id: value.id });
      if (alive && profile?.id === value.id) { fir = result; firError = ''; }
    } catch { if (profile?.id === value.id) { fir = null; firError = 'FIR curve request failed. PEQ editing remains available.'; } }
  }
  async function load(id: number) { accept(await request<Profile>('read', { profile_id: id })); await refreshFir(); }
  function chooseProfile(event: Event) {
    const target = event.currentTarget as HTMLSelectElement;
    const id = Number(target.value);
    target.value = String(profile?.id ?? '');
    confirmDraftAction(() => void run(async () => { await load(id); }), 'Discard And Switch');
  }
  async function reload() {
    await snapshot();
    const id = catalog.profiles.some(item => item.id === profile?.id) ? profile!.id : catalog.profiles[0]?.id;
    if (id !== undefined) await load(id);
    else { profile = null; draft = {}; status = 'Create Your First Profile'; }
  }
  async function poll() {
    if (busy || polling || !alive || document.hidden || dialog?.open || fileDialog?.open || reloadDialog?.open) return;
    polling = true;
    const version = commandVersion, id = profile?.id;
    try {
      const nextCatalog = await request<Snapshot>('snapshot');
      if (!alive || document.hidden || busy || version !== commandVersion || profile?.id !== id) return;
      if (JSON.stringify(catalog) !== JSON.stringify(nextCatalog)) catalog = nextCatalog;
      if (profile) {
        const fresh = await request<Profile>('read', {profile_id: id});
        if (!alive || document.hidden || busy || version !== commandVersion || profile?.id !== id) return;
        if (dirty) stale = fresh.revision !== profile.revision;
        else if (fresh.revision !== profile.revision) {
          const active = document.activeElement?.shadowRoot?.activeElement ?? document.activeElement;
          if (active instanceof HTMLInputElement || active instanceof HTMLSelectElement) return;
          accept(fresh);
        }
        if (!fir || fir.revision !== fresh.revision) await refreshFir(fresh);
      }
    } catch { /* Foreground commands report actionable request errors. */ }
    finally { polling = false; }
  }
  onMount(() => {
    void run(reload);
    const toolbarObserver = new ResizeObserver(() => {
      if (!profileSelector || !profileActions) return;
      const selector = profileSelector.getBoundingClientRect();
      const actions = profileActions.getBoundingClientRect();
      toolbarWrapped = actions.top >= selector.bottom - 1;
    });
    for (const element of [profileToolbar, profileSelector, profileActions]) if (element) toolbarObserver.observe(element);
    let timer: ReturnType<typeof setInterval> | undefined;
    const updatePolling = () => {
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
      if (alive && !document.hidden) timer = setInterval(() => void poll(), 15000);
    };
    updatePolling();
    document.addEventListener('visibilitychange', updatePolling);
    const beforeUnload = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', beforeUnload);
    return () => { alive = false; toolbarObserver.disconnect(); clearInterval(timer); document.removeEventListener('visibilitychange', updatePolling); window.removeEventListener('beforeunload', beforeUnload); };
  });
  function patch(index: number, value: Partial<FilterParams>) {
    if (busy) return;
    const id = bandId(editKey, index);
    if (value.bypass !== undefined) {
      if (value.bypass) disabledGains[id] = {gain: bands[index].gain, type: bands[index].type};
      const gain = value.bypass ? 0 : disabledGains[id]?.gain ?? 0;
      const type = disabledGains[id]?.type ?? bands[index].type;
      if (!value.bypass) delete disabledGains[id];
      draft[editKey] = bands.map((band, i) => i === index ? setBandEnabled(band, !value.bypass, gain, type) : band);
    } else {
      if (value.gain !== undefined) delete disabledGains[id];
      draft[editKey] = bands.map((band, i) => i === index ? patchBand(band, value) : band);
    }
    selectedBand = index;
  }
  function setGeqGain(index: number, value: number) {
    if (busy || !Number.isFinite(value)) return;
    const gain = Math.round(Math.max(-20, Math.min(20, value)) * 10) / 10;
    draft[gainKey] = draft[gainKey]?.map((band, i) => i === index ? {...band, gain} : band);
  }
  function setPreamp(value: number, bank: ChannelId = 0) {
    if (busy) return;
    const key = bandKey(bank);
    draft[key] = draft[key]?.map(band => ({ ...band, volume: Math.round(value * 10) }));
  }
  function chooseEditorChannel(value: ChannelId) {
    if (!correction && !stereo) return;
    selectedRows[editKey] = selectedBand;
    if (correction) correctionChannel = value; else peqChannel = value;
    const key = correction ? (value === 0 ? 'peqFirList' : 'peqFirListRight') : bandKey(value);
    selectedBand = selectedRows[key] ?? 0;
  }
  function setBothChannels() {
    if (busy || (!correction && !stereo)) return;
    const peer = editorChannel === 0 ? 1 : 0;
    const targetKey = correction ? (peer === 0 ? 'peqFirList' : 'peqFirListRight') : bandKey(peer);
    if (draft[targetKey]?.length !== bands.length) {
      error = 'Channel band counts differ; reload the profile before setting both channels.';
      return;
    }
    draft[targetKey] = clone(bands);
    bands.forEach((_, index) => {
      const source = disabledGains[bandId(editKey, index)];
      const target = bandId(targetKey, index);
      if (source) disabledGains[target] = {...source};
      else delete disabledGains[target];
    });
  }
  function reset() {
    bands.forEach((_, index) => delete disabledGains[bandId(editKey, index)]);
    draft[editKey] = bands.map(resetBand);
  }
  function openDialog(action: typeof modal) {
    if (busy) return;
    const show = () => {
      modal = action; name = action === 'rename' || action === 'save_as' ? profile?.name ?? '' : '';
      dialog?.showModal();
    };
    if (action === 'create') confirmDraftAction(show, 'Discard And Continue');
    else show();
  }
  async function submitDialog(event: SubmitEvent) {
    event.preventDefault();
    const old = profile;
    dialog?.close();
    await run(async () => {
      if (modal === 'create') { accept(await request<Profile>('create', { name })); await refreshFir(); await snapshot(); status = 'Profile Created'; }
      else if (old && modal === 'save_as') {
        accept(await request<Profile>('save_as', { profile_id: old.id, revision: old.revision, name, settings: apiSettings(draft) }), false, true);
        await refreshFir(); await snapshot(); status = 'Profile Copied And Verified On Device';
      }
      else if (old && modal === 'rename') {
        // Rename retains a dirty draft and advances only its identity/revision.
        const renamed = await request<Profile>('rename', { profile_id: old.id, revision: old.revision, name });
        profile = renamed; await refreshFir(); await snapshot(); status = 'Profile Renamed';
      } else if (old) {
        await request('delete', { profile_id: old.id, revision: old.revision, expected_name: old.name });
        profile = null; draft = {}; await reload(); status = 'Profile Deleted';
      }
    });
  }
  async function save() {
    if (!profile) return;
    const result = await request<Profile>('save', { profile_id: profile.id, revision: profile.revision, settings: apiSettings(draft) });
    const selection = selectedBand;
    accept(result, true, true); selectedBand = selection; await refreshFir(); await snapshot(); status = 'Saved And Verified On Device';
  }
  function setSlider(event: Event, key: 'frequency' | 'q' | 'gain', targetKey: typeof editKey, targetIndex: number) {
    let value = Number((event.currentTarget as HTMLInputElement).value);
    if (key === 'frequency') value = Math.round(20 * Math.pow(1000, value / 1000));
    if (!busy && key === 'gain') delete disabledGains[bandId(targetKey, targetIndex)];
    if (!busy) draft[targetKey] = draft[targetKey]?.map((band, index) => index === targetIndex ? patchBand(band, { [key]: value }) : band);
  }
</script>

<svelte:window onpointerdown={(event) => { if (event.composedPath().some(target => target instanceof HTMLInputElement && target.type === 'range')) draggingRange = true; }} onpointerup={() => draggingRange = false} onpointercancel={() => draggingRange = false} onblur={() => draggingRange = false} />

<div class="shell">
  <header class="topbar">
    <div class="brand" class:centered={toolbarWrapped}><h1>{entityName || panel.config.title}</h1></div>
  </header>

  <div class="toolbar" bind:this={profileToolbar} class:wrapped={toolbarWrapped}>
    <label class="profile-select" bind:this={profileSelector}><span>Profile</span>
      <select aria-label="Profile" value={profile?.id ?? ''} onchange={chooseProfile} disabled={busy || !catalog.profiles.length}>
        {#if !profile}<option value="" disabled>Select A Profile</option>{/if}
        {#each catalog.profiles as item (item.id)}<option value={item.id}>{item.name || 'Unnamed'} · #{item.id}</option>{/each}
      </select>
    </label>
    <div class="actions profile-actions" bind:this={profileActions}>
      <button class="chip md" disabled={busy} onclick={() => openDialog('create')}>＋ New</button>
      <button class="chip md" disabled={busy || !profile || stale} onclick={() => openDialog('save_as')}>Save As</button>
      <button class="chip md" disabled={busy || !profile} onclick={() => openDialog('rename')}>Rename</button>
      <button class="chip md danger" disabled={busy || !profile} onclick={() => openDialog('delete')}>Delete</button>
    </div>
  </div>
  {#if error}<div class="notice error" role="alert">{error}</div>{/if}
  {#if stale}<div class="notice warning" role="alert">This profile changed on the device. Discard And Reload before saving.</div>{/if}

  {#if profile}

    {#snippet saveActions()}
    <div class="savebar"><span class:unsaved={dirty}>{dirty ? 'Unsaved Changes' : status}</span><div class="actions">
      <button class="chip md" disabled={busy} onclick={requestReload}>↻ Reload</button>
      <button class="chip md" disabled={busy || !dirty} onclick={requestReload}>Discard</button>
      <button class="chip md accent" disabled={busy || !dirty || stale} onclick={() => void run(save)}>Save Profile</button>
      <button class="chip md auto-save" class:on={autoSave} aria-pressed={autoSave} disabled={busy || stale} onclick={toggleAutoSave}><span class="auto-save-size" aria-hidden="true">Auto Save Off</span><span class="auto-save-label">{autoSave ? 'Auto Save On' : 'Auto Save Off'}</span></button>
    </div></div>
    {/snippet}
    <ProcessingResponse {busy} onModeChange={(value) => draft.settingType = value} onChannelChange={(value) => channel = value} settings={previewSettings} {profile} {fir} {channel} actions={saveActions} {previewRequest} />
    {#if firError}<p class="hint">{firError}</p>{/if}

    <nav class="sections" aria-label="Processing controls">
      {#each [['preamp', 'Preamp & Balance'], ['geq', 'Graphic EQ'], ['peq', 'PEQ'], ['correction', 'Correction PEQ'], ['fir', 'FIR'], ['loudness', 'Loudness'], ['outputs', 'Outputs']] as [id, label]}
        <button class="chip" class:on={section === id} aria-pressed={section === id} onclick={() => chooseSection(id)}>{label}</button>
      {/each}
    </nav>
    <fieldset disabled={busy} class="edit-grid">
      <div class="tab-pane bands-wrap" class:inactive={section !== 'peq' && section !== 'correction'} inert={section !== 'peq' && section !== 'correction'}>

        <BandsPanel stageLabel={correction ? 'Correction PEQ' : 'PEQ'} mono={!correction && !stereo} bankChannel={editorChannel} onBankChannel={chooseEditorChannel} selectedBand={selectedBand} onSelect={(index) => selectedBand = index} enabled={draft[editEnableKey]} onEnable={(value) => draft[editEnableKey] = value} bands={uiBands} onPatch={patch} onReset={reset} onSetBoth={setBothChannels}
          types={[1002,1003,1004,1005,FilterType.Peaking,1007,1008,1009] as FilterType[]} link={{ grouped: false, locked: false, peerLabel: '', selectedShort: '' }} onToggleLink={() => {}} />
        {#key `${editKey}:${selectedBand}`}
        {@const sliderBank = editKey}
        {@const sliderIndex = selectedBand}
        {#if currentBand}
          <Panel code="EQ.05" title="Band Sliders">
            {#snippet right()}
              <select class="band-picker" aria-label="Band to tune" bind:value={selectedBand}>{#each bands as _, index}<option value={index}>Band {index + 1}</option>{/each}</select>
            {/snippet}
            <div class="sliders">
              <label>Frequency <span>{currentBand.fc} Hz</span><input aria-label="Band frequency slider" type="range" min="0" max="1000" step="1" value={Math.log(currentBand.fc / 20) / Math.log(1000) * 1000} oninput={(e) => setSlider(e, 'frequency', sliderBank, sliderIndex)} /></label>
              <label class:gain-disabled={[2, 3, 4, 5].includes(currentBand.type)}>Gain <span>{currentBand.gain} dB</span><input aria-label="Band gain slider" disabled={[2, 3, 4, 5].includes(currentBand.type)} type="range" min="-15" max="15" step="0.1" value={currentBand.gain} oninput={(e) => setSlider(e, 'gain', sliderBank, sliderIndex)} /></label>
              <label>Q <span>{currentBand.q}</span><input aria-label="Band Q slider" type="range" min="0.1" max="100" step="0.01" value={currentBand.q} oninput={(e) => setSlider(e, 'q', sliderBank, sliderIndex)} /></label>
            </div>
          </Panel>
        {/if}
        {/key}
      </div>
      <div class="tab-pane" class:inactive={section !== 'geq'} inert={section !== 'geq'}>
        <Panel code="EQ.06" title="Graphic EQ">
          {#snippet titleControl()}
            <label class="toggle-label"><input class="switch" type="checkbox" role="switch" aria-label="Enable graphic EQ" checked={draft[geqEnable] ?? false} disabled={draft[geqEnable] === undefined} onchange={(event) => draft[geqEnable] = event.currentTarget.checked} /></label>
          {/snippet}
          {#snippet right()}
            <BankCycle mono={!stereo} label="Graphic EQ bank" value={geqChannel} onChange={(value) => geqChannel = value} />
            <button class="chip hi" aria-label="Reset graphic EQ" onclick={() => draft[gainKey] = draft[gainKey]?.map(band => ({...band, gain: 0}))}>Reset</button>
          {/snippet}
          <div class="geq-bands">{#each draft[gainKey] ?? [] as band, index}
            <div class="geq-band">
              <input class="geq-gain" aria-label={`Graphic EQ ${band.freq} Hz gain value`} type="number" min="-20" max="20" step="0.1" value={band.gain.toFixed(1)} onchange={(event) => { setGeqGain(index, event.currentTarget.valueAsNumber); event.currentTarget.value = draft[gainKey]![index].gain.toFixed(1); }} />
              <input class="geq-slider" aria-label={`Graphic EQ ${band.freq} Hz gain`} aria-orientation="vertical" type="range" min="-20" max="20" step="0.1" value={band.gain} oninput={(event) => setGeqGain(index, event.currentTarget.valueAsNumber)} />
              <span>{band.freq >= 1000 ? `${band.freq / 1000}k` : band.freq}</span>
            </div>
          {/each}</div>
        </Panel>
      </div>
      <div class="tab-pane" class:inactive={section !== 'loudness'} inert={section !== 'loudness'}>
        {#if draft[loudnessKey(channel)] !== undefined && profile.processing?.hasLoudness !== false}
          <Panel code="DSP.02" title="Loudness Compensation">
            {#snippet titleControl()}
              <label class="toggle-label"><input aria-label="Loudness enabled" class="switch" role="switch" type="checkbox" checked={draft[loudnessKey(channel)] === 1} onchange={(event) => draft[loudnessKey(channel)] = event.currentTarget.checked ? 1 : 0} /></label>
            {/snippet}
            <div class="loudness-reference"><LoudnessReference /></div>
          </Panel>
        {/if}
      </div>
      <div class="tab-pane" class:inactive={section !== 'preamp'} inert={section !== 'preamp'}>
        {#if draft.audioTunningEQList?.length}
          <PreampPanel balance={draft.balance} onBalance={(value) => draft.balance = value}
            preampDb={preamp(draft, 0)} rightPreampDb={stereo && draft.audioTunningEQListRight?.length ? preamp(draft, 1) : undefined}
            accentChannelId={0} onChange={(value) => setPreamp(value, 0)} onRightChange={(value) => setPreamp(value, 1)}
            onReset={() => { setPreamp(0, 0); if (stereo) setPreamp(0, 1); if (draft.balance !== undefined) draft.balance = 0; }} />
        {/if}
      </div>
      <div class="tab-pane" class:inactive={section !== 'fir'} inert={section !== 'fir'}>
        {#if profile.processing?.hasFir !== false}
          <Panel code="DSP.03" title="FIR Filters">
            {#snippet titleControl()}
              <label class="toggle-label"><input class="switch" role="switch" type="checkbox" aria-label="Enable FIR" checked={firMaster} disabled={draft.enableLeftFir === undefined && draft.enableRightFir === undefined} onchange={(event) => setFirMaster(event.currentTarget.checked)} /></label>
            {/snippet}
            <div class="outputs fir-assignments">
              {#each ['left', 'right'] as bank}
                {@const bankChannel = bank === 'left' ? 0 : 1}
                <div class="output"><span>{bank === 'left' ? 'Left' : 'Right'}</span>
                  <button class="chip" disabled={busy || dirty} onclick={() => void openFiles(bankChannel)}>Select On Device File</button>
                  {#if importHistory[`${profile.id}:${bankChannel}`]}<span class="import-name">{importHistory[`${profile.id}:${bankChannel}`]}</span>{/if}
                  <label><input class="switch" role="switch" aria-label={`${bank === 'left' ? 'Left' : 'Right'} FIR Enabled`} type="checkbox" checked={draft[bank === 'left' ? 'enableLeftFir' : 'enableRightFir'] ?? false} disabled={!firMaster || draft[bank === 'left' ? 'enableLeftFir' : 'enableRightFir'] === undefined} onchange={(event) => setFirChannel(bank as 'left' | 'right', event.currentTarget.checked)} /> Enable</label>
                  <div class="fir-stats" aria-label={`${bank === 'left' ? 'Left' : 'Right'} FIR Status`}>
                    <span>{currentFir?.[bank as 'left' | 'right']?.loaded && currentFir[bank as 'left' | 'right'].points.length > 0 && currentFir[bank as 'left' | 'right'].points.every(point => Number.isFinite(point.x) && Number.isFinite(point.y)) ? 'Filter Imported' : 'Filter Not Imported'}</span>
                  </div>
                </div>
              {/each}
            </div>
          </Panel>
        {/if}
      </div>
  <div class="tab-pane output-panel" class:inactive={section !== 'outputs'} inert={section !== 'outputs'}>
  <Panel code="IO.01" title="Output Assignments">
    <div class="outputs">
      {#each catalog.outputs as output (output.id)}
        <div class="output"><span>{output.name}</span>
          <select aria-label={`${output.name} assigned profile`} disabled={busy} value={output.eqId} onchange={(event) => { const id = Number(event.currentTarget.value); event.currentTarget.value = String(output.eqId); void run(async () => { await request('output', { output_id: output.id, profile_id: id }); await snapshot(); }); }}>
            {#if !catalog.profiles.some(item => item.id === output.eqId)}<option value={output.eqId}>Unknown Profile #{output.eqId}</option>{/if}
            {#each catalog.profiles as item (item.id)}<option value={item.id}>{item.name} · #{item.id}</option>{/each}
          </select>
          <label><input class="switch" role="switch" type="checkbox" checked={output.enable} disabled={busy} onchange={(event) => { const enabled = event.currentTarget.checked; event.currentTarget.checked = output.enable; void run(async () => { await request('output', { output_id: output.id, enabled }); await snapshot(); }); }} /> Enable</label>
        </div>
      {/each}
    </div>
  </Panel>
  </div>
    </fieldset>
  {:else if !busy}<div class="empty">Select or create a profile to start shaping your sound.</div>{/if}
</div>

<dialog class="file-picker" bind:this={fileDialog} aria-label="Internal FIR File Browser" onclick={dismissFilePicker}>
  <div class="file-heading"><h2>Import FIR Filter</h2><span>{importChannel === 0 ? 'Left' : 'Right'} Channel</span></div>
  <div class="file-location">
    <button class="chip hi directory-action" aria-label="Parent Folder" disabled={busy || !fileTrail.length} onclick={() => void run(() => ancestorFolder(fileTrail.length - 1))}>↑</button>
    <div class="file-path">
      <input type="text" aria-label="Directory Path" bind:value={directoryPath} disabled={busy} onkeydown={(event) => { if (event.key === 'Enter') { event.preventDefault(); void run(openDirectory); } }} />
      <button class="chip hi directory-action" aria-label="Open Directory" type="button" disabled={busy} onclick={() => void run(openDirectory)}><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M19 5v10H5m5-5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
    </div>
  </div>
  <div class="file-tools">
    <input type="text" aria-label="Search" placeholder="Search" bind:value={fileFilter} />
    <label>Sort<select aria-label="File Sort" bind:value={fileSort} disabled={busy} onchange={() => void run(() => browse(fileUrl))}>{#each ['Name ↑','Name ↓','Size ↑','Size ↓','Time ↑','Time ↓','Type ↑','Type ↓'] as label, index}<option value={index}>{label}</option>{/each}</select></label>
  </div>
  <div class="file-list" aria-label="Folder Contents">
    <table><thead><tr><th>Name</th><th>Type</th><th class="file-size">Size</th></tr></thead><tbody>
      {#each visibleFiles as item (item.url)}
        <tr class:selected={selectedFileUrl === item.url}>
          <td><button class="file-entry" aria-label={`${item.fileType === 0 ? 'Open Folder' : 'Select File'}: ${item.name}`} aria-pressed={item.fileType === 0 ? undefined : selectedFileUrl === item.url} disabled={busy || (item.fileType !== 0 && !item.name.toLowerCase().endsWith('.wav'))} onclick={() => { if (item.fileType === 0) void run(() => enterFolder(item.url)); else selectedFileUrl = item.url; }}><span class="file-icon" aria-hidden="true">{#if item.fileType === 0}<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m8 5 9 7-9 7Z" fill="currentColor" /></svg>{:else}♫{/if}</span>{item.name}</button></td>
          <td>{item.fileType === 0 ? 'Folder' : item.name.toLowerCase().endsWith('.wav') ? 'WAV Audio' : 'File'}</td><td class="file-size">{item.fileType === 0 ? '—' : fileSize(item.size)}</td>
        </tr>
      {:else}<tr><td colspan="3" class="file-empty">{fileFilter ? 'No Matching Files' : 'This Folder Is Empty'}</td></tr>{/each}
    </tbody></table>
  </div>
  {#if fileTotal > 1000}<div class="file-pagination"><button class="chip" disabled={busy || fileStart === 0} onclick={() => void run(() => browse(fileUrl, Math.max(0,fileStart-1000)))}>Previous</button><span>{fileStart + 1}–{Math.min(fileStart + 1000, fileTotal)} / {fileTotal}</span><button class="chip" disabled={busy || fileStart+1000 >= fileTotal} onclick={() => void run(() => browse(fileUrl,fileStart+1000))}>Next</button></div>{/if}
  <label class="file-selection">File Name<input type="text" aria-label="Selected File Name" readonly value={selectedFile?.name ?? ''} placeholder="Select A WAV File" /></label>
  {#if error}<p role="alert">{error}</p>{/if}
  <div class="file-footer"><span>WAV Files (*.wav)</span><div><button class="chip hi" onclick={() => fileDialog?.close()}>Cancel</button><button class="chip accent" disabled={busy || !selectedFile} onclick={() => { const item = selectedFile; if (item) void run(() => importFir(item)); }}>Import</button></div></div>
</dialog>

<dialog bind:this={reloadDialog} aria-label="Unsaved Changes" oncancel={() => pendingDraftAction = null}>
  <h2>Unsaved Changes</h2>
  <p>Discard changes that have not been saved to the device?</p>
  <div class="actions"><button class="chip md" onclick={cancelDraftAction}>Keep Editing</button><button class="chip md danger" onclick={acceptDraftAction}>{discardLabel}</button></div>
</dialog>

<dialog bind:this={dialog}>
  <form onsubmit={submitDialog}>
    <h2>{modal === 'create' ? 'Create Profile' : modal === 'save_as' ? 'Save Profile As' : modal === 'rename' ? 'Rename Profile' : 'Delete Profile'}</h2>
    {#if modal === 'delete'}
      <p>Permanently delete “{profile?.name.trim()}” (#{profile?.id}) from this device? Any unsaved edits will be discarded.</p>
    {:else}<label>Profile Name<input aria-label="Profile Name" type="text" bind:value={name} required maxlength="100" /></label>{/if}
    <div class="actions"><button type="button" class="chip md" onclick={() => dialog?.close()}>Cancel</button><button class="chip md" class:danger={modal === 'delete'} class:accent={modal !== 'delete'} type="submit" disabled={busy || (modal !== 'delete' && !name.trim())}>{modal === 'save_as' ? 'Save As' : modal[0].toUpperCase() + modal.slice(1)}</button></div>
  </form>
</dialog>

<style>
  .auto-save { display: inline-grid; place-items: center; align-content: center; flex-shrink: 0; white-space: nowrap; }
  .auto-save-size, .auto-save-label { grid-area: 1 / 1; }
  .auto-save-size { visibility: hidden; }

  .gain-disabled { opacity: var(--dim-disabled); }
  dialog.file-picker { width: 720px; max-height: 88vh; padding: 20px; }
  .file-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 18px; }
  .file-heading h2 { margin: 0; font-size: 21px; }
  .file-heading > span, .file-footer > span { font-size: 13px; color: var(--text-dim); }
  .file-location { display: grid; grid-template-columns: auto minmax(0,1fr); align-items: stretch; gap: 10px; margin-bottom: 12px; }
  .file-tools label { display: grid; gap: 5px; font-size: 13px; }
  .file-tools select { width: 100%; font-size: 14px; }
  .directory-action { width: 40px; min-width: 40px; padding: 0; font-size: 22px; flex-shrink: 0; display: grid; place-items: center; line-height: 1; }
  .file-path { display: flex; gap: 8px; min-width: 0; }.file-path input { min-width: 0; width: 100%; font-size: 14px; }.file-location .chip, .file-path input { height: 44px; box-sizing: border-box; }
  .file-tools { display: flex; align-items: end; gap: 12px; margin-bottom: 12px; }
  .file-tools > input { flex: 1; min-width: 0; font-size: 14px; }
  .file-tools label { grid-template-columns: auto auto; align-items: center; gap: 8px; }
  .file-list { height: 260px; overflow: auto; border: 1px solid var(--border-hi); border-radius: 7px; background: var(--panel); }
  .file-list table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .file-list th { position: sticky; top: 0; background: var(--panel-solid); color: var(--text-dim); text-align: left; font-size: 12px; font-weight: 500; padding: 9px 12px; border-bottom: 1px solid var(--border-hi); }
  .file-list td { padding: 0 12px; height: 40px; border-bottom: 1px solid var(--border); white-space: nowrap; }
  .file-list td:first-child { width: 100%; white-space: normal; }
  .file-list tr.selected { background: color-mix(in srgb, var(--accent) 22%, var(--panel)); }
  .file-list tr:hover { background: var(--wash-strong); }
  .file-entry { display: flex; align-items: center; gap: 10px; text-align: left; width: 100%; min-height: 40px; padding: 6px 0; background: transparent; border: 0; font: inherit; color: var(--text); cursor: pointer; overflow-wrap: anywhere; }
  .file-entry:disabled { opacity: .45; cursor: default; }
  .file-icon { color: var(--text-dim); width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-size: 20px; line-height: 1; flex-shrink: 0; }
  .file-size { text-align: right !important; }
  .file-empty { text-align: center; color: var(--text-dim); padding: 30px !important; }
  .file-selection { display: grid; grid-template-columns: 78px minmax(0,1fr); align-items: center; gap: 10px !important; margin-top: 14px; font-size: 14px; }
  .file-selection input { font-size: 14px; }
  .file-footer { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 16px; }
  .file-footer > div, .file-pagination { display: flex; align-items: center; gap: 8px; }
  .file-pagination { justify-content: center; margin-top: 10px; font-size: 13px; }
  @media (max-width: 480px) { dialog.file-picker { padding: 14px; }.file-location { grid-template-columns: auto minmax(0,1fr); }.file-tools { align-items: stretch; flex-direction: column; }.file-list th:nth-child(2),.file-list td:nth-child(2) { display: none; }.file-heading { align-items: start; }.file-list { height: 220px; } }
  .geq-bands { display: flex; gap: 8px; padding: 20px 14px; overflow-x: auto; }
  .geq-band { display: flex; flex: 1 0 44px; flex-direction: column; align-items: center; gap: 12px; font-size: 13px; }
  .geq-gain { width: 52px; padding: 4px 0; text-align: center; color: var(--text); background: transparent; border: 1px solid transparent; border-radius: 5px; font: inherit; font-variant-numeric: tabular-nums; appearance: textfield; }
  .geq-gain::-webkit-inner-spin-button, .geq-gain::-webkit-outer-spin-button { appearance: none; margin: 0; }
  .geq-gain:hover { border-color: var(--border-hi); }
  .geq-gain:focus { outline: 1px solid var(--accent); background: var(--wash); }
  .geq-slider { appearance: none; writing-mode: vertical-lr; direction: rtl; width: 32px; height: 210px; margin: 0; cursor: ns-resize; background: transparent; }
  .geq-slider::-webkit-slider-runnable-track { width: 6px; height: 100%; border-radius: 4px; background: #4a4a46; }
  .geq-slider::-webkit-slider-thumb { appearance: none; width: 30px; height: 10px; margin-left: -12px; border: 1px solid #a5a59f; border-radius: 3px; background: #eeeeea; box-shadow: 0 2px 3px #0005; }
  .geq-slider::-moz-range-track { width: 6px; height: 100%; border-radius: 4px; background: #4a4a46; }
  .geq-slider::-moz-range-thumb { width: 30px; height: 10px; border: 1px solid #a5a59f; border-radius: 3px; background: #eeeeea; }
  .geq-slider:focus-visible { outline: 1px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
  .import-name { grid-column: 2 / -1; overflow-wrap: anywhere; }
  :global(*) { box-sizing: border-box; }
  .shell { padding: 12px 16px; max-width: 1500px; margin: auto; min-height: 100%; }
  .topbar { display: flex; align-items: center; gap: 18px; margin-bottom: 10px; }
  .brand { flex: 1; display: flex; justify-content: flex-start; text-align: left; align-items: baseline; gap: 16px; }
  .brand.centered { justify-content: center; text-align: center; }
  h1 { margin: 0; font-size: 23px; font-weight: 600; letter-spacing: 0; }
  .toolbar, .savebar { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .toolbar { margin-bottom: 12px; }
  .profile-actions { flex-wrap: wrap; justify-content: flex-end; margin-left: auto; }
  .toolbar.wrapped { justify-content: center; }
  .toolbar.wrapped .profile-actions { justify-content: center; margin-inline: auto; }
  .profile-select { display: grid; grid-template-columns: 60px auto; align-items: center; gap: 12px; }
  label, .savebar { font: 16px var(--font-sans); letter-spacing: 0; color: var(--text-dim); }
  select, input[type=text] { background: var(--panel-solid); color: var(--text); border: 1px solid var(--border-hi); border-radius: 9px; min-height: 36px; padding: 6px 10px; font: 17px var(--font-sans); max-width: 100%; }
  .actions { display: flex; flex-wrap: wrap; gap: 8px; }

  .edit-grid { border: 0; padding: 0; margin: 8px 0 8px; min-width: 0; display: grid; grid-template-columns: minmax(0, 1fr); align-items: start; }
  .loudness-reference { padding: 16px; max-width: 680px; margin: auto; width: 100%; }
  .sections { display: flex; justify-content: center; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
  .tab-pane { grid-area: 1 / 1; min-width: 0; }
  .tab-pane.inactive { visibility: hidden; pointer-events: none; }
.bands-wrap { min-width: 0; display: flex; flex-direction: column; gap: 18px; }.bands-wrap :global(.panel) { min-width: 0; }
  input[type=range] { width: 100%; }
  .band-picker { min-height: 32px; padding: 2px 24px 2px 8px; }
  .sliders { padding: 8px 14px; display: grid; gap: 2px; }
  .sliders label { display: grid; gap: 12px; grid-template-columns: 80px 80px minmax(0, 1fr); align-items: center; min-height: 34px; font-size: 14px; }
  .sliders label span { text-align: right; color: var(--text); font-variant-numeric: tabular-nums; }
  .sliders input { min-width: 0; margin: 0; height: 28px; }
  @media (max-width: 480px) { .sliders { padding: 6px 10px; }.sliders label { grid-template-columns: 64px 64px minmax(0, 1fr); gap: 8px; } }
  .savebar { margin: 0; padding: 0; border: 0; font-size: 13px; gap: 8px; }
  .savebar .actions { justify-content: flex-end; }
  @media (max-width: 900px) {
    .savebar { flex-direction: column; align-items: stretch; width: max-content; max-width: 100%; gap: 5px; }
    .savebar > span { text-align: center; width: 100%; }
    .savebar .actions { width: 100%; justify-content: center; }
  }
  .savebar .chip { min-height: 34px; padding: 6px 10px; font-size: 13px; }.unsaved { color: var(--warn); }
  .outputs { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }.output { padding: 4px 14px; background: var(--panel-solid); display: grid; grid-template-columns: 140px minmax(0, 1fr) auto; gap: 12px; align-items: center; }.output > span { font-size: 16px; }.output label { display: flex; align-items: center; gap: 6px; }
  .notice { padding: 14px; border-radius: 5px; margin: 10px 0; font-size: 14px; background: var(--wash); }.error { color: var(--err); border: 1px solid var(--err); }.warning { color: var(--warn); }
  .fir-stats { grid-column: 3; grid-row: 1; display: flex; flex-wrap: wrap; gap: 8px 24px; margin: 0; font-size: 13px; color: var(--text-dim); }

  .fir-assignments { grid-template-columns: 1fr; }
  .fir-assignments .output { grid-template-columns: 70px minmax(0, 1fr) auto auto; }
  .fir-assignments .output > label { grid-column: 4; grid-row: 1; }
  .empty { padding: 50px 0; color: var(--text-dim); }
  dialog { color: var(--text); background: var(--panel-solid); border: 1px solid var(--border-hi); border-radius: 10px; width: 440px; max-width: 92vw; padding: 25px; }dialog::backdrop { background: #000a; backdrop-filter: blur(6px); }dialog h2 { margin-top: 0; font-weight: 500; }dialog label { display: grid; gap: 12px; }dialog .actions { margin-top: 24px; justify-content: flex-end; }dialog p { line-height: 1.6; }
  @media (max-width: 1100px) { .edit-grid { grid-template-columns: 1fr; }.outputs { grid-template-columns: 1fr; }.shell { padding: 16px; } }
  @media (max-width: 600px) {
    .fir-assignments .output { grid-template-columns: 42px minmax(0, 1fr) auto; }
    .fir-assignments .output > span { grid-column: 1; }
    .fir-assignments .output > label { grid-column: 3; }
    .fir-stats { grid-column: 2; grid-row: 2; }
    .output { grid-template-columns: minmax(0, 1fr) auto; gap: 4px 10px; }
    .output > span { grid-column: 1 / -1; }
    .topbar { margin-bottom: 10px; }
    .brand { min-width: 0; flex-wrap: wrap; gap: 0 12px; }.brand h1 { font-size: 26px; line-height: 1.25; margin-top: 6px; }

    .toolbar .profile-select { gap: 12px; width: auto; }.profile-select select { max-width: 100%; }
    .toolbar .actions { display: flex; justify-content: flex-end; width: 100%; gap: 8px; }
    .toolbar .chip { padding: 10px 6px; font-size: 14px; }
  }
</style>
