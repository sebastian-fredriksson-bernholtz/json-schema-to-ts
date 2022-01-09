import { Get } from "../../../utils";

import { TypeId, Never, Error, Union } from "..";
import { Exclusion, ExclusionSource, ExclusionExcluded } from "../exclusion";

import { IntersectUnion } from "./union";
import { ClearIntersections, Intersect } from "./index";

export type ClearExclusionIntersections<A> = Exclusion<
  ClearIntersections<ExclusionSource<A>>,
  ClearIntersections<ExclusionExcluded<A>>
>;

export type IntersectExclusion<A, B> = {
  any: A;
  never: Never;
  const: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  enum: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  primitive: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  array: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  tuple: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  object: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  union: IntersectUnion<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: Exclusion<
    Intersect<ExclusionSource<A>, ExclusionSource<B>>,
    Union<ExclusionExcluded<A> | ExclusionExcluded<B>>
  >;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends TypeId ? Get<B, "type"> : "errorTypeProperty"];
