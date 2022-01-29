import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { Const, ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { _$Array, ArrayType, ArrayValues } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";
import { Error, ErrorType } from "../error";
import { Type } from "../type";
import { $IsRepresentable } from "../isRepresentable";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectTuple } from "./tuple";
import { IntersectUnion } from "./union";
import { IntersectExclusion } from "./exclusion";
import { $ClearIntersections, Intersect, IntersectionType } from "./index";

export type ClearArrayIntersections<A extends ArrayType> = _$Array<
  $ClearIntersections<ArrayValues<A>>
>;

export type IntersectArray<A extends ArrayType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? IntersectConst<B, A>
    : B extends ConstType
    ? IntersectConst<B, A>
    : B extends EnumType
    ? IntersectEnum<B, A>
    : B extends PrimitiveType
    ? Never
    : B extends ArrayType
    ? IntersectArrays<A, B>
    : B extends TupleType
    ? IntersectTuple<B, A>
    : B extends ObjectType
    ? Never
    : B extends UnionType
    ? IntersectUnion<B, A>
    : B extends ExclusionType
    ? IntersectExclusion<B, A>
    : B extends IntersectionType
    ? Error<"Cannot intersect intersection">
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;

type IntersectArrays<
  A extends ArrayType,
  B extends ArrayType,
  I = Intersect<ArrayValues<A>, ArrayValues<B>>
> = $IsRepresentable<I> extends true ? _$Array<I> : Const<[]>;
