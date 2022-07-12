import { LiteralToPrimitive } from 'type-fest';

export type MapLiteralToPrimitive<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends object ? T[K] : LiteralToPrimitive<T[K]>;
};
