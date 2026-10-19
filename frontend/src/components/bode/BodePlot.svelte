<script lang="ts" module>
  import type { ChannelId } from '@/domain';

  // Curve-only API. Callers provide pre-sampled magnitude points on the
  // canonical frequency grid (see bodeFreqs.ts). The plot is dumb about EQ
  // semantics -- it only draws.
  export type BodeCurve = {
    id: string;
    /** Magnitude samples at BODE_FREQS. Values outside yRange are clipped. */
    points: number[];
    /** Channel id whose palette colors the stroke + (single-curve) fill. */
    channelId?: ChannelId;
    label?: string;
    /** Render the stroke as a horizontal gradient between two channels'
     *  palette colors (left-edge -> right-edge of the plot). Used to depict
     *  a stereo-locked pair as a single line whose color fades between the
     *  two channels. */
    gradientChannelIds?: [ChannelId, ChannelId];
    /** Explicit stroke/fill color, wins over channelId/gradientChannelIds/default. */
    color?: string;
    dashed?: boolean;
    width?: number;
    fillOpacity?: number;
  };

  // Optional EQ-style band markers drawn on top of the curves.
  export type BodeMarker = {
    id?: string;
    f: number;
    db: number;
    channelId?: ChannelId;
    label?: string;
  };
</script>

