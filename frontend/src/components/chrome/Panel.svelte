<script lang="ts">
  import type { Snippet } from 'svelte';

  const {
    code,
    title,
    right,
    titleControl,
    children,
    stackActions = false,
  }: {
    code?: string;
    title: string;
    right?: Snippet;
    titleControl?: Snippet;
    children: Snippet;
    stackActions?: boolean;
  } = $props();
</script>

<section class="panel">
  <header class:stack-actions={stackActions}>
    {#if code}<span class="code">{code}</span>{/if}
    <span class="title">{title}{#if titleControl}{@render titleControl()}{/if}</span>
    <span class="right">{#if right}{@render right()}{/if}</span>
  </header>
  <div class="body">
    {@render children()}
  </div>
</section>

<style>
  .panel {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  header {
    min-height: 53px;
    flex-shrink: 0;
    padding: 4px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--border);
    font-family: var(--font-sans);
  }
  .code {
    display: none;
  }
  .title {
    display: flex; align-items: center; gap: 14px;
    font-size: 19px;
    color: var(--text);
    letter-spacing: 0;
    font-weight: 600;
    flex: 1;
  }
  .right { display: flex; align-items: center; justify-content: flex-end; margin-left: auto; gap: 6px; }
  .body { flex: 1; min-height: 0; overflow: auto; }
  @media (max-width: 900px) { header.stack-actions { flex-wrap: wrap; justify-content: center; } header.stack-actions .title { flex-basis: 100%; flex-wrap: wrap; justify-content: center; text-align: center; } header.stack-actions .right { max-width: 100%; margin-inline: auto; justify-content: center; } }
  @media (max-width: 600px) { header { padding: 4px 12px; flex-wrap: wrap; gap: 12px; }.title { min-width: 140px; }.right { flex-wrap: wrap; } }
</style>
