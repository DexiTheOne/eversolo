<script lang="ts">
  import { untrack, type Snippet } from 'svelte';
  import { bandColor } from '@/styles/palette';
  import { filterCurve } from '../bode/filterCurve';
  import { channelBands, toUiBand, responseSettings } from '@/adapter';
  import LoudnessReference from './LoudnessReference.svelte';
  import Panel from '../chrome/Panel.svelte';
  import BodePlot, { type BodeCurve } from '../bode/BodePlot.svelte';
  import { Eq, type ChannelId } from '@/domain';
  import { preamp, channelName, processingStages, sumStages, type Settings, type Profile, type FirCurves, type ResponseStage } from '@/adapter';

  const { settings, profile, fir, channel, onChannelChange, onModeChange, busy, actions, previewRequest }: { settings: Settings; profile: Profile; fir: FirCurves | null; channel: ChannelId; busy: boolean; onModeChange: (value: number) => void; onChannelChange: (value: ChannelId) => void; actions: Snippet; previewRequest: { stage: string | null; serial: number } } = $props();
  let selected = $state<string[]>([]);
  let stereoPreview = $state(false);
  let verticalScale = $state('auto');
  let customRange = $state<[number, number]>([-20, 20]);
  function panRange(range: [number, number]) { customRange = range; verticalScale = 'custom'; }
  function resetGraph() { verticalScale = 'auto'; customRange = [-20, 20]; }
  let tabSelected = false;
  $effect(() => { profile.id; channel; selected = []; tabSelected = false; });
  $effect(() => {
    const request = previewRequest;
    if (!request.serial) return;
    untrack(() => {
      if (request.stage && (!selected.length || tabSelected)) {
        selected = [request.stage];
        tabSelected = true;
      } else if (!request.stage && tabSelected) {
        selected = [];
        tabSelected = false;
      }
    });
  });
  function toggleStage(id: string) {
    if (id === 'loudness') return;
    tabSelected = false;
    selected = selected.includes(id) ? selected.filter(item => item !== id) : [...selected, id];
  }
  function clearOutside(event: MouseEvent) {
    const path = event.composedPath();
    const panel = path.find(target => target instanceof HTMLElement && target.matches('section.panel')) as HTMLElement | undefined;
    if (!panel?.querySelector('.stages')) return;
    if (path.some(target => target instanceof Element && target.matches('button, select, input, label, svg, [data-stage]'))) return;
    selected = [];
    tabSelected = false;
  }

  const currentFir = $derived(fir?.profile_id === profile.id && fir.revision === profile.revision ? fir : null);
  const leftStages = $derived(processingStages(settings, 0, profile.processing, currentFir?.left));
  const rightStages = $derived(processingStages(settings, 1, profile.processing, currentFir?.right));
  const stageOrder = ['preamp', 'balance', 'geq', 'peq', 'correction', 'fir', 'loudness'];
  const responseStages = $derived((stereoPreview ? [...leftStages, ...rightStages.filter(stage => !leftStages.some(left => left.id === stage.id))] : channel === 0 ? leftStages : rightStages).slice().sort((a, b) => stageOrder.indexOf(a.id) - stageOrder.indexOf(b.id)));
  const stages = $derived([
    responseStages.find(stage => stage.id === 'preamp') ?? { id: 'preamp', label: 'Preamp', color: '#e8b857', points: null },
    ...(settings.balance !== undefined ? [responseStages.find(stage => stage.id === 'balance') ?? { id: 'balance', label: 'Balance', color: '#b49cde', points: null }] : []),
    ...responseStages.filter(stage => stage.id !== 'preamp' && stage.id !== 'balance'),
  ] as ResponseStage[]);
  function channelCurves(bank: ChannelId): BodeCurve[] {
    const stages = bank === 0 ? leftStages : rightStages;
    const visibleStages = selected.length ? stages.filter(stage => selected.includes(stage.id)) : stages;
    const total = sumStages(visibleStages);
    if (!selected.length) {
      const composite = sumStages(stages.filter(stage => !stage.illustrative));
      return [{ id: 'composite', label: 'Composite response', points: composite.points,
        color: '#f1f0eb', width: 2.4, dashed: false }];
    }
    if (selected.length === 1 && selected[0] === 'peq') {
      return channelBands(responseSettings(settings, bank), bank).flatMap((band, index) =>
        !band.bypass && (band.type === 6 || band.type === 9) ? [{ id: `band-${index}`, label: `Band ${index + 1}`,
          color: bandColor(index), points: filterCurve(band.type === 9 ? [] : [toUiBand(band)], 0), width: 1.8, fillOpacity: .2 }] : []);
    }
    const result: BodeCurve[] = [];
    let running = Array<number>(201).fill(0);
    for (const stage of visibleStages) {
      if (!stage.points || stage.illustrative) continue;
      running = running.map((point, index) => point + stage.points![index]);
      result.push({ id: stage.id, label: visibleStages.length === 1 ? stage.label : `Through ${stage.label}`, points: [...running], color: stage.color });
    }
    if (visibleStages.filter(stage => stage.points && !stage.illustrative).length > 1) result.push({ id: 'sum', label: total.omitted.length ? 'Known layers combined' : 'Combined preview',
      points: total.points, color: '#f1f0eb', width: 2.4, dashed: false });
    return result;
  }
  const curves = $derived.by((): BodeCurve[] => {
    if (!stereoPreview) return channelCurves(channel).map(curve => ({ ...curve, dashed: channel === 1 }));
    return ([0, 1] as ChannelId[]).flatMap(bank => channelCurves(bank).map(curve => ({
      ...curve, id: `${bank}-${curve.id}`, label: `${bank === 0 ? 'Left' : 'Right'} · ${curve.label}`,
      color: bank === 0 ? curve.color : `color-mix(in srgb, ${curve.color} 45%, #69b9eb)`,
      dashed: bank === 1,
    })));
  });
  const graphRange = $derived.by((): [number, number] => {
    if (verticalScale === 'default') return [-20, 20];
    if (verticalScale === 'custom') return customRange;
    if (verticalScale !== 'auto') { const span = Number(verticalScale); return [-span, span]; }
    const values = curves.flatMap(curve => curve.points).filter(Number.isFinite);
    const low = Math.min(0, ...values), high = Math.max(0, ...values);
    const padding = Math.max(1, (high - low) * .15);
    return [Math.floor((low - padding) / 2) * 2, Math.ceil((high + padding) / 2) * 2];
  });
  function sparkline(stage: ResponseStage) {
    return stage.points?.map((value, index) => `${index === 0 ? 'M' : 'L'}${4 + index / 2 * .92},${24 - Math.max(-24, Math.min(24, value)) * (stage.id === 'fir' ? 2.2 : .75)}`).join(' ') ?? '';
  }
