<script lang="ts" module>
  // Shared with BandsPanel's header so the grid columns always line up.
  export const BAND_ROW_COLS = 'var(--band-columns, 28px 56px minmax(0, 1fr) 104px 80px 104px)';
</script>

<script lang="ts">
  import { bandColor } from '@/styles/palette';
  import { FilterType, type FilterParams, Eq } from '@/domain';
  import ValueField from '@/components/chrome/ValueField.svelte';
  import BandTypeSelect from './BandTypeSelect.svelte';

  const {
    selected, onSelect,
    index,
    band,
    onPatch,
    types,
  }: {
    selected: boolean;
    onSelect: () => void;
    index: number;
    band: FilterParams;
    onPatch: (patch: Partial<FilterParams>) => void;
    types?: FilterType[];
  } = $props();

  const off = $derived(band.type === FilterType.Flat);
  const bypassed = $derived(band.bypass);
  const iconPath = $derived(({
    [FilterType.Peaking]: band.gain < 0 ? 'M3 12 C14 12 15 21 24 21 S34 12 45 12' : 'M3 18 C14 18 15 3 24 3 S34 18 45 18',
    1002: 'M3 5 H20 C29 5 30 19 45 21',
    1003: 'M3 21 C18 19 19 5 28 5 H45',
    1004: 'M3 21 C14 21 15 4 24 4 S34 21 45 21',
    1005: 'M3 5 H14 C20 5 20 21 24 21 S28 5 34 5 H45',
    1007: band.gain < 0 ? 'M3 20 H15 C25 20 23 5 33 5 H45' : 'M3 5 H15 C25 5 23 20 33 20 H45',
    1008: band.gain < 0 ? 'M3 5 H15 C25 5 23 20 33 20 H45' : 'M3 20 H15 C25 20 23 5 33 5 H45',
    1009: 'M3 12 H45',
  } as Record<number, string>)[band.type] ?? 'M3 12 H45');
</script>

<div class="row" style:--band-color={bandColor(index)} class:selected role="button" tabindex="0" aria-label={`Select band ${index + 1}`} aria-pressed={selected} onkeydown={(event) => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onSelect(); } }} onclick={onSelect} onfocusin={onSelect} class:bypassed style:grid-template-columns={BAND_ROW_COLS}>
  <div class="num">{String(index + 1).padStart(2, '0')}</div>
  <button
    class="byp"
    class:on={bypassed}
    title={bypassed ? 'Enable Band' : 'Disable Band'}
    aria-label={bypassed ? 'Enable Band' : 'Disable Band'}
    aria-pressed={!bypassed}
    onclick={() => onPatch({ bypass: !bypassed })}
    disabled={off}
  >
    <svg width="48" height="26" viewBox="0 0 48 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d={iconPath} />
    </svg>
  </button>
  <BandTypeSelect value={band.type} onChange={(t) => onPatch({ type: t })} {types} />
  <ValueField
    kind="hz"
    value={band.frequency}
    min={Eq.FREQ_MIN_HZ}
    max={Eq.FREQ_MAX_HZ}
    step={Eq.FREQ_STEP_HZ}
    align="right"
    disabled={off || bypassed}
    onChange={(v) => onPatch({ frequency: v })}
  />
  <ValueField
    kind="q"
    value={band.q}
    min={Eq.Q_MIN}
    max={Eq.Q_MAX}
    step={Eq.Q_STEP}
    align="right"
    disabled={off || bypassed}
    onChange={(v) => onPatch({ q: v })}
  />
    <ValueField
      kind="dB-signed"
      value={band.gain}
      min={Eq.BAND_GAIN_MIN_DB}
      max={Eq.BAND_GAIN_MAX_DB}
      step={Eq.BAND_GAIN_STEP_DB}
      tone="signed"
      align="right"
      disabled={off || bypassed}
      onChange={(v) => onPatch({ gain: v })}
    />
</div>

<style>
  .row :global(.vf[data-size="md"]) { height: 32px; font-size: 18px; }
  .row:hover { background: var(--wash); cursor: pointer; }
  .row.selected { background: var(--wash-strong); box-shadow: inset 3px 0 var(--band-color); }
  .row {
    display: grid;
    /* grid-template-columns set inline (BAND_ROW_COLS). */
    gap: 8px;
    padding: 0 14px;
    align-items: center;
    border-top: 1px solid var(--wash);
    font-family: var(--font-sans);
    font-size: 17px;
  }
  /* U-P3 policy B: no whole-row dim when the band is off (type = Flat). The
     row's structure and the FLAT type stay full-contrast; the freq/Q/gain
     ValueFields below are disabled in that state and carry the single dim
     layer alone. */

  .row.bypassed { opacity: 0.45; }
  .num { color: var(--band-color); font-weight: 600; font-size: 17px; font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; letter-spacing: 0; }
  .byp {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 32px;
    padding: 0;
    border-radius: var(--radius-s);
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-dim);
    cursor: pointer;
  }
  .byp:hover:not(:disabled) {
    color: var(--text);
    background: var(--wash);
  }
  .byp:disabled { opacity: var(--dim-disabled); cursor: default; }
  .byp.on { color: var(--warn); }
</style>
