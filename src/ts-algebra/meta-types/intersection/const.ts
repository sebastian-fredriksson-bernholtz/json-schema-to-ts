import { IsObject } from "../../../utils";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { Const, ConstType, ConstValue } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import { ObjectType, ObjectRequiredKeys, ObjectValue } from "../object";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";
import { Error, ErrorType } from "../error";
import { Type } from "../type";
import { Resolve } from "../resolve";

import { IntersectUnion } from "./union";
import { IntersectExclusion } from "./exclusion";
import { IntersectionType, Intersect } from "./index";

export type IntersectConst<A extends ConstType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? CheckExtendsResolved<A, B>
    : B extends EnumType
    ? CheckExtendsResolved<A, B>
    : B extends PrimitiveType
    ? CheckExtendsResolved<A, B>
    : B extends ArrayType
    ? CheckExtendsResolved<A, B>
    : B extends TupleType
    ? CheckExtendsResolved<A, B>
    : B extends ObjectType
    ? ToObject<A, B>
    : B extends UnionType
    ? IntersectUnion<B, A>
    : B extends IntersectionType
    ? Error<"Cannot intersect intersection">
    : B extends ExclusionType
    ? IntersectExclusion<B, A>
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;

type CheckExtendsResolved<
  A extends ConstType,
  B extends Type
> = ConstValue<A> extends Resolve<B> ? A : Never;

type ToObject<A extends ConstType, B extends ObjectType> = IsObject<
  ConstValue<A>
> extends true
  ? IntersectConstToObject<A, B>
  : Never;

type IntersectConstToObject<
  A extends ConstType,
  B extends ObjectType,
  V = IntersectConstValues<ConstValue<A>, B>
> = NeverKeys<V> extends never ? A : Never;

type IntersectConstValues<V, B extends ObjectType> = {
  [key in Extract<keyof V | ObjectRequiredKeys<B>, string>]: key extends keyof V
    ? Intersect<Const<V[key]>, ObjectValue<B, key>>
    : Never;
};

type NeverKeys<O> = {
  [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];
