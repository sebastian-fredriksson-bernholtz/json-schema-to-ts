import { Get } from "../../../utils";

import { TypeId, Never, Error, Union } from "..";
import { UnionType } from "../union";
import {
  Exclusion,
  ExclusionType,
  ExclusionSource,
  ExclusionExcluded,
} from "../exclusion";

import { IntersectUnion } from "./union";
import { ClearIntersections, Intersect } from "./index";

export type ClearExclusionIntersections<A extends ExclusionType> = Exclusion<
  ClearIntersections<ExclusionSource<A>>,
  ClearIntersections<ExclusionExcluded<A>>
>;

export type IntersectExclusion<A extends ExclusionType, B> = {
  any: A;
  never: Never;
  const: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  enum: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  primitive: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  array: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  tuple: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  object: Exclusion<Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>;
  union: B extends UnionType ? IntersectUnion<B, A> : never;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: B extends ExclusionType
    ? Exclusion<
        Intersect<ExclusionSource<A>, ExclusionSource<B>>,
        Union<ExclusionExcluded<A> | ExclusionExcluded<B>>
      >
    : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends TypeId ? Get<B, "type"> : "errorTypeProperty"];
