<script lang="ts">
  import Panel from '@/components/chrome/Panel.svelte';
  import BankCycle from '@/components/chrome/BankCycle.svelte';
  import BandRow, { BAND_ROW_COLS } from './BandRow.svelte';
  import type { FilterParams, FilterType, ChannelId } from '@/domain';

  const {
    bankChannel, onBankChannel, mono = false, stageLabel = 'PEQ',
    selectedBand, onSelect, enabled, onEnable,
    bands,
    onPatch,
    onReset,
    onSetBoth,
    types,
    onLibrary,
    link,
    onToggleLink,
  }: {
    mono?: boolean;
    stageLabel?: string;
    bankChannel: ChannelId;
    onBankChannel: (value: ChannelId) => void;
    selectedBand: number;
    onSelect: (index: number) => void;
    enabled?: boolean;
    onEnable: (value: boolean) => void;
    bands: FilterParams[];
    onPatch: (index: number, patch: Partial<FilterParams>) => void;
    onReset: () => void;
    onSetBoth: () => void;
    types?: FilterType[];
    onLibrary?: () => void;
    link: { grouped: boolean; locked: boolean; peerLabel: string; selectedShort: string };
    onToggleLink: () => void;
  } = $props();

  const linkTitle = $derived(
    link.locked
      ? `Unlink from ${link.peerLabel}`
      : `Link with ${link.peerLabel}: edits mirror to them, copying this channel's EQ first`,
  );
  const title = $derived(
    `${bands.length} Band ${stageLabel}${link.locked ? ` · ${link.selectedShort}+${link.peerLabel}` : ''}`,
  );
</script>

{#snippet lockGlyph(closed: boolean)}
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="7" width="10" height="7" rx="1.5" />
    <path d={closed ? 'M5 7V5a3 3 0 0 1 6 0v2' : 'M5 7V5a3 3 0 0 1 5.6-1.5'} />
  </svg>
{/snippet}

<div class="band-table">
<Panel code="EQ.02" {title}>
  {#snippet titleControl()}
    {#if enabled !== undefined}<label class="toggle-label"><input class="switch" role="switch" aria-label={`Enable ${stageLabel}`} type="checkbox" checked={enabled} onchange={(event) => onEnable(event.currentTarget.checked)} /></label>{/if}
  {/snippet}
  {#snippet right()}
    <BankCycle {mono} value={bankChannel} onChange={onBankChannel} />

    {#if link.grouped}
      <button
        class="chip hi act link"
        class:on={link.locked}
        title={linkTitle}
        aria-pressed={link.locked}
        onclick={onToggleLink}
      >{@render lockGlyph(link.locked)}LINK</button>
    {/if}
    {#if onLibrary}
      <button class="chip hi act" onclick={onLibrary} title="Browse the AutoEQ profile library">AUTOEQ</button>
    {/if}
    {#if !mono}<button class="chip hi act" onclick={onSetBoth}>Set Both Channels</button>{/if}
    <button class="chip hi act" onclick={onReset}>Reset</button>
  {/snippet}

  <div class="head" style:grid-template-columns={BAND_ROW_COLS}>
    <div>#</div>
    <div></div>
    <div>Filter</div>
    <div class="r">Frequency</div>
    <div class="r">Q</div>
    <div class="r">Gain</div>
  </div>

  {#each bands as band, i (i)}
    <BandRow selected={selectedBand === i} onSelect={() => onSelect(i)} index={i} {band} onPatch={(p) => onPatch(i, p)} {types} />
  {/each}
</Panel>
</div>

<style>
  .band-table { min-width: 0; }
  @media (max-width: 600px) {
    .band-table { --band-columns: 20px 44px minmax(68px, 1fr) minmax(62px, .85fr) minmax(38px, .5fr) minmax(70px, .85fr); }
    .band-table :global(.row), .head { gap: 4px; padding-left: 8px; padding-right: 8px; }
    .band-table :global(.row .vf[data-size="md"]) { padding-left: 2px; padding-right: 2px; font-size: 14px; }
    .band-table :global(.row .vf .unit) { font-size: 11px; }
    .band-table :global(.row .num) { font-size: 13px; }
    .band-table :global(.bts) { font-size: 13px; padding-left: 2px; padding-right: 20px !important; background-position: calc(100% - 11px) center, calc(100% - 7px) center !important; }
    .head { font-size: 11px; }
  }
  .link { display: inline-flex; align-items: center; gap: 5px; }

  .head {
    display: grid;
    /* grid-template-columns set inline (BAND_ROW_COLS), matching BandRow. */
    gap: 8px;
    padding: 6px 14px;
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--text-faint);
    letter-spacing: 0;
    border-bottom: 1px solid var(--border);
  }
  /* Match ValueField's internal 8px horizontal padding so the numeric
     labels sit directly above their right-aligned values. */
  .head .r { text-align: right; padding-right: 8px; }
</style>
