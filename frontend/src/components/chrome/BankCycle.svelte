<script lang="ts">
  import type { ChannelId } from '@/domain';
  const { value, onChange, label = 'EQ bank', mono = false }: {
    value: ChannelId; onChange: (value: ChannelId) => void; label?: string; mono?: boolean;
  } = $props();
</script>

<button type="button" class="chip hi bank-cycle" aria-label={`${label}: ${mono ? 'Mono' : value === 0 ? 'Left' : 'Right'}`} aria-disabled={mono} onclick={() => { if (!mono) onChange(value === 0 ? 1 : 0); }}>{mono ? 'Mono' : value === 0 ? 'Left' : 'Right'}</button>

<style>
  .bank-cycle { min-width: 70px; }
</style>
