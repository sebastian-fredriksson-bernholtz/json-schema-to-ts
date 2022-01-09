import { A, B } from "ts-toolbelt";

import { Get } from "../../utils";

export type EnumTypeId = "enum";

export type Enum<V> = {
  type: EnumTypeId;
  values: V;
};

export type EnumValues<E> = Get<E, "values">;

export type ResolveEnum<T> = EnumValues<T>;

export type IsEnumRepresentable<E> = A.Equals<
  EnumValues<E>,
  never
> extends B.True
  ? false
  : true;
