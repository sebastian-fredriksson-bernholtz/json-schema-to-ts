import { AnyType } from "../any";
import { NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";
import { Error, ErrorType } from "../error";
import { Type } from "../type";
import { $Resolve } from "../resolve";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectPrimitive } from "./primitive";
import { ClearArrayIntersections, IntersectArray } from "./array";
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
  ClearIntersections<T>
>;

export type ClearIntersections<T extends Type> = T extends AnyType
  ? T
  : T extends NeverType
  ? T
  : T extends ConstType
  ? T
  : T extends EnumType
  ? T
  : T extends PrimitiveType
  ? T
  : T extends ArrayType
  ? ClearArrayIntersections<T>
  : T extends TupleType
  ? ClearTupleIntersections<T>
  : T extends ObjectType
  ? ClearObjectIntersections<T>
  : T extends UnionType
  ? ClearUnionIntersections<T>
  : T extends IntersectionType
  ? $Intersect<
      ClearIntersections<IntersectionLeft<T>>,
      ClearIntersections<IntersectionRight<T>>
    >
  : T extends ExclusionType
  ? ClearExclusionIntersections<T>
  : T extends ErrorType
  ? T
  : Error<"TODO">;

export type $ClearIntersections<T> = T extends AnyType
  ? T
  : T extends NeverType
  ? T
  : T extends ConstType
  ? T
  : T extends EnumType
  ? T
  : T extends PrimitiveType
  ? T
  : T extends ArrayType
  ? ClearArrayIntersections<T>
  : T extends TupleType
  ? ClearTupleIntersections<T>
  : T extends ObjectType
  ? ClearObjectIntersections<T>
  : T extends ObjectType
  ? ClearObjectIntersections<T>
  : T extends UnionType
  ? ClearUnionIntersections<T>
  : T extends IntersectionType
  ? $Intersect<
      $ClearIntersections<IntersectionLeft<T>>,
      $ClearIntersections<IntersectionRight<T>>
    >
  : T extends ExclusionType
  ? ClearExclusionIntersections<T>
  : T extends ErrorType
  ? T
  : Error<"TODO">;

export type Intersect<A extends Type, B extends Type> = A extends AnyType
  ? B
  : A extends NeverType
  ? B extends ErrorType
    ? B
    : A
  : A extends ConstType
  ? IntersectConst<A, B>
  : A extends EnumType
  ? IntersectEnum<A, B>
  : A extends PrimitiveType
  ? IntersectPrimitive<A, B>
  : A extends ArrayType
  ? IntersectArray<A, B>
  : A extends TupleType
  ? IntersectTuple<A, B>
  : A extends ObjectType
  ? IntersectObject<A, B>
  : A extends UnionType
  ? IntersectUnion<A, B>
  : A extends IntersectionType
  ? Error<"Cannot intersect intersection">
  : A extends ExclusionType
  ? IntersectExclusion<A, B>
  : A extends ErrorType
  ? A
  : Error<"TODO">;

export type $Intersect<A, B> = A extends AnyType
  ? B
  : A extends NeverType
  ? B extends ErrorType
    ? B
    : A
  : A extends ConstType
  ? IntersectConst<A, B>
  : A extends EnumType
  ? IntersectEnum<A, B>
  : A extends PrimitiveType
  ? IntersectPrimitive<A, B>
  : A extends ArrayType
  ? IntersectArray<A, B>
  : A extends TupleType
  ? IntersectTuple<A, B>
  : A extends ObjectType
  ? IntersectObject<A, B>
  : A extends UnionType
  ? IntersectUnion<A, B>
  : A extends IntersectionType
  ? Error<"Cannot intersect intersection">
  : A extends ExclusionType
  ? IntersectExclusion<A, B>
  : A extends ErrorType
  ? A
  : Error<"TODO">;

export type IsIntersectionRepresentable<A extends IntersectionType> =
  $IsRepresentable<$ClearIntersections<A>>;
