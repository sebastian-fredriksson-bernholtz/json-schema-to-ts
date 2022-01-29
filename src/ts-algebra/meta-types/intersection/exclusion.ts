import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { Union, UnionType } from "../union";
import {
  $Exclusion,
  ExclusionType,
  ExclusionSource,
  ExclusionExcluded,
} from "../exclusion";
import { Error, ErrorType } from "../error";
import { Type } from "../type";

import { IntersectUnion } from "./union";
import {
  IntersectionType,
  $ClearIntersections,
  Intersect,
  $Intersect,
} from "./index";

export type ClearExclusionIntersections<A extends ExclusionType> = $Exclusion<
  $ClearIntersections<ExclusionSource<A>>,
  $ClearIntersections<ExclusionExcluded<A>>
>;

export type IntersectExclusion<A extends ExclusionType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? $Exclusion<$Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>
    : B extends EnumType
    ? $Exclusion<$Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>
    : B extends PrimitiveType
    ? $Exclusion<$Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>
    : B extends ArrayType
    ? $Exclusion<$Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>
    : B extends TupleType
    ? $Exclusion<$Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>
    : B extends ObjectType
    ? $Exclusion<$Intersect<ExclusionSource<A>, B>, ExclusionExcluded<A>>
    : B extends UnionType
    ? IntersectUnion<B, A>
    : B extends IntersectionType
    ? Error<"Cannot intersect intersection">
    : B extends ExclusionType
    ? $Exclusion<
        Intersect<ExclusionSource<A>, ExclusionSource<B>>,
        Union<ExclusionExcluded<A> | ExclusionExcluded<B>>
      >
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;
