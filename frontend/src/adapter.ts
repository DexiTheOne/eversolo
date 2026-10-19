import { STAGE_COLORS } from './styles/palette';
import { FilterType, type FilterParams, type ChannelId } from './domain';
import { filterCurve } from './components/bode/filterCurve';
import { BODE_BINS, BODE_FREQS } from './components/bode/bodeFreqs';

export interface Hass { callWS<T>(message: Record<string, unknown>): Promise<T>; }
export interface PanelInfo { config: { entry_id: string; title: string }; }
export interface Band { fc: number; q: number; gain: number; type: number; volume: number; bypass: boolean; }
export interface Settings {
  peqFirList?: Band[]; peqFirListRight?: Band[];
  eqGeqGainBeans?: {freq: number; gain: number}[]; eqGeqGainBeansRight?: {freq: number; gain: number}[];
  enableGeq?: boolean; enableGeqRight?: boolean;
  enablePeqLeftFir?: boolean; enablePeqRightFir?: boolean;
  enableLeftFir?: boolean; enableRightFir?: boolean;
  audioTunningEQList?: Band[];
  audioTunningEQListRight?: Band[];
  balance?: number;
  enableEQ?: boolean;
  enableEQRight?: boolean;
  settingType?: number;
  loudness?: number;
  loudnessRight?: number;
}
export interface Processing { firEnabled: { left: boolean; right: boolean }; hasFir: boolean; hasLoudness: boolean; }
export interface FirCurve { points: { x: number; y: number }[]; loaded: boolean; coordinate?: string; error?: string; }
export interface FirCurves { profile_id: number; revision: string; left: FirCurve; right: FirCurve; }
export interface Profile { id: number; name: string; revision: string; settings: Settings; processing?: Processing; }
export interface Output { id: number; name: string; eqId: number; enable: boolean; }
export interface Snapshot { profiles: { id: number; name: string }[]; outputs: Output[]; }
export const bandKey = (channel: ChannelId) => channel === 0 ? 'audioTunningEQList' : 'audioTunningEQListRight';
export const enableKey = (channel: ChannelId) => channel === 0 ? 'enableEQ' : 'enableEQRight';
export const loudnessKey = (_channel: ChannelId) => 'loudness' as const;
export const channelName = (channel: ChannelId) => channel === 0 ? 'left' : 'right';
export const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
export const channelBands = (settings: Settings, channel: ChannelId) => settings[bandKey(channel)] ?? [];
export const preamp = (settings: Settings, channel: ChannelId) => (channelBands(settings, channel)[0]?.volume ?? 0) / 10;

export function toUiBand(band: Band): FilterParams {
  return { frequency: band.fc, gain: band.gain, q: band.q, bypass: band.bypass,
    type: (band.type === 6 ? FilterType.Peaking : 1000 + band.type) as FilterType };
}

export const setBandEnabled = (band: Band, enabled: boolean, restoreGain = 0): Band =>
  ({...band, gain: enabled ? restoreGain : 0});
export const resetBand = (band: Band): Band => ({...band, gain: 0, q: 1, type: 6});

export function patchBand(band: Band, patch: Partial<FilterParams>): Band {
  const result = { ...band };
  if (patch.frequency !== undefined) result.fc = patch.frequency;
  if (patch.gain !== undefined) result.gain = patch.gain;
  if (patch.q !== undefined) result.q = patch.q;
  if (patch.bypass !== undefined) result.bypass = patch.bypass;
  if (patch.type !== undefined) {
    const code = patch.type === FilterType.Peaking ? 6 : patch.type - 1000;
    if (code < 2 || code > 9) throw new Error('Unverified Eversolo filter type');
    result.type = code;
  }
  return result;
}

export function responseSettings(settings: Settings, channel: ChannelId): Settings {
  if (settings.settingType !== 0 || channel === 0) return settings;
  return {...settings,
    audioTunningEQListRight: settings.audioTunningEQList, enableEQRight: settings.enableEQ,
    eqGeqGainBeansRight: settings.eqGeqGainBeans, enableGeqRight: settings.enableGeq,
    peqFirListRight: settings.peqFirList, enablePeqRightFir: settings.enablePeqLeftFir,
  };
}

export function preview(settings: Settings, channel: ChannelId): number[] | null {
  settings = responseSettings(settings, channel);
  const bands = channelBands(settings, channel);
  if (!bands.length) return null;
  if (settings[enableKey(channel)] === false) return filterCurve([], preamp(settings, channel));
  if (bands.some(band => !band.bypass && (band.type < 2 || band.type > 9))) return null;
  return filterCurve(bands.filter(band => band.type !== 9).map(toUiBand), preamp(settings, channel));
}

export interface ResponseStage {
  id: 'peq' | 'geq' | 'correction' | 'preamp' | 'balance' | 'fir' | 'loudness';
  label: string;
  detail: string;
  color: string;
  points: number[] | null;
  illustrative?: boolean;
}

