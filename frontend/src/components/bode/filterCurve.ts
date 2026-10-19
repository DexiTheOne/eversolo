import { FilterType, type FilterParams } from '@/domain';
import { BODE_BINS, BODE_FREQS } from './bodeFreqs';

export const EQ_SAMPLE_RATE = 48000;

const TWO_PI = Math.PI * 2;
const LN10 = Math.log(10);

export interface BiquadCoeffs {
  b0: number; b1: number; b2: number;
  a1: number; a2: number;
}
type Coeffs = BiquadCoeffs;

function coeffsFor(type: FilterType, f: number, q: number, gainDb: number, fs: number): Coeffs | null {
  if (type === FilterType.Flat) return null;
  const w0 = TWO_PI * f / fs;
  const cosw0 = Math.cos(w0);
  const sinw0 = Math.sin(w0);
  const alpha = sinw0 / (2 * Math.max(0.001, q));

  if (type === FilterType.Peaking) {
    const A = Math.pow(10, gainDb / 40);
    const a0 = 1 + alpha / A;
    return {
      b0: (1 + alpha * A) / a0,
      b1: (-2 * cosw0) / a0,
      b2: (1 - alpha * A) / a0,
      a1: (-2 * cosw0) / a0,
      a2: (1 - alpha / A) / a0,
    };
  }

  return null;
}

// |H(e^jw)| in dB for one biquad section at frequency f.
function magDbAt(c: Coeffs, w: number): number {
  const cw = Math.cos(w), sw = Math.sin(w);
  const c2w = Math.cos(2 * w), s2w = Math.sin(2 * w);
  // numerator b0 + b1 e^-jw + b2 e^-2jw
  const numRe = c.b0 + c.b1 * cw + c.b2 * c2w;
  const numIm = -(c.b1 * sw + c.b2 * s2w);
  // denominator 1 + a1 e^-jw + a2 e^-2jw
  const denRe = 1 + c.a1 * cw + c.a2 * c2w;
  const denIm = -(c.a1 * sw + c.a2 * s2w);
  const num2 = numRe * numRe + numIm * numIm;
  const den2 = denRe * denRe + denIm * denIm;
  // 10*log10(|num|^2 / |den|^2) -- half the multiplications of taking sqrt first.
  return (10 / LN10) * Math.log(num2 / den2);
}

// Collect active peaking sections.
function sectionsFor(
  bands: ReadonlyArray<FilterParams>,
  fs: number,
): Coeffs[] {
  const out: Coeffs[] = [];
  for (const band of bands) {
    if (band.bypass) continue;
    const c = coeffsFor(band.type, band.frequency, band.q, band.gain, fs);
    if (c) out.push(c);
  }
  return out;
}

export function filterCurve(
  bands: ReadonlyArray<FilterParams>,
  preampDb: number,
): number[] {
  const fs = EQ_SAMPLE_RATE;
  const out = new Array<number>(BODE_BINS);
  for (let i = 0; i < BODE_BINS; i++) out[i] = preampDb;
  for (const c of sectionsFor(bands, fs)) {
    for (let i = 0; i < BODE_BINS; i++) {
      const w = TWO_PI * BODE_FREQS[i] / fs;
      out[i] += magDbAt(c, w);
    }
  }
  return out;
}
