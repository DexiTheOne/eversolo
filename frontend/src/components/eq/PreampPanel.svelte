<script lang="ts">
  import Panel from '@/components/chrome/Panel.svelte';
  import ValueField from '@/components/chrome/ValueField.svelte';
  import { Eq, type ChannelId } from '@/domain';
  const { balance, onBalance, preampDb, rightPreampDb, onChange, onRightChange, onReset } : {
    balance?: number; onBalance: (value: number) => void;
    preampDb: number; rightPreampDb?: number; accentChannelId: ChannelId;
    onChange: (value: number) => void; onRightChange: (value: number) => void; onReset: () => void;
  } = $props();
</script>

<Panel code="EQ.03" title="Preamp & Balance">
  {#snippet right()}<button class="chip hi" onclick={onReset}>Reset</button>{/snippet}
  {#each rightPreampDb === undefined ? [0] : [0, 1] as channel}
    {@const value = channel === 0 ? preampDb : rightPreampDb!}
    {@const change = channel === 0 ? onChange : onRightChange}
    <div class="row">
      <span>{rightPreampDb === undefined ? 'Mono' : channel === 0 ? 'Left' : 'Right'}</span>
      <input aria-label={channel === 0 ? 'Left preamp' : 'Right preamp'} type="range" min={Eq.PREAMP_MIN_DB} max={Eq.PREAMP_MAX_DB} step={Eq.PREAMP_STEP_DB} {value} oninput={(event) => change(event.currentTarget.valueAsNumber)} />
      <div class="value"><ValueField kind="dB-signed" {value} min={Eq.PREAMP_MIN_DB} max={Eq.PREAMP_MAX_DB} step={Eq.PREAMP_STEP_DB} tone="signed" align="right" onChange={change} /></div>
    </div>
  {/each}
  {#if balance !== undefined}
    <div class="balance-control">
      <div class="balance-value"><span>Left</span><ValueField kind="dB-signed" align="center" value={balance} min={-6} max={6} step={0.1} precision={1} onChange={onBalance} /><span>Right</span></div>
      <input aria-label="PEQ balance" type="range" min="-6" max="6" step="0.1" value={balance} oninput={(event) => onBalance(event.currentTarget.valueAsNumber)} />
    </div>
  {/if}
</Panel>

<style>
  .row { display: flex; align-items: center; gap: 14px; padding: 8px 22px; }
  .row > span { width: 40px; font-size: 14px; color: var(--text-dim); }
  .row > input { flex: 1; min-width: 0; }
  .value { width: 112px; }
  input[type=range] { appearance: none; background: transparent; height: 30px; cursor: pointer; }
  input[type=range]::-webkit-slider-runnable-track { height: 6px; background: #4a4a46; border-radius: 4px; }
  input[type=range]::-webkit-slider-thumb { appearance: none; width: 8px; height: 24px; margin-top: -9px; background: #eeeeea; border-radius: 3px; }
  input[type=range]::-moz-range-track { height: 6px; background: #4a4a46; border-radius: 4px; }
  input[type=range]::-moz-range-thumb { width: 8px; height: 24px; background: #eeeeea; border: 0; border-radius: 3px; }
  .balance-control { padding: 4px 22px 14px; }
  .balance-value { display: grid; grid-template-columns: 1fr 120px 1fr; align-items: center; gap: 12px; }
  .balance-value > span:last-child { text-align: right; }
  .balance-control input { width: 100%; }
</style>
