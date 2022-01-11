import { Get } from "../../../utils";

import { Resolve, Type, TypeId, Never, Error } from "..";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
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

export type ExclusionType = {
  type: ExclusionTypeId;
  source: Type;
  excluded: Type;
};

export type ExclusionSource<E extends ExclusionType> = E["source"];

export type ExclusionExcluded<E extends ExclusionType> = E["excluded"];

export type ResolveExclusion<E extends ExclusionType> = Resolve<
  $Exclude<ExclusionSource<E>, ExclusionExcluded<E>>
>;

// Prefixed with $ to not confuse with native TS Exclude
export type $Exclude<A, B> = {
  any: ExcludeFromAny<A, B>;
  never: Never;
  const: A extends ConstType ? ExcludeFromConst<A, B> : never;
  enum: A extends EnumType ? ExcludeFromEnum<A, B> : never;
  primitive: A extends PrimitiveType ? ExcludeFromPrimitive<A, B> : never;
  array: A extends ArrayType ? ExcludeFromArray<A, B> : never;
  tuple: A extends TupleType ? ExcludeFromTuple<A, B> : never;
  object: A extends ObjectType ? ExcludeFromObject<A, B> : never;
  union: A extends UnionType ? DistributeUnion<A, B> : never;
  intersection: $Exclude<ClearIntersections<A>, B>;
  exclusion: A extends ExclusionType
    ? $Exclude<$Exclude<ExclusionSource<A>, ExclusionExcluded<A>>, B>
    : never;
  error: A;
  errorMissingType: Error<"Missing type property in Exclusion source value">;
}[Get<A, "type"> extends TypeId ? Get<A, "type"> : "errorMissingType"];

export type IsExclusionRepresentable<E extends ExclusionType> = IsRepresentable<
  $Exclude<ExclusionSource<E>, ExclusionExcluded<E>>
>;
