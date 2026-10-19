export const FilterType = { Flat: 0, Peaking: 1 } as const;
export type FilterType = number;

export interface FilterParams {
  type: FilterType;
  bypass: boolean;
  frequency: number;
  q: number;
  gain: number;
}