<script lang="ts">
  import { BODE_BINS, fForXNorm } from './bodeFreqs';
  import { Eq } from '@/domain';
  import { chShade } from '@/styles/palette';

  const {
    curves,
    markers = [],
    yRange = [Eq.BODE_DB_RANGE[0], Eq.BODE_DB_RANGE[1]] as [number, number],
    height = 220,
    crosshair = true,
    zeroColor = '#9e3d37',
    onRangeChange,
  }: {
    curves: BodeCurve[];
    markers?: BodeMarker[];
    yRange?: [number, number];
    height?: number;
    crosshair?: boolean;
    zeroColor?: string;
    onRangeChange?: (range: [number, number]) => void;
  } = $props();

  // Internal coordinate system. W tracks the wrapper's measured pixel width
  // (via bind:clientWidth) so the viewBox matches the rendered size 1:1 --
  // no x-stretch of strokes or text on wide containers.
  const PAD_L = 42;
  const PAD_B = 28;
  let containerW = $state(720);
  const svgWidth = $derived(Math.max(140, containerW));
  const W = $derived(svgWidth - 20); // Leave room to center the final frequency label.

  const yMin = $derived(yRange[0]);
  const yMax = $derived(yRange[1]);
  const plotW = $derived(W - PAD_L);
  const plotH = $derived(height - PAD_B);

  // Pre-mapped x-coords for the frequency bins (constant once W/PAD_L are fixed).
  const binsX = $derived.by(() => {
    const out = new Array<number>(BODE_BINS);
    for (let i = 0; i < BODE_BINS; i++) {
      out[i] = PAD_L + (i / (BODE_BINS - 1)) * plotW;
    }
    return out;
  });

  function yForDb(db: number): number {
    return plotH - ((db - yMin) / (yMax - yMin)) * plotH;
  }
  function xNormForFLocal(f: number): number {
    return Math.log(f / Eq.FREQ_MIN_HZ) / Math.log(Eq.FREQ_MAX_HZ / Eq.FREQ_MIN_HZ);
  }
  function xForF(f: number): number {
    return PAD_L + xNormForFLocal(f) * plotW;
  }

  function responsePath(pts: ReadonlyArray<[number, number]>): string {
    return pts.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  }

  function strokeFor(c: BodeCurve): string {
    if (c.color) return c.color;
    if (c.gradientChannelIds) return `url(#bodeGrad-${c.id})`;
    return c.channelId != null ? chShade(c.channelId, 'bright') : 'var(--accent)';
  }
  function fillStopFor(c: BodeCurve): string {
    if (c.color) return c.color;
    return c.channelId != null ? chShade(c.channelId, 'bright') : 'var(--accent)';
  }
  function gradientChannelColor(id: ChannelId): string {
    return chShade(id, 'bright');
  }

  const built = $derived.by(() => {
    return curves.map((c) => {
      const pts: Array<[number, number]> = new Array(BODE_BINS);
      for (let i = 0; i < BODE_BINS; i++) {
        pts[i] = [binsX[i], yForDb(c.points[i] ?? 0)];
      }
      return { c, d: responsePath(pts), pts };
    });
  });

  const single = $derived(curves.length === 1);

  const F_MAJOR = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
  const F_LABELS = $derived(W < 600 ? [20, 80, 320, 1200, 5000, 20000] : F_MAJOR);
  const F_MINOR: number[] = (() => {
    const set = new Set(F_MAJOR);
    const out: number[] = [];
    for (const dec of [10, 100, 1000, 10000]) {
      for (let m = 2; m <= 9; m++) {
        const f = dec * m;
        if (f >= Eq.FREQ_MIN_HZ && f <= Eq.FREQ_MAX_HZ && !set.has(f)) out.push(f);
      }
    }
    return out;
  })();

  const yTicks = $derived.by(() => {
    // Pick a "nice" step (1, 2, 5, 10, 20...) so labels are round dB
    // values, then emit every multiple of step that falls inside yRange.
    // Targets ~5 ticks. Always includes 0 if 0 is in range.
    const span = yMax - yMin;
    const rough = span / 4;
    const pow10 = Math.pow(10, Math.floor(Math.log10(rough)));
    const norm = rough / pow10;
    const niceNorm = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
    const step = niceNorm * pow10;
    const start = Math.ceil(yMin / step) * step;
    const out: number[] = [];
    for (let v = start; v <= yMax + 1e-9; v += step) {
      out.push(Math.round(v * 1e6) / 1e6);
    }
    return out;
  });

  function fmtFreqLabel(f: number): string {
    if (f >= 1000) {
      return `${f / 1000}k`;
    }
    return String(f);
  }
  function fmtFreqReadout(f: number): string {
    if (f >= 1000) return `${(f / 1000).toFixed(2)} kHz`;
    return `${Math.round(f)} Hz`;
  }
  function fmtDbReadout(db: number): string {
    const s = db >= 0 ? '+' : '';
    return `${s}${db.toFixed(1)} dB`;
  }

  // Unique per mounted instance so multiple plots on one page (Overview,
  // per-channel EQ tabs, ...) don't collide on the clipPath id.
  const clipId = `bode-plot-clip-${Math.random().toString(36).slice(2)}`;

  // Crosshair state (in internal coords). Hidden when null.
  let cx = $state<number | null>(null);
  let cy = $state<number | null>(null);
  let svgEl = $state<SVGSVGElement | null>(null);

  let drag = $state<{ y: number; range: [number, number]; id: number } | null>(null);
  function startPan(event: PointerEvent) {
    if (!onRangeChange || event.button !== 0 || !svgEl) return;
    event.preventDefault();
    drag = { y: event.clientY, range: [...yRange], id: event.pointerId };
    cx = null; cy = null;
    svgEl.setPointerCapture(event.pointerId);
  }
  function movePointer(event: PointerEvent) {
    if (!drag || !svgEl || !onRangeChange) { onMove(event); return; }
    const span = drag.range[1] - drag.range[0];
    const delta = (event.clientY - drag.y) / (svgEl.getBoundingClientRect().height * plotH / height) * span;
    onRangeChange([drag.range[0] + delta, drag.range[1] + delta]);
  }
  function endPan(event: PointerEvent) {
    if (!drag) return;
    if (svgEl?.hasPointerCapture(event.pointerId)) svgEl.releasePointerCapture(event.pointerId);
    drag = null;
  }
  function onMove(e: PointerEvent) {
    if (!crosshair || !svgEl) return;
    const r = svgEl.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const sx = (e.clientX - r.left) / r.width;
    const sy = (e.clientY - r.top) / r.height;
    let ix = sx * svgWidth;
    const iy = sy * height;
    if (ix < PAD_L || ix > W || iy < 0 || iy > plotH) {
      cx = null;
      cy = null;
      return;
    }
    // Snap x to nearest of the frequency bins.
    const xn = (ix - PAD_L) / plotW;
    const bin = Math.max(0, Math.min(BODE_BINS - 1, Math.round(xn * (BODE_BINS - 1))));
    ix = binsX[bin];
    cx = ix;
    cy = iy;
  }
  function onLeave() {
    cx = null;
    cy = null;
  }

  // Crosshair readout values.
  const cFreq = $derived.by(() => {
    if (cx == null) return null;
    const xn = (cx - PAD_L) / plotW;
    return fForXNorm(Math.max(0, Math.min(1, xn)));
  });
  const cDb = $derived.by(() => {
    if (cy == null) return null;
    const t = (plotH - cy) / plotH;
    return yMin + t * (yMax - yMin);
  });

  // Clamp readout badge inside the plot.
  function badgeX(x: number): number {
    return Math.max(PAD_L + 4, Math.min(W - 156, x + 6));
  }
  function badgeY(y: number): number {
    return Math.max(22, Math.min(plotH - 6, y - 8));
  }