export function firResponse(curve?: FirCurve): number[] | null {
  if (!curve?.loaded || curve.error || curve.coordinate !== 'log10_hz') return null;
  const points = curve.points.filter(point => Number.isFinite(point.x) && Number.isFinite(point.y))
    .sort((a, b) => a.x - b.x);
  if (points.length < 2 || points[0].x === points.at(-1)!.x) return null;
  // Captured PEQ x=1.30103 at 20 Hz and FIR FFT-bin positions are consistent
  // with log10(Hz). This axis interpretation remains labeled as inferred.
  return BODE_FREQS.map(frequency => {
    const x = Math.log10(frequency);
    if (x <= points[0].x) return points[0].y;
    if (x >= points.at(-1)!.x) return points.at(-1)!.y;
    const high = points.findIndex(point => point.x >= x);
    const a = points[high - 1], b = points[high];
    return a.y + (b.y - a.y) * ((x - a.x) / (b.x - a.x));
  });
}

export function geqResponse(bands?: {freq: number; gain: number}[]): number[] | null {
  if (!bands?.length) return null;
  const sorted = [...bands].sort((a, b) => a.freq - b.freq);
  return BODE_FREQS.map(frequency => {
    if (frequency <= sorted[0].freq) return sorted[0].gain;
    if (frequency >= sorted.at(-1)!.freq) return sorted.at(-1)!.gain;
    const high = sorted.findIndex(band => band.freq >= frequency);
    const a = sorted[high - 1], b = sorted[high];
    const t = Math.log(frequency / a.freq) / Math.log(b.freq / a.freq);
    const blend = (1 - Math.cos(Math.PI * t)) / 2;
    return a.gain + (b.gain - a.gain) * blend;
  });
}

export function processingStages(settings: Settings, channel: ChannelId, processing?: Processing, fir?: FirCurve): ResponseStage[] {
  settings = responseSettings(settings, channel);
  const stages: ResponseStage[] = [];
  const bands = channelBands(settings, channel);
  const enabled = settings[enableKey(channel)] !== false && bands.length > 0;
  if (bands.length) {
    const gain = preamp(settings, channel);
    stages.push({ id: 'preamp', label: 'Preamp', color: STAGE_COLORS.preamp,
      detail: `${gain > 0 ? '+' : ''}${gain.toFixed(1)} dB`, points: Array(BODE_BINS).fill(gain) });
  }
  const balance = settings.balance ?? 0;
  if (settings.balance !== undefined) {
    const attenuation = channel === 1 ? Math.min(0, balance) : -Math.max(0, balance);
    stages.push({ id: 'balance', label: 'Balance', color: STAGE_COLORS.balance,
      detail: balance < 0 ? `${Math.abs(balance).toFixed(1)} dB left` : `${balance.toFixed(1)} dB right`,
      points: Array(BODE_BINS).fill(attenuation) });
  }
  if (enabled) {
    const known = bands.every(band => band.bypass || (band.type >= 2 && band.type <= 9));
    stages.push({ id: 'peq', label: 'PEQ', color: STAGE_COLORS.peq,
      detail: known ? `${bands.filter(band => !band.bypass).length} active bands · Provisional 48 kHz preview` : 'Unmapped filter · curve unavailable',
      points: known ? filterCurve(bands.filter(band => band.type !== 9).map(toUiBand), 0) : null });
  }
  if (settings[channel === 0 ? 'enableGeq' : 'enableGeqRight']) {
    const gains = settings[channel === 0 ? 'eqGeqGainBeans' : 'eqGeqGainBeansRight'];
    stages.push({ id: 'geq', label: 'Graphic EQ', color: STAGE_COLORS.peq,
      detail: `${gains?.length ?? 0} bands`,
      points: geqResponse(gains) });
  }
  if (settings[channel === 0 ? 'enablePeqLeftFir' : 'enablePeqRightFir'])
  {
    const correction = settings[channel === 0 ? 'peqFirList' : 'peqFirListRight'] ?? [];
    const points = filterCurve(correction.map(toUiBand), 0);
    const gain = (correction[0]?.volume ?? 0) / 10;
    stages.push({ id: 'correction', label: 'Correction PEQ', color: STAGE_COLORS.peq,
      detail: `${correction.length} Bands`, points: points?.map(point => point + gain) ?? null });
  }
  if (settings[channel === 0 ? 'enableLeftFir' : 'enableRightFir'] ?? processing?.firEnabled[channelName(channel)]) stages.push({ id: 'fir', label: 'FIR', color: STAGE_COLORS.fir,
    detail: fir?.loaded ? 'Device response · read only' : 'Device curve unavailable', points: firResponse(fir) });
  if (settings[loudnessKey(channel)] === 1) stages.push({ id: 'loudness', label: 'Loudness', color: STAGE_COLORS.loudness,
    detail: 'Eversolo reference illustration', points: null, illustrative: true });
  const order: ResponseStage['id'][] = ['preamp', 'balance', 'geq', 'peq', 'correction', 'fir', 'loudness'];
  return stages.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

export function sumStages(stages: ResponseStage[]): { points: number[]; omitted: string[] } {
  const points = Array<number>(BODE_BINS).fill(0);
  const omitted: string[] = [];
  for (const stage of stages) {
    if (!stage.points || stage.illustrative) { omitted.push(stage.label); continue; }
    for (let i = 0; i < BODE_BINS; i++) points[i] += stage.points[i];
  }
  return { points, omitted };
}
