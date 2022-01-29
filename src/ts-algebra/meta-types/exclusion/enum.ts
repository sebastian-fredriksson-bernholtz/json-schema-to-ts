import { A, B, U } from "ts-toolbelt";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { Const, ConstType } from "../const";
import { Enum, EnumType, EnumValues } from "../enum";
import { PrimitiveType } from "../primitive";
import { _Array, ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { IntersectionType, $Intersect } from "../intersection";
import { Error, ErrorType } from "../error";
import { Type } from "../type";
import { $IsRepresentable } from "../isRepresentable";

import { _Exclude, ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromEnum<A extends EnumType, B> = B extends Type
  ? B extends AnyType
    ? Never
    : B extends NeverType
    ? A
    : B extends ConstType
    ? FilterExcluded<A, B>
    : B extends EnumType
    ? FilterExcluded<A, B>
    : B extends PrimitiveType
    ? FilterExcluded<A, B>
    : B extends ArrayType
    ? FilterExcluded<A, B>
    : B extends TupleType
    ? FilterExcluded<A, B>
    : B extends ObjectType
    ? FilterExcluded<A, B>
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : B extends IntersectionType
    ? ExcludeIntersection<A, B>
    : B extends ExclusionType
    ? ExcludeExclusion<A, B>
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;

type FilterExcluded<A extends EnumType, B extends Type> = Enum<
  RecurseOnEnumValues<EnumValues<A>, B>
>;

type RecurseOnEnumValues<
  V extends any,
  B extends Type
> = V extends infer EnumValue
  ? $IsRepresentable<_Exclude<Const<EnumValue>, B>> extends false
    ? never
    : EnumValue
  : never;

export type ExcludeEnum<
  A extends Type,
  B extends EnumType,
  V extends any = EnumValues<B>
> = A.Equals<V, never> extends B.True ? A : ExcludeEnumValue<A, U.Last<V>, V>;

type ExcludeEnumValue<
  A extends Type,
  L extends any,
  V extends any
> = $Intersect<_Exclude<A, Const<L>>, _Exclude<A, Enum<U.Exclude<V, L>>>>;
