<script lang="ts">
  import BodePlot, { type BodeCurve } from '../bode/BodePlot.svelte';
  import { STAGE_COLORS } from '@/styles/palette';
  const { compact = false }: { compact?: boolean } = $props();

  // Reference contours traced from the supplied app illustration. These are
  // schematic shapes, not measured Eversolo transfer functions or DSP inputs.
  const contours = [
    [22, 21, 20, 19.5, 19, 18.5, 17, 14, 12, 18, 20, 23],
    [9, 6, 3, 0, -2, -3, -3, -3, -4, 2, 2.5, 7],
    [1, -5, -12, -18, -23, -24, -26, -27, -26, -20, -17, -12],
  ];
  const positions = [0, .12, .24, .36, .48, .56, .64, .72, .8, .87, .95, 1];
  function sample(values: number[]): number[] {
    return Array.from({ length: 201 }, (_, i) => {
      const x = i / 200;
      let k = 0;
      while (k < positions.length - 2 && x > positions[k + 1]) k++;
      const t = (x - positions[k]) / (positions[k + 1] - positions[k]);
      const previous = values[Math.max(0, k - 1)];
      const next = values[Math.min(values.length - 1, k + 2)];
      const m0 = k === 0 ? values[1] - values[0] : (values[k + 1] - previous) / (positions[k + 1] - positions[k - 1]) * (positions[k + 1] - positions[k]);
      const m1 = k === values.length - 2 ? values[k + 1] - values[k] : (next - values[k]) / (positions[k + 2] - positions[k]) * (positions[k + 1] - positions[k]);
      return (2*t**3 - 3*t**2 + 1)*values[k] + (t**3 - 2*t**2 + t)*m0 + (-2*t**3 + 3*t**2)*values[k+1] + (t**3 - t**2)*m1;
    });
  }
  const curves: BodeCurve[] = contours.map((values, index) => ({
    id: `loudness-reference-${index}`, label: `Reference contour ${index + 1}`,
    points: sample(values), color: STAGE_COLORS.loudness, width: 2,
  }));
  function miniature(points: number[]) {
    return points.map((value, index) => `${index ? 'L' : 'M'}${4 + index * .46},${3 + (26 - value) / 56 * 42}`).join(' ');
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
