import { LiteralToPrimitive, PlainObject, Simplify } from '@gilbarbara/types';

export type Concat<TBase extends string, TExtend extends string> = keyof {
  [K in TBase as `${K}-${TExtend}`]: any;
};

export type MapLiteralToPrimitive<T extends PlainObject> = Simplify<{
  [K in keyof T]: T[K] extends object ? T[K] : LiteralToPrimitive<T[K]>;
}>;
