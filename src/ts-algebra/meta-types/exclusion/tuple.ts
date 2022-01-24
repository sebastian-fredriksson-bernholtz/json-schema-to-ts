import { A, B, L } from "ts-toolbelt";

import { And, Not } from "../../../utils";

import { Type, TypeId, Never, Error } from "..";
import { Const, ConstType, ConstValue } from "../const";
import { EnumType } from "../enum";
import { ArrayValues, ArrayType } from "../array";
import {
  Tuple,
  $Tuple,
  TupleType,
  TupleValues,
  IsTupleOpen,
  TupleOpenProps,
} from "../tuple";
import { UnionType } from "../union";
import { $IsRepresentable } from "../isRepresentable";

import { _Exclude, ExclusionType } from ".";
import { ExcludeEnum } from "./enum";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";
import {
  CrossValue,
  CrossValueType,
  SourceValue,
  IsExclusionValueRepresentable,
  IsOutsideOfSourceScope,
  IsOutsideOfExcludedScope,
  Propagate,
  IsOmittable,
} from "./utils";

export type ExcludeFromTuple<A extends TupleType, B> = {
  any: Never;
  never: A;
  const: B extends ConstType ? ExcludeConst<A, B> : never;
  enum: B extends EnumType ? ExcludeEnum<A, B> : never;
  primitive: A;
  array: B extends ArrayType ? ExcludeArray<A, B> : never;
  tuple: B extends TupleType ? ExcludeTuples<A, B> : never;
  object: A;
  union: B extends UnionType ? ExcludeUnion<A, B> : never;
  intersection: ExcludeIntersection<A, B>;
  exclusion: B extends ExclusionType ? ExcludeExclusion<A, B> : never;
  error: B;
  errorMissingType: Error<"Missing type property in Exclusion excluded value">;
}[B extends { type: TypeId } ? B["type"] : "errorMissingType"];

type ExcludeArray<A extends TupleType, B extends ArrayType> = ExcludeTuples<
  A,
  Tuple<[], true, ArrayValues<B>>
>;

type ExcludeTuples<
  A extends TupleType,
  B extends TupleType,
  C extends CrossValueType[] = CrossTupleValues<
    TupleValues<A>,
    TupleValues<B>,
    IsTupleOpen<A>,
    IsTupleOpen<B>,
    TupleOpenProps<A>,
    TupleOpenProps<B>
  >,
  R extends CrossValueType[] = RepresentableItems<C>,
  P = _Exclude<TupleOpenProps<A>, TupleOpenProps<B>>,
  I = $IsRepresentable<P>
> = DoesTupleSizesMatch<A, B, C> extends true
  ? {
      moreThanTwo: A;
      onlyOne: $Tuple<PropagateExclusion<C>, IsTupleOpen<A>, TupleOpenProps<A>>;
      none: OmitOmittableItems<A, C>;
    }[And<IsTupleOpen<A>, I> extends true ? "moreThanTwo" : GetTupleLength<R>]
  : A;

type CrossTupleValues<
  V1 extends Type[],
  V2 extends Type[],
  O1 extends boolean,
  O2 extends boolean,
  P1 extends Type,
  P2 extends Type,
  C extends CrossValueType[] = []
> = {
  stop: L.Reverse<C>;
  continue1: CrossTupleValues<
    L.Tail<V1>,
    [],
    O1,
    O2,
    P1,
    P2,
    L.Prepend<C, CrossValue<L.Head<V1>, true, true, P2, O2, false>>
  >;
  continue2: CrossTupleValues<
    [],
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<C, CrossValue<P1, O1, false, L.Head<V2>, true, true>>
  >;
  continueBoth: CrossTupleValues<
    L.Tail<V1>,
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<C, CrossValue<L.Head<V1>, true, true, L.Head<V2>, true, true>>
  >;
}[V1 extends [any, ...any[]]
  ? V2 extends [any, ...any[]]
    ? "continueBoth"
    : "continue1"
  : V2 extends [any, ...any[]]
  ? "continue2"
  : "stop"];

// UTILS

type GetTupleLength<T extends any[], R extends any[] = L.Tail<T>> = A.Equals<
  T,
  []
> extends B.True
  ? "none"
  : A.Equals<R, []> extends B.True
  ? "onlyOne"
  : "moreThanTwo";

// SIZE CHECK

type DoesTupleSizesMatch<
  S extends TupleType,
  E extends TupleType,
  C extends CrossValueType[]
> = And<IsTupleOpen<S>, Not<IsTupleOpen<E>>> extends true
  ? false
  : And<IsExcludedSmallEnough<C>, IsExcludedBigEnough<C>>;

type IsExcludedSmallEnough<C extends CrossValueType[]> = {
  stop: true;
  continue: IsOutsideOfSourceScope<L.Head<C>> extends true
    ? false
    : IsExcludedSmallEnough<L.Tail<C>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

type IsExcludedBigEnough<C extends CrossValueType[]> = {
  stop: true;
  continue: IsOutsideOfExcludedScope<L.Head<C>> extends true
    ? false
    : IsExcludedBigEnough<L.Tail<C>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

// PROPAGATION

type RepresentableItems<
  C extends CrossValueType[],
  R extends CrossValueType[] = []
> = {
  stop: R;
  continue: IsExclusionValueRepresentable<L.Head<C>> extends true
    ? RepresentableItems<L.Tail<C>, L.Prepend<R, L.Head<C>>>
    : RepresentableItems<L.Tail<C>, R>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

type PropagateExclusion<C extends CrossValueType[], R extends any[] = []> = {
  stop: L.Reverse<R>;
  continue: PropagateExclusion<L.Tail<C>, L.Prepend<R, Propagate<L.Head<C>>>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

// OMITTABLE ITEMS

type OmitOmittableItems<
  S extends TupleType,
  C extends CrossValueType[],
  I extends CrossValueType[] = OmittableItems<C>
> = {
  moreThanTwo: S;
  onlyOne: $Tuple<RequiredTupleValues<C>>;
  none: Never;
}[GetTupleLength<I>];

type OmittableItems<
  C extends CrossValueType[],
  R extends CrossValueType[] = []
> = {
  stop: R;
  continue: IsOmittable<L.Head<C>> extends true
    ? OmittableItems<L.Tail<C>, L.Prepend<R, L.Head<C>>>
    : OmittableItems<L.Tail<C>, R>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

type RequiredTupleValues<C extends CrossValueType[], R extends Type[] = []> = {
  stop: L.Reverse<R>;
  continue: IsOmittable<L.Head<C>> extends true
    ? L.Reverse<R>
    : RequiredTupleValues<L.Tail<C>, L.Prepend<R, SourceValue<L.Head<C>>>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];

// CONST

type ExcludeConst<
  A extends TupleType,
  B extends ConstType,
  V = ConstValue<B>
> = V extends any[] ? _Exclude<A, $Tuple<ExtractConstValues<V>>> : A;

type ExtractConstValues<V extends any[], R extends any[] = []> = {
  stop: L.Reverse<R>;
  continue: ExtractConstValues<L.Tail<V>, L.Prepend<R, Const<L.Head<V>>>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
