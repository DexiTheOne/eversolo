import type { ChannelId } from '@/domain';
export function chKey(id: ChannelId): string { return id === 0 ? 'left' : 'right'; }
export function chShade(id: ChannelId, _shade = 'base'): string {
  return id === 0 ? '#efeee9' : '#8bb8c1';
}

export const STAGE_COLORS = {
  preamp: '#e6b45f', balance: '#b598ef', peq: '#64b8ec', fir: '#67c9aa', loudness: '#e69ab9',
};
export const BAND_COLORS = ['#f2a6a6', '#efbd91', '#e8d48f', '#bbd994', '#91d3b2', '#8ed3d6', '#9dbff0', '#b6a5ed', '#d5a1df', '#e2e7ef'];
export const bandColor = (index: number): string => BAND_COLORS[index % BAND_COLORS.length];
