import { $Resolve, Type, TypeId, Never, Error } from "..";
import { AnyType } from "../any";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { $ClearIntersections } from "../intersection";

import { ExcludeFromAny } from "./any";
import { ExcludeFromConst } from "./const";
import { ExcludeFromEnum } from "./enum";
import { ExcludeFromPrimitive } from "./primitive";
import { ExcludeFromArray } from "./array";
import { ExcludeFromTuple } from "./tuple";
import { ExcludeFromObject } from "./object";
import { DistributeUnion } from "./union";
import { $IsRepresentable } from "../isRepresentable";

export type ExclusionTypeId = "exclusion";

export type Exclusion<V extends Type, E extends Type> = {
  type: ExclusionTypeId;
  source: V;
  excluded: E;
};

export type $Exclusion<V, E> = {
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

export type ResolveExclusion<E extends ExclusionType> = $Resolve<
  _$Exclude<ExclusionSource<E>, ExclusionExcluded<E>>
>;

// Prefixed with _ to not confuse with native TS Exclude
export type _Exclude<A extends Type, B extends Type> = {
  any: A extends AnyType ? ExcludeFromAny<A, B> : never;
  never: Never;
  const: A extends ConstType ? ExcludeFromConst<A, B> : never;
  enum: A extends EnumType ? ExcludeFromEnum<A, B> : never;
  primitive: A extends PrimitiveType ? ExcludeFromPrimitive<A, B> : never;
  array: A extends ArrayType ? ExcludeFromArray<A, B> : never;
  tuple: A extends TupleType ? ExcludeFromTuple<A, B> : never;
  object: A extends ObjectType ? ExcludeFromObject<A, B> : never;
  union: A extends UnionType ? DistributeUnion<A, B> : never;
  intersection: _$Exclude<$ClearIntersections<A>, B>;
  exclusion: A extends ExclusionType
    ? _$Exclude<_Exclude<ExclusionSource<A>, ExclusionExcluded<A>>, B>
    : never;
  error: A;
}[A["type"]];

// Prefixed with _ to not confuse with native TS Exclude
export type _$Exclude<A, B> = {
  any: A extends AnyType ? ExcludeFromAny<A, B> : never;
  never: Never;
  const: A extends ConstType ? ExcludeFromConst<A, B> : never;
  enum: A extends EnumType ? ExcludeFromEnum<A, B> : never;
  primitive: A extends PrimitiveType ? ExcludeFromPrimitive<A, B> : never;
  array: A extends ArrayType ? ExcludeFromArray<A, B> : never;
  tuple: A extends TupleType ? ExcludeFromTuple<A, B> : never;
  object: A extends ObjectType ? ExcludeFromObject<A, B> : never;
  union: A extends UnionType ? DistributeUnion<A, B> : never;
  intersection: _$Exclude<$ClearIntersections<A>, B>;
  exclusion: A extends ExclusionType
    ? _$Exclude<_Exclude<ExclusionSource<A>, ExclusionExcluded<A>>, B>
    : never;
  error: A;
  errorMissingType: Error<"Missing type property in Exclusion source value">;
}[A extends { type: TypeId } ? A["type"] : "errorMissingType"];

export type IsExclusionRepresentable<E extends ExclusionType> =
  $IsRepresentable<_Exclude<ExclusionSource<E>, ExclusionExcluded<E>>>;
