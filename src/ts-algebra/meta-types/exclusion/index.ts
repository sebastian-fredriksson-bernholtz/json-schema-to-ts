import { TypeId } from "..";
import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { IntersectionType, $ClearIntersections } from "../intersection";
import { Error, ErrorType } from "../error";
import { Type } from "../type";
import { $Resolve } from "../resolve";

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
export type _Exclude<A extends Type, B extends Type> = A extends AnyType
  ? ExcludeFromAny<A, B>
  : A extends NeverType
  ? Never
  : A extends ConstType
  ? ExcludeFromConst<A, B>
  : A extends EnumType
  ? ExcludeFromEnum<A, B>
  : A extends PrimitiveType
  ? ExcludeFromPrimitive<A, B>
  : A extends ArrayType
  ? ExcludeFromArray<A, B>
  : A extends TupleType
  ? ExcludeFromTuple<A, B>
  : A extends ObjectType
  ? ExcludeFromObject<A, B>
  : A extends UnionType
  ? DistributeUnion<A, B>
  : A extends IntersectionType
  ? _$Exclude<$ClearIntersections<A>, B>
  : A extends ExclusionType
  ? _$Exclude<_Exclude<ExclusionSource<A>, ExclusionExcluded<A>>, B>
  : A extends ErrorType
  ? A
  : Error<"TODO">;

// TOIMPROVE: Don't know why by using a suite of ternaries make TS crash 🤷‍♂️
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

// export type _$Exclude<A, B> = A extends AnyType
//   ? ExcludeFromAny<A, B>
//   : A extends NeverType
//   ? Never
//   : A extends ConstType
//   ? ExcludeFromConst<A, B>
//   : A extends EnumType
//   ? ExcludeFromEnum<A, B>
//   : A extends PrimitiveType
//   ? ExcludeFromPrimitive<A, B>
//   : A extends ArrayType
//   ? ExcludeFromArray<A, B>
//   : A extends TupleType
//   ? ExcludeFromTuple<A, B>
//   : A extends ObjectType
//   ? ExcludeFromObject<A, B>
//   : A extends UnionType
//   ? DistributeUnion<A, B>
//   : A extends IntersectionType
//   ? _$Exclude<$ClearIntersections<A>, B>
//   : A extends ExclusionType
//   ? _$Exclude<_Exclude<ExclusionSource<A>, ExclusionExcluded<A>>, B>
//   : A extends ErrorType
//   ? A
//   : Error<"TODO">;

export type IsExclusionRepresentable<E extends ExclusionType> =
  $IsRepresentable<_Exclude<ExclusionSource<E>, ExclusionExcluded<E>>>;