</script>

<div class="bode-wrap" bind:clientWidth={containerW}>
<svg
  bind:this={svgEl}
  class="bode"
  class:pannable={!!onRangeChange}
  class:dragging={!!drag}
  viewBox={`0 0 ${svgWidth} ${height}`}
  width="100%"
  {height}
  role="img"
  aria-label="Frequency response plot"
  onpointerdown={startPan}
  onpointermove={movePointer}
  onpointerup={endPan}
  onpointercancel={endPan}
  onlostpointercapture={() => drag = null}
  onpointerleave={onLeave}
>
  <defs>
    <clipPath id={clipId}>
      <rect x={PAD_L} y="0" width={plotW} height={plotH} />
    </clipPath>
    {#if single && curves[0]}
      <linearGradient id="bodeFill-{curves[0].id}" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color={fillStopFor(curves[0])} stop-opacity="0.25" />
        <stop offset="100%" stop-color={fillStopFor(curves[0])} stop-opacity="0" />
      </linearGradient>
    {/if}
    {#each curves as c (c.id)}
      {#if c.gradientChannelIds}
        <linearGradient
          id="bodeGrad-{c.id}"
          gradientUnits="userSpaceOnUse"
          x1={PAD_L} x2={W} y1={0} y2={0}
        >
          <stop offset="0%" stop-color={gradientChannelColor(c.gradientChannelIds[0])} />
          <stop offset="100%" stop-color={gradientChannelColor(c.gradientChannelIds[1])} />
        </linearGradient>
      {/if}
    {/each}
  </defs>

  {#each F_MINOR as f (f)}
    <line
      x1={xForF(f)} x2={xForF(f)} y1={0} y2={plotH}
      stroke="color-mix(in oklab, var(--text) 3.5%, transparent)" stroke-width="0.5"
      vector-effect="non-scaling-stroke"
    />
  {/each}

  {#each yTicks as db (db)}
    {@const y = yForDb(db)}
    <line
      x1={PAD_L} x2={W} y1={y} y2={y}
      stroke={db === 0
        ? zeroColor
        : '#353531'}
      stroke-dasharray={db === 0 ? '6 5' : ''}
      stroke-width={db === 0 ? 1 : 0.5}
      vector-effect="non-scaling-stroke"
    />
    <text
      x={PAD_L - 8} y={y} dominant-baseline="middle" text-anchor="end" font-size="14"
      fill="var(--text-dim)" font-family="var(--font-sans)"
    >
      {db > 0 ? '+' : ''}{db}
    </text>
  {/each}

  {#each F_LABELS as f (f)}
    {@const x = xForF(f)}
    <line
      x1={x} x2={x} y1={0} y2={plotH}
      stroke="color-mix(in oklab, var(--text) 10%, transparent)" stroke-width="0.6"
      vector-effect="non-scaling-stroke"
    />
    <text
      x={x} y={plotH + 22} text-anchor="middle" font-size="14"
      fill="var(--text-dim)" font-family="var(--font-sans)"
    >
      {fmtFreqLabel(f)}
    </text>
  {/each}

  <!-- Curve stroke/fill and band markers can extend past yRange (e.g. an
       LR8 crossover skirt well below the axis, or a big LT/shelf boost
       above it) -- clip to the plot rect so they never paint over the
       axis label margins instead of distorting the shape by clamping
       every point. -->
  <g clip-path="url(#{clipId})">
    {#if single && built[0]}
      <path
        d={built[0].d + ` L ${W} ${plotH} L ${PAD_L} ${plotH} Z`}
        fill="url(#bodeFill-{curves[0].id})"
        vector-effect="non-scaling-stroke"
      />
    {/if}

    {#each built as b (b.c.id)}
      {#if b.c.fillOpacity}
        <path class="band-fill" d={b.d + ` L ${W} ${yForDb(0)} L ${PAD_L} ${yForDb(0)} Z`}
          fill={strokeFor(b.c)} fill-opacity={b.c.fillOpacity} stroke="none" />
      {/if}
    {/each}
    {#each built as b (b.c.id)}
      <path
        d={b.d}
        fill="none"
        stroke={strokeFor(b.c)}
        stroke-width={b.c.width ?? 1.6}
        stroke-dasharray={b.c.dashed ? '5 4' : undefined}
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    {/each}

    {#each markers as m, i (m.id ?? i)}
      {@const mx = xForF(Math.max(Eq.FREQ_MIN_HZ, Math.min(Eq.FREQ_MAX_HZ, m.f)))}
      {@const my = yForDb(Math.max(yMin, Math.min(yMax, m.db)))}
      {@const mc = m.channelId != null
        ? chShade(m.channelId, 'bright')
        : 'color-mix(in oklab, var(--text) 85%, transparent)'}
      <line
        x1={mx} x2={mx} y1={my} y2={plotH}
        stroke={mc} stroke-opacity="0.25" stroke-dasharray="2 3"
        vector-effect="non-scaling-stroke" pointer-events="none"
      />
      <circle cx={mx} cy={my} r="3.5" fill={mc} stroke="var(--bg)" stroke-width="1.2" pointer-events="none" />
      {#if m.label}
        <text
          x={mx} y={my - 8} text-anchor="middle" font-size="14"
          fill="color-mix(in oklab, var(--text) 70%, transparent)" font-family="var(--font-sans)" pointer-events="none"
        >
          {m.label}
        </text>
      {/if}
    {/each}
  </g>

  {#if crosshair && cx != null && cy != null && cFreq != null && cDb != null}
    <line
      x1={cx} x2={cx} y1={0} y2={plotH}
      stroke="color-mix(in oklab, var(--text) 35%, transparent)" stroke-width="0.7"
      stroke-dasharray="2 3"
      vector-effect="non-scaling-stroke" pointer-events="none"
    />
    <line
      x1={PAD_L} x2={W} y1={cy} y2={cy}
      stroke="color-mix(in oklab, var(--text) 25%, transparent)" stroke-width="0.7"
      stroke-dasharray="2 3"
      vector-effect="non-scaling-stroke" pointer-events="none"
    />
    <g pointer-events="none" transform={`translate(${badgeX(cx)} ${badgeY(cy)})`}>
      <rect
        x="0" y="-20" width="150" height="28" rx="5"
        fill="var(--panel-hi)"
        stroke="var(--border-hi)" stroke-width="0.6"
      />
      <text
        x="8" y="-1" font-size="14" font-family="var(--font-sans)"
        fill="color-mix(in oklab, var(--text) 92%, transparent)"
      >
        {fmtFreqReadout(cFreq)} · {fmtDbReadout(cDb)}
      </text>
    </g>
  {/if}
</svg>
</div>

<style>
  .bode-wrap {
    width: 100%;
  }
  .bode.pannable { cursor: grab; }
  .bode.dragging { cursor: grabbing; }
  .bode {
    display: block;
    touch-action: none;
    user-select: none;
  }
</style>
