import { A, B, U } from "ts-toolbelt";

import { And, Or, Not, DoesExtend, IsObject } from "../../../utils";

import { TypeId, Never, Error } from "..";
import { Const, ConstType, ConstValue } from "../const";
import { EnumType } from "../enum";
import {
  $Object,
  ObjectType,
  ObjectValues,
  ObjectValue,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { $IsRepresentable } from "../isRepresentable";

import { _Exclude, _$Exclude, ExclusionType } from ".";
import { ExcludeEnum } from "./enum";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";
import {
  CrossValue,
  SourceValue,
  IsExclusionValueRepresentable,
  IsOutsideOfSourceScope,
  IsOutsideOfExcludedScope,
  Propagate,
  IsOmittable,
} from "./utils";

export type ExcludeFromObject<A extends ObjectType, B> = {
  any: Never;
  never: A;
  const: B extends ConstType ? ExcludeConst<A, B> : never;
  enum: B extends EnumType ? ExcludeEnum<A, B> : never;
  primitive: A;
  array: A;
  tuple: A;
  object: B extends ObjectType ? ExcludeObjects<A, B> : never;
  union: B extends UnionType ? ExcludeUnion<A, B> : never;
  intersection: ExcludeIntersection<A, B>;
  exclusion: B extends ExclusionType ? ExcludeExclusion<A, B> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

type ExcludeObjects<
  A extends ObjectType,
  B extends ObjectType,
  C = CrossObjectValues<A, B>,
  R = RepresentableKeys<C>,
  P = _Exclude<ObjectOpenProps<A>, ObjectOpenProps<B>>
> = DoesObjectSizesMatch<A, B, C> extends true
  ? {
      moreThanTwo: A;
      onlyOne: PropagateExclusion<A, C>;
      none: OmitOmittableKeys<A, C>;
    }[And<IsObjectOpen<A>, $IsRepresentable<P>> extends true
      ? "moreThanTwo"
      : GetUnionLength<R>]
  : A;

type CrossObjectValues<A extends ObjectType, B extends ObjectType> = {
  [key in
    | keyof ObjectValues<A>
    | keyof ObjectValues<B>
    | ObjectRequiredKeys<A>
    | ObjectRequiredKeys<B>]: CrossValue<
    ObjectValue<A, key>,
    IsPossibleIn<A, key>,
    IsRequiredIn<A, key>,
    ObjectValue<B, key>,
    IsPossibleIn<B, key>,
    IsRequiredIn<B, key>
  >;
};

// UTILS

type GetUnionLength<U> = A.Equals<U, never> extends B.True
  ? "none"
  : A.Equals<U.Pop<U>, never> extends B.True
  ? "onlyOne"
  : "moreThanTwo";

type IsPossibleIn<O extends ObjectType, K extends A.Key> = Or<
  DoesExtend<K, keyof ObjectValues<O>>,
  IsObjectOpen<O>
>;

type IsRequiredIn<O extends ObjectType, K extends A.Key> = DoesExtend<
  K,
  ObjectRequiredKeys<O>
>;

// SIZE CHECK

type DoesObjectSizesMatch<A extends ObjectType, B extends ObjectType, C> = And<
  IsObjectOpen<A>,
  Not<IsObjectOpen<B>>
> extends true
  ? false
  : And<IsExcludedSmallEnough<C>, IsExcludedBigEnough<C>>;

type IsExcludedSmallEnough<C> = Not<
  DoesExtend<
    true,
    {
      [key in keyof C]: IsOutsideOfSourceScope<C[key]>;
    }[keyof C]
  >
>;

type IsExcludedBigEnough<C> = Not<
  DoesExtend<
    true,
    {
      [key in keyof C]: IsOutsideOfExcludedScope<C[key]>;
    }[keyof C]
  >
>;

// PROPAGATION

type RepresentableKeys<C> = {
  [key in keyof C]: IsExclusionValueRepresentable<C[key]> extends true
    ? key
    : never;
}[keyof C];

type PropagateExclusion<A extends ObjectType, C> = $Object<
  {
    [key in keyof C]: Propagate<C[key]>;
  },
  ObjectRequiredKeys<A>,
  IsObjectOpen<A>,
  ObjectOpenProps<A>
>;

// OMITTABLE KEYS

type OmitOmittableKeys<A extends ObjectType, C, K = OmittableKeys<C>> = {
  moreThanTwo: A;
  onlyOne: $Object<
    {
      [key in keyof C]: key extends K ? Never : SourceValue<C[key]>;
    },
    ObjectRequiredKeys<A>,
    IsObjectOpen<A>,
    ObjectOpenProps<A>
  >;
  none: Never;
}[GetUnionLength<K>];

type OmittableKeys<C> = {
  [key in keyof C]: IsOmittable<C[key]> extends true ? key : never;
}[keyof C];

// CONST

type ExcludeConst<
  A extends ObjectType,
  B extends ConstType,
  V = ConstValue<B>
> = IsObject<V> extends true
  ? _$Exclude<
      A,
      $Object<{ [key in keyof V]: Const<V[key]> }, keyof V, false, Never>
    >
  : A;
