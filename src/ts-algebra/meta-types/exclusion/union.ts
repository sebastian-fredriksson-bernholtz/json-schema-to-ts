import { A, B, U } from "ts-toolbelt";

import { Union, UnionValues } from "../union";
import { Intersect } from "../intersection";

import { $Exclude } from ".";

export type DistributeUnion<U, E> = Union<RecurseOnUnion<UnionValues<U>, E>>;

type RecurseOnUnion<V, E> = V extends infer T ? $Exclude<T, E> : never;

export type ExcludeUnion<V, U> = A.Equals<UnionValues<U>, never> extends B.True
  ? V
  : ExcludeUnionValue<V, U.Last<UnionValues<U>>, U>;

type ExcludeUnionValue<V, L, U> = Intersect<
  $Exclude<V, L>,
  $Exclude<V, Union<U.Exclude<UnionValues<U>, L>>>
>;
