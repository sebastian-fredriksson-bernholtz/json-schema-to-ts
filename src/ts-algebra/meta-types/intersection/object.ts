import { And } from "../../../utils";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ArrayType } from "../array";
import { TupleType } from "../tuple";
import {
  _$Object,
  ObjectType,
  ObjectValues,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";
import { Error, ErrorType } from "../error";
import { Type } from "../type";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectExclusion } from "./exclusion";
import {
  IntersectionType,
  $ClearIntersections,
  Intersect,
  $Intersect,
} from "./index";

export type ClearObjectIntersections<
  A extends ObjectType,
  V = ClearObjectValuesIntersections<ObjectValues<A>>,
  N = NeverKeys<V>,
  O = $ClearIntersections<ObjectOpenProps<A>>
> = ObjectRequiredKeys<A> extends Exclude<ObjectRequiredKeys<A>, N>
  ? _$Object<
      {
        [key in Exclude<keyof V, N>]: V[key];
      },
      ObjectRequiredKeys<A>,
      O extends Never ? false : IsObjectOpen<A>,
      O
    >
  : Never;

type ClearObjectValuesIntersections<V extends Record<string, Type>> = {
  [key in keyof V]: $ClearIntersections<V[key]>;
};

export type IntersectObject<A extends ObjectType, B> = B extends Type
  ? B extends AnyType
    ? A
    : B extends NeverType
    ? Never
    : B extends ConstType
    ? IntersectConst<B, A>
    : B extends EnumType
    ? IntersectEnum<B, A>
    : B extends PrimitiveType
    ? Never
    : B extends ArrayType
    ? Never
    : B extends TupleType
    ? Never
    : B extends ObjectType
    ? IntersectObjects<A, B>
    : B extends UnionType
    ? DistributeIntersection<B, A>
    : B extends IntersectionType
    ? Error<"Cannot intersect intersection">
    : B extends ExclusionType
    ? IntersectExclusion<B, A>
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;

type IntersectObjects<
  A extends ObjectType,
  B extends ObjectType,
  V = IntersectValues<A, B>,
  N = NeverKeys<V>,
  O = IntersectOpenProps<A, B>
> = ObjectRequiredKeys<A> | ObjectRequiredKeys<B> extends Exclude<
  ObjectRequiredKeys<A> | ObjectRequiredKeys<B>,
  N
>
  ? _$Object<
      {
        [key in Exclude<keyof V, N>]: V[key];
      },
      ObjectRequiredKeys<A> | ObjectRequiredKeys<B>,
      O extends Never ? false : And<IsObjectOpen<A>, IsObjectOpen<B>>,
      O
    >
  : Never;

type IntersectValues<A extends ObjectType, B extends ObjectType> = {
  [key in
    | keyof ObjectValues<A>
    | keyof ObjectValues<B>]: key extends keyof ObjectValues<A>
    ? key extends keyof ObjectValues<B>
      ? $Intersect<ObjectValues<A>[key], ObjectValues<B>[key]>
      : IsObjectOpen<B> extends true
      ? $Intersect<ObjectValues<A>[key], ObjectOpenProps<B>>
      : Never
    : key extends keyof ObjectValues<B>
    ? IsObjectOpen<A> extends true
      ? $Intersect<ObjectOpenProps<A>, ObjectValues<B>[key]>
      : Never
    : Never;
};

type NeverKeys<O> = {
  [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];

type IntersectOpenProps<A extends ObjectType, B extends ObjectType> = Intersect<
  ObjectOpenProps<A>,
  ObjectOpenProps<B>
>;
