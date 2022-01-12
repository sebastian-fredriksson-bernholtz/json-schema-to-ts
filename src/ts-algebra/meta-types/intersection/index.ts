import { $Resolve, Type, TypeId, Never, Error } from "..";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";
import { ErrorTypeId } from "../error";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectPrimitive } from "./primitive";
import { ClearArrIntersections, IntersectArray } from "./array";
import { ClearTupleIntersections, IntersectTuple } from "./tuple";
import { ClearObjectIntersections, IntersectObject } from "./object";
import { ClearUnionIntersections, IntersectUnion } from "./union";
import { ClearExclusionIntersections, IntersectExclusion } from "./exclusion";
import { $IsRepresentable } from "../isRepresentable";

export type IntersectionTypeId = "intersection";

export type Intersection<L extends Type, R extends Type> = {
  type: IntersectionTypeId;
  left: L;
  right: R;
};

export type $Intersection<L, R> = {
  type: IntersectionTypeId;
  left: L;
  right: R;
};

export type IntersectionType = {
  type: IntersectionTypeId;
  left: Type;
  right: Type;
};

export type IntersectionLeft<I extends IntersectionType> = I["left"];

export type IntersectionRight<I extends IntersectionType> = I["right"];

export type ResolveIntersection<T extends IntersectionType> = $Resolve<
  $ClearIntersections<T>
>;

export type $ClearIntersections<T> = {
  any: T;
  never: T;
  const: T;
  enum: T;
  primitive: T;
  array: T extends ArrayType ? ClearArrIntersections<T> : never;
  tuple: T extends TupleType ? ClearTupleIntersections<T> : never;
  object: T extends ObjectType ? ClearObjectIntersections<T> : never;
  union: T extends UnionType ? ClearUnionIntersections<T> : never;
  intersection: T extends IntersectionType
    ? $Intersect<
        $ClearIntersections<IntersectionLeft<T>>,
        $ClearIntersections<IntersectionRight<T>>
      >
    : never;
  exclusion: T extends ExclusionType ? ClearExclusionIntersections<T> : never;
  error: T;
  errorMissingType: Error<"Missing type property">;
}[T extends { type: TypeId } ? T["type"] : "errorMissingType"];

export type Intersect<A extends Type, B extends Type> = {
  any: B;
  never: B extends { type: ErrorTypeId } ? B : Never;
  const: A extends ConstType ? IntersectConst<A, B> : never;
  enum: A extends EnumType ? IntersectEnum<A, B> : never;
  primitive: A extends PrimitiveType ? IntersectPrimitive<A, B> : never;
  array: A extends ArrayType ? IntersectArray<A, B> : never;
  tuple: A extends TupleType ? IntersectTuple<A, B> : never;
  object: A extends ObjectType ? IntersectObject<A, B> : never;
  union: A extends UnionType ? IntersectUnion<A, B> : never;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: A extends ExclusionType ? IntersectExclusion<A, B> : never;
  error: A;
}[A["type"]];

export type $Intersect<A, B> = {
  any: B;
  never: B extends { type: ErrorTypeId } ? B : Never;
  const: A extends ConstType ? IntersectConst<A, B> : never;
  enum: A extends EnumType ? IntersectEnum<A, B> : never;
  primitive: A extends PrimitiveType ? IntersectPrimitive<A, B> : never;
  array: A extends ArrayType ? IntersectArray<A, B> : never;
  tuple: A extends TupleType ? IntersectTuple<A, B> : never;
  object: A extends ObjectType ? IntersectObject<A, B> : never;
  union: A extends UnionType ? IntersectUnion<A, B> : never;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: A extends ExclusionType ? IntersectExclusion<A, B> : never;
  error: A;
  errorMissingType: Error<"Missing type property">;
}[A extends { type: TypeId } ? A["type"] : "errorMissingType"];

export type IsIntersectionRepresentable<A extends IntersectionType> =
  $IsRepresentable<$ClearIntersections<A>>;
