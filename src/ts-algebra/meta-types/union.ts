import { DoesExtend } from "../../utils";

import { Resolve } from ".";
import { IsRepresentable } from "./isRepresentable";
import { Type } from "./type";

export type UnionTypeId = "union";

export type Union<V> = {
  type: UnionTypeId;
  values: V;
};

export type UnionType = {
  type: UnionTypeId;
  values: Type;
};

export type UnionValues<U extends UnionType> = U["values"];

export type ResolveUnion<U extends UnionType> = RecurseOnUnion<UnionValues<U>>;

type RecurseOnUnion<V extends Type> = V extends infer T ? Resolve<T> : never;

export type IsUnionRepresentable<U extends UnionType> = DoesExtend<
  true,
  AreUnionValuesRepresentable<UnionValues<U>>
>;

type AreUnionValuesRepresentable<V extends Type> = V extends infer T
  ? IsRepresentable<T>
  : never;
