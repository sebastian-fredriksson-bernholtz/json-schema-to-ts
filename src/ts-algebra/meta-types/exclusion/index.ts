import { Get } from "../../../utils";

import { Resolve, TypeId, Never, Error } from "..";
import { ClearIntersections } from "../intersection";

import { ExcludeFromAny } from "./any";
import { ExcludeFromConst } from "./const";
import { ExcludeFromEnum } from "./enum";
import { ExcludeFromPrimitive } from "./primitive";
import { ExcludeFromArray } from "./array";
import { ExcludeFromTuple } from "./tuple";
import { ExcludeFromObject } from "./object";
import { DistributeUnion } from "./union";
import { IsRepresentable } from "../isRepresentable";

export type ExclusionTypeId = "exclusion";

export type Exclusion<V, E> = {
  type: ExclusionTypeId;
  source: V;
  excluded: E;
};

export type ExclusionSource<E> = Get<E, "source">;

export type ExclusionExcluded<E> = Get<E, "excluded">;

export type ResolveExclusion<E> = Resolve<
  $Exclude<ExclusionSource<E>, ExclusionExcluded<E>>
>;

// Prefixed with $ to not confuse with native TS Exclude
export type $Exclude<A, B> = {
  any: ExcludeFromAny<A, B>;
  never: Never;
  const: ExcludeFromConst<A, B>;
  enum: ExcludeFromEnum<A, B>;
  primitive: ExcludeFromPrimitive<A, B>;
  array: ExcludeFromArray<A, B>;
  tuple: ExcludeFromTuple<A, B>;
  object: ExcludeFromObject<A, B>;
  union: DistributeUnion<A, B>;
  intersection: $Exclude<ClearIntersections<A>, B>;
  exclusion: $Exclude<$Exclude<ExclusionSource<A>, ExclusionExcluded<A>>, B>;
  error: A;
  errorMissingType: Error<"Missing type property in Exclusion source value">;
}[Get<A, "type"> extends TypeId ? Get<A, "type"> : "errorMissingType"];

export type IsExclusionRepresentable<E> = IsRepresentable<
  $Exclude<ExclusionSource<E>, ExclusionExcluded<E>>
>;
