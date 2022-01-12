import { Type, TypeId, Never, Error } from "..";
import { $Union, UnionType, UnionValues } from "../union";

import { $ClearIntersections, $Intersect } from "./index";

export type ClearUnionIntersections<A extends UnionType> = $Union<
  ClearUnionValuesIntersections<UnionValues<A>>
>;

type ClearUnionValuesIntersections<V extends Type> = V extends infer T
  ? $ClearIntersections<T>
  : never;

export type IntersectUnion<A extends UnionType, B> = {
  any: A;
  never: Never;
  const: DistributeIntersection<A, B>;
  enum: DistributeIntersection<A, B>;
  primitive: DistributeIntersection<A, B>;
  array: DistributeIntersection<A, B>;
  tuple: DistributeIntersection<A, B>;
  object: DistributeIntersection<A, B>;
  union: DistributeIntersection<A, B>;
  exclusion: DistributeIntersection<A, B>;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

export type DistributeIntersection<A extends UnionType, B> = $Union<
  RecurseOnUnionValues<UnionValues<A>, B>
>;

type RecurseOnUnionValues<V extends Type, B> = V extends infer T
  ? $Intersect<T, B>
  : never;
