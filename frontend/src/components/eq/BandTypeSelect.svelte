<script lang="ts">
  import { FilterType } from '@/domain';
  const TYPE_LABELS: Record<number, string> = {
    0: 'Off', 1: 'Peaking', 1002: 'Low-Pass', 1003: 'High-Pass',
    1004: 'Band-Pass', 1005: 'Notch', 1007: 'Low Shelf',
    1008: 'High Shelf', 1009: 'All-Pass',
  };
  const {
    value,
    onChange,
    types = [FilterType.Peaking, 1002, 1003, 1004, 1005, 1007, 1008, 1009],
  }: {
    value: FilterType;
    onChange: (v: FilterType) => void;
    types?: FilterType[];
  } = $props();

  const isOff = $derived(value === FilterType.Flat);
  const unknownType = $derived(
    !types.includes(value),
  );
</script>

<select
  class="bts"
  class:off={isOff}
  value={value}
  onchange={(e) => onChange(Number((e.currentTarget as HTMLSelectElement).value) as FilterType)}
>
  {#each types as t (t)}
    <option value={t}>{TYPE_LABELS[t]}</option>
  {/each}
  {#if unknownType}
    <option value={value} disabled>{TYPE_LABELS[value] ?? `Device filter ${value - 1000}`}</option>
  {/if}
</select>

<style>
  .bts {
    width: 125px; max-width: 100%; justify-self: start;
    background: transparent;
    color: var(--text);
    border: 1px solid transparent;
    border-radius: var(--radius-s);
    padding: 2px 4px;
    font-family: var(--font-sans);
    font-size: 15px;
    min-height: 32px;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-image:
      linear-gradient(45deg, transparent 50%, var(--text-faint) 50%),
      linear-gradient(135deg, var(--text-faint) 50%, transparent 50%);
    background-position:
      calc(100% - 8px) center,
      calc(100% - 4px) center;
    background-size: 4px 4px, 4px 4px;
    background-repeat: no-repeat;
    padding-right: 16px;
  }
  .bts:hover { background-color: var(--wash-strong); }
  .bts:focus { outline: none; }
  .bts:focus-visible {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px color-mix(in oklab, var(--accent) 35%, transparent);
  }
  .bts.off { color: var(--text-faint); }
  .bts option { background: var(--panel-solid); color: var(--text); }
</style>
