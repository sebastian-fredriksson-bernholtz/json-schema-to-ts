import { A, B, U } from "ts-toolbelt";

import { Type } from "..";
import { Union, UnionType, UnionValues } from "../union";
import { Intersect } from "../intersection";

import { $Exclude } from ".";

export type DistributeUnion<U extends UnionType, E> = Union<
  RecurseOnUnionValues<UnionValues<U>, E>
>;

type RecurseOnUnionValues<V extends Type, E> = V extends infer T
  ? $Exclude<T, E>
  : never;

export type ExcludeUnion<V, U extends UnionType> = A.Equals<
  UnionValues<U>,
  never
> extends B.True
  ? V
  : ExcludeUnionValue<V, U.Last<UnionValues<U>>, U>;

type ExcludeUnionValue<V, L, U extends UnionType> = Intersect<
  $Exclude<V, L>,
  $Exclude<V, Union<U.Exclude<UnionValues<U>, L>>>
>;
