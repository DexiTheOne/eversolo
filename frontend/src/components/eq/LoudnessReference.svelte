<script lang="ts">
  import BodePlot, { type BodeCurve } from '../bode/BodePlot.svelte';
  import { STAGE_COLORS } from '@/styles/palette';
  const { compact = false }: { compact?: boolean } = $props();

  import contours from './loudnessReferencePoints.json';
  const curves: BodeCurve[] = contours.map((values, index) => ({
    id: `loudness-reference-${index}`, label: `Reference contour ${index + 1}`,
    points: values, color: STAGE_COLORS.loudness, width: 2,
  }));
  function miniature(points: number[]) {
    return points.map((value, index) => `${index ? 'L' : 'M'}${4 + index / (points.length - 1) * 92},${3 + (26 - value) / 56 * 42}`).join(' ');
  }
</script>

{#if compact}
  <svg class="mini" viewBox="0 0 100 48" preserveAspectRatio="none" role="img" aria-label="Eversolo loudness reference illustration">
    <line class="zero-reference" x1="4" x2="96" y1={3 + 26 / 56 * 42} y2={3 + 26 / 56 * 42} />
    {#each curves as curve (curve.id)}<path d={miniature(curve.points)} stroke={STAGE_COLORS.loudness} />{/each}
  </svg>
{:else}
  <div class="reference-plot" role="group" aria-label="Eversolo loudness reference graph">
    <BodePlot {curves} zeroColor="#92928d" height={280} yRange={[-36, 30]} />
  </div>
{/if}

<style>
  .mini { display: block; width: 100%; height: 40px; }
  .zero-reference { stroke: #92928d; stroke-width: 1; vector-effect: non-scaling-stroke; }
  .mini path { fill: none; stroke-width: 1.4; vector-effect: non-scaling-stroke; }
  .reference-plot { width: 100%; }
</style>