</script>

<svelte:window onclick={clearOutside} />

<Panel stackActions code="DSP.01" title="Processing Response">
  {#snippet titleControl()}<span class="response-controls"><button type="button" class="chip hi preview-channel" aria-label={`Preview Channel: ${stereoPreview ? 'Both Channels' : channel === 0 ? 'Left Channel' : 'Right Channel'}`} onclick={() => { if (stereoPreview) { stereoPreview = false; onChannelChange(0); } else if (channel === 0) onChannelChange(1); else stereoPreview = true; }}>{stereoPreview ? 'Both Channels' : channel === 0 ? 'Left Channel' : 'Right Channel'}</button><button type="button" class="chip hi mode-cycle" aria-label={`Profile mode: ${settings.settingType === 1 ? 'Stereo' : 'Mono'}`} disabled={busy} onclick={() => onModeChange(settings.settingType === 1 ? 0 : 1)}>{settings.settingType === 1 ? 'Stereo' : 'Mono'}</button></span>{/snippet}
  {#snippet right()}{@render actions()}{/snippet}
  <div class="stages" style:--stage-count={Math.max(1, stages.length)} aria-label="Enabled processing stages">
    {#each stages as stage (stage.id)}
      {#if stage.id === 'preamp' || stage.id === 'balance'}
        <div class="stage slider-stage" role="button" tabindex="0" class:selected={selected.includes(stage.id)} data-response-stage={stage.id} data-stage={stage.id} aria-label={`${stage.label} curve`} aria-pressed={selected.includes(stage.id)} onclick={() => toggleStage(stage.id)} onkeydown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleStage(stage.id); } }} style:--stage-color={stage.color}>
          <div class="stage-name"><span class="dot"></span>{stage.label}</div>
          {#if stage.id === 'balance'}
            <input class="mini-slider" aria-label="Preview Balance" type="range" min="-6" max="6" step="0.1" value={settings.balance ?? 0} disabled />
            <p>{settings.balance ?? 0} dB</p>
          {:else}
            <div class="preamp-sliders">
              {#each settings.settingType !== 1 ? [0] as ChannelId[] : stereoPreview ? [0, 1] as ChannelId[] : [channel] as bank}
                <input class="mini-slider" style:--thumb-color={bank === 0 ? stage.color : '#fff0be'} aria-label={`${bank === 0 ? 'Left' : 'Right'} Preview Preamp`} type="range" min={Eq.PREAMP_MIN_DB} max={Eq.PREAMP_MAX_DB} step={Eq.PREAMP_STEP_DB} value={preamp(responseSettings(settings, bank), bank)} disabled />
              {/each}
            </div>
            <p>{stereoPreview && settings.settingType === 1 ? `L ${preamp(responseSettings(settings, 0), 0).toFixed(1)} · R ${preamp(responseSettings(settings, 1), 1).toFixed(1)} dB` : `${preamp(responseSettings(settings, channel), channel).toFixed(1)} dB`}</p>
          {/if}
        </div>
      {:else if stage.illustrative}
        <div class="stage reference-stage" data-stage={stage.id} style:--stage-color={stage.color}>
          <div class="stage-name"><span class="dot"></span>Loudness</div>
          <LoudnessReference compact />
        </div>
      {:else}
      <button type="button" class="stage" class:selected={selected.includes(stage.id)} data-response-stage={stage.id} data-stage={stage.id} aria-label={`${stage.label} curve`} aria-pressed={selected.includes(stage.id)} onclick={() => toggleStage(stage.id)} style:--stage-color={stage.color}>
        <div class="stage-name"><span class="dot"></span>{stage.label}</div>
        {#if stage.points || (stereoPreview && rightStages.find(item => item.id === stage.id)?.points)}<svg viewBox="0 0 100 48" preserveAspectRatio="none" role="img" aria-label={`${stage.label} contribution`}><line class="zero-reference" x1="4" x2="96" y1="24" y2="24" />{#if stereoPreview}
          {#each [leftStages.find(item => item.id === stage.id), rightStages.find(item => item.id === stage.id)] as contribution, bank}
            {#if contribution?.points}<path d={sparkline(contribution)} style:stroke={bank === 0 ? stage.color : `color-mix(in srgb, ${stage.color} 45%, #69b9eb)`} stroke-dasharray={bank === 1 ? '5 4' : undefined} />{/if}
          {/each}
        {:else}<path d={sparkline(stage)} stroke-dasharray={channel === 1 ? '5 4' : undefined} />{/if}</svg>
        {:else}<div class="unavailable">Curve Unavailable</div>{/if}
      </button>
      {/if}
    {:else}<p class="flat">No enabled processing contributions · flat response</p>{/each}
  </div>

  <div class="plot-controls"><label>Vertical Scale
    <select aria-label="Response vertical scale" bind:value={verticalScale}>
      <option value="auto">Auto</option><option value="6">±6 dB</option><option value="12">±12 dB</option><option value="24">±24 dB</option><option value="default">±20 dB</option>{#if verticalScale === 'custom'}<option value="custom" hidden disabled>Custom</option>{/if}<option value="48">±48 dB</option>
    </select>
  </label><button class="chip" aria-label="Reset graph scale" onclick={resetGraph}>Reset</button></div>
  <div class="plot">
    <BodePlot {curves} height={280} yRange={graphRange} onRangeChange={panRange} />
    {#if curves.length}<div class="plot-key" aria-label="Response Line Key">
      <span><svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true"><line x1="1" x2="25" y1="6" y2="6" stroke="currentColor" stroke-width="2" /></svg>Left Channel</span>
      <span><svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true"><line x1="1" x2="25" y1="6" y2="6" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4" /></svg>Right Channel</span>
    </div>{/if}
  </div>

</Panel>

<style>
  .slider-stage { cursor: pointer; }
  .preamp-sliders { position: relative; height: 20px; }
  .mini-slider { appearance: none; background: transparent; width: 100%; min-width: 0; height: 20px; margin: 0; cursor: default; opacity: 1; pointer-events: none; }
  .preamp-sliders .mini-slider { position: absolute; inset: 0; pointer-events: none; }
  .mini-slider::-webkit-slider-runnable-track { height: 3px; background: color-mix(in srgb, var(--stage-color) 60%, #444); border-radius: 3px; }
  .mini-slider::-webkit-slider-thumb { appearance: none; width: 8px; height: 15px; margin-top: -6px; border-radius: 3px; background: var(--thumb-color, var(--stage-color)); pointer-events: none; }
  .mini-slider::-moz-range-track { height: 3px; background: var(--stage-color); }
  .mini-slider::-moz-range-thumb { width: 8px; height: 15px; border: 0; background: var(--thumb-color, var(--stage-color)); pointer-events: none; }
  .response-controls { display: inline-flex; align-items: center; gap: 8px; }
  .preview-channel { width: 140px; min-width: 140px; flex: 0 0 140px; white-space: nowrap; }
  .mode-cycle { width: 80px; min-width: 80px; flex: 0 0 80px; }
  .stages { container-type: inline-size; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; padding: 6px 14px 0; }.stage { position: relative; display: grid; grid-template-rows: 20px 20px 18px; align-content: start; height: 72px; text-align: left; cursor: pointer; color: var(--text); font: inherit; min-width: 0; --stage-columns: min(var(--stage-count), 2); flex: 0 0 calc((100% - (var(--stage-columns) - 1) * 8px) / var(--stage-columns)); padding: 6px 10px; border: 1px solid var(--stage-color); background: color-mix(in srgb, var(--stage-color) 12%, var(--panel-solid)); border-radius: 10px; }
  @container (min-width: 346px) { .stage { --stage-columns: min(var(--stage-count), 3); } }
  @container (min-width: 464px) { .stage { --stage-columns: min(var(--stage-count), 4); } }
  @container (min-width: 582px) { .stage { --stage-columns: min(var(--stage-count), 5); } }
  @container (min-width: 700px) { .stage { --stage-columns: min(var(--stage-count), 6); } }
  @container (min-width: 818px) { .stage { --stage-columns: min(var(--stage-count), 7); } }
  .stage[data-stage="fir"] svg { height: 30px; }
  .stage[data-stage="fir"] { grid-template-rows: 20px 30px 8px; }
  .reference-stage { cursor: default; grid-template-rows: 20px 40px; }
  .stage:not(.reference-stage):hover { background: color-mix(in srgb, var(--stage-color) 22%, var(--panel-solid)); }
  .stage.selected { background: color-mix(in srgb, var(--stage-color) 42%, var(--panel-solid)); box-shadow: inset 0 0 0 2px var(--stage-color), 0 0 0 1px var(--stage-color); }
  .stage:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .stage-name { align-self: start; display: flex; gap: 7px; align-items: center; flex-wrap: wrap; color: var(--text); font: 14px var(--font-sans); }.dot { height: 5px; width: 5px; background: var(--stage-color); border-radius: 50%; }.stage svg { align-self: center; display: block; width: 100%; height: 20px; margin-top: 0; }.stage path { fill: none; stroke: var(--stage-color); stroke-width: 1.3; vector-effect: non-scaling-stroke; }.stage line { stroke: #92928d; stroke-width: 1; vector-effect: non-scaling-stroke; }.stage p { font: 14px/1.5 var(--font-sans); color: var(--text-dim); margin: 2px 0 0; }.unavailable { height: 28px; display: grid; place-items: center; color: var(--text-faint); font: 14px var(--font-sans); }.flat { color: var(--text-dim); font: 14px var(--font-sans); }
 .plot-controls { display: flex; justify-content: flex-end; align-items: center; gap: 8px; padding: 6px 14px 0; }
 @media (max-width: 900px) { .plot-controls { justify-content: center; } }
 .plot-controls .chip { min-height: 30px; padding: 4px 10px; font-size: 13px; }
 .plot-controls label { display: flex; align-items: center; gap: 8px; color: var(--text-dim); font: 13px var(--font-sans); }
 .plot-controls select { min-height: 30px; border: 1px solid var(--border-hi); background-color: var(--panel-solid); color: var(--text); border-radius: 7px; padding: 4px 10px; font: inherit; }
 .plot { position: relative; padding: 6px 14px 0 6px; }
  .plot-key { position: absolute; right: 24px; top: 14px; max-width: calc(100% - 80px); max-height: 92px; overflow: auto; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 4px 14px; padding: 6px 9px; border-radius: 6px; background: color-mix(in srgb, var(--panel-solid) 88%, transparent); color: var(--text); font: 12px var(--font-sans); }
  .plot-key > span { display: inline-flex; align-items: center; gap: 6px; }
  .plot-key svg { flex-shrink: 0; }
  @media(max-width: 600px) { .stages { padding: 12px 12px 0; gap: 8px; } }
</style>
