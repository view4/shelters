export const BoothKind = {
  MAPAL: 'mapal',
} as const;

export type BoothKind = (typeof BoothKind)[keyof typeof BoothKind];