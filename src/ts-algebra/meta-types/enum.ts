import { A, B } from "ts-toolbelt";

export type EnumTypeId = "enum";

export type Enum<V extends any> = {
  type: EnumTypeId;
  values: V;
};

export type EnumType = {
  type: EnumTypeId;
  values: any;
};

export type EnumValues<E extends EnumType> = E["values"];

export type ResolveEnum<T extends EnumType> = EnumValues<T>;

export type IsEnumRepresentable<E extends EnumType> = A.Equals<
  EnumValues<E>,
  never
> extends B.True
  ? false
  : true;
