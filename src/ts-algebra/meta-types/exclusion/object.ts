import { A, B, U } from "ts-toolbelt";

import { Get, And, Or, Not, DoesExtend, IsObject } from "../../../utils";

import { TypeId, Never, Error } from "..";
import { Const, ConstValue } from "../const";
import {
  Object,
  ObjectValues,
  ObjectValue,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { IsRepresentable } from "../isRepresentable";

import { $Exclude } from ".";
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

export type ExcludeFromObject<S, E> = {
  any: Never;
  never: S;
  const: ExcludeConst<S, E>;
  enum: ExcludeEnum<S, E>;
  primitive: S;
  array: S;
  tuple: S;
  object: ExcludeObjects<S, E>;
  union: ExcludeUnion<S, E>;
  intersection: ExcludeIntersection<S, E>;
  exclusion: ExcludeExclusion<S, E>;
  error: E;
  errorTypeProperty: Error<"Missing type property">;
}[Get<E, "type"> extends TypeId ? Get<E, "type"> : "errorTypeProperty"];

type ExcludeObjects<
  S,
  E,
  C = CrossObjectValues<S, E>,
  R = RepresentableKeys<C>,
  P = $Exclude<ObjectOpenProps<S>, ObjectOpenProps<E>>
> = DoesObjectSizesMatch<S, E, C> extends true
  ? {
      moreThanTwo: S;
      onlyOne: PropagateExclusion<S, C>;
      none: OmitOmittableKeys<S, C>;
    }[And<IsObjectOpen<S>, IsRepresentable<P>> extends true
      ? "moreThanTwo"
      : GetUnionLength<R>]
  : S;

type CrossObjectValues<S, E> = {
  [key in
    | keyof ObjectValues<S>
    | keyof ObjectValues<E>
    | ObjectRequiredKeys<S>
    | ObjectRequiredKeys<E>]: CrossValue<
    ObjectValue<S, key>,
    IsPossibleIn<S, key>,
    IsRequiredIn<S, key>,
    ObjectValue<E, key>,
    IsPossibleIn<E, key>,
    IsRequiredIn<E, key>
  >;
};

// UTILS

type GetUnionLength<Union> = A.Equals<Union, never> extends B.True
  ? "none"
  : A.Equals<U.Pop<Union>, never> extends B.True
  ? "onlyOne"
  : "moreThanTwo";

type IsPossibleIn<O, K> = Or<
  DoesExtend<K, keyof ObjectValues<O>>,
  IsObjectOpen<O>
>;

type IsRequiredIn<O, K> = DoesExtend<K, ObjectRequiredKeys<O>>;

// SIZE CHECK

type DoesObjectSizesMatch<S, E, C> = And<
  IsObjectOpen<S>,
  Not<IsObjectOpen<E>>
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

type PropagateExclusion<S, C> = Object<
  {
    [key in keyof C]: Propagate<C[key]>;
  },
  ObjectRequiredKeys<S>,
  IsObjectOpen<S>,
  ObjectOpenProps<S>
>;

// OMITTABLE KEYS

type OmitOmittableKeys<S, C, K = OmittableKeys<C>> = {
  moreThanTwo: S;
  onlyOne: Object<
    {
      [key in keyof C]: key extends K ? Never : SourceValue<C[key]>;
    },
    ObjectRequiredKeys<S>,
    IsObjectOpen<S>,
    ObjectOpenProps<S>
  >;
  none: Never;
}[GetUnionLength<K>];

type OmittableKeys<C> = {
  [key in keyof C]: IsOmittable<C[key]> extends true ? key : never;
}[keyof C];

// CONST

type ExcludeConst<S, E, V = ConstValue<E>> = IsObject<V> extends true
  ? $Exclude<
      S,
      Object<{ [key in keyof V]: Const<V[key]> }, keyof V, false, Never>
    >
  : S;
