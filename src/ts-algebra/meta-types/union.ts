import { DoesExtend, Get } from "../../utils";

import { Resolve } from ".";
import { IsRepresentable } from "./isRepresentable";

export type UnionTypeId = "union";

export type Union<V> = {
  type: UnionTypeId;
  values: V;
};

export type UnionValues<U> = Get<U, "values">;

export type ResolveUnion<U> = RecurseOnUnion<UnionValues<U>>;

type RecurseOnUnion<V> = V extends infer T ? Resolve<T> : never;

export type IsUnionRepresentable<U> = DoesExtend<
  true,
  AreUnionValuesRepresentable<UnionValues<U>>
>;

type AreUnionValuesRepresentable<V> = V extends infer T
  ? IsRepresentable<T>
  : never;
