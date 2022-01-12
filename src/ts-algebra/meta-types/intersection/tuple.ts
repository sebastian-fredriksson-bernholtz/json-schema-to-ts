import { L } from "ts-toolbelt";

import { And } from "../../../utils";

import { Type, TypeId, Never, $Tuple, Error } from "..";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { ArrayType, ArrayValues } from "../array";
import { TupleType, TupleValues, IsTupleOpen, TupleOpenProps } from "../tuple";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectExclusion } from "./exclusion";
import { $ClearIntersections, $Intersect } from ".";

export type ClearTupleIntersections<
  T extends TupleType,
  O = $ClearIntersections<TupleOpenProps<T>>
> = $Tuple<
  ClearTupleValuesIntersections<TupleValues<T>>,
  O extends Never ? false : IsTupleOpen<T>,
  O
>;

type ClearTupleValuesIntersections<V extends L.List, R extends L.List = []> = {
  stop: L.Reverse<R>;
  continue: ClearTupleValuesIntersections<
    L.Tail<V>,
    L.Prepend<R, $ClearIntersections<L.Head<V>>>
  >;
}[V extends [any, ...L.List] ? "continue" : "stop"];

export type IntersectTuple<A extends TupleType, B> = {
  any: A;
  never: Never;
  const: B extends ConstType ? IntersectConst<B, A> : never;
  enum: B extends EnumType ? IntersectEnum<B, A> : never;
  primitive: Never;
  array: B extends ArrayType ? IntersectTupleToArray<A, B> : never;
  tuple: B extends TupleType ? IntersectTuples<A, B> : never;
  object: Never;
  union: B extends UnionType ? DistributeIntersection<B, A> : never;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: B extends ExclusionType ? IntersectExclusion<B, A> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

type IntersectTupleToArray<
  T extends TupleType,
  A extends ArrayType,
  V extends L.List = IntersectTupleToArrValues<TupleValues<T>, ArrayValues<A>>,
  N = HasNeverValue<V>,
  O = $Intersect<TupleOpenProps<T>, ArrayValues<A>>
> = N extends true
  ? Never
  : $Tuple<
      V,
      IsTupleOpen<T> extends true ? (O extends Never ? false : true) : false,
      O
    >;

type IntersectTupleToArrValues<V extends L.List, T, R extends L.List = []> = {
  stop: L.Reverse<R>;
  continue: R extends L.List
    ? IntersectTupleToArrValues<
        L.Tail<V>,
        T,
        L.Prepend<R, $Intersect<L.Head<V>, T>>
      >
    : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];

type HasNeverValue<V extends L.List, R = false> = {
  stop: R;
  // TODO: Use IsRepresentable (or just leave "never" items be for more clarity ?)
  continue: L.Head<V> extends Never ? true : HasNeverValue<L.Tail<V>>;
}[V extends [any, ...L.List] ? "continue" : "stop"];

type IntersectTuples<
  A extends TupleType,
  B extends TupleType,
  // TODO: Type as CrossedValue
  V extends L.List = IntersectTupleValues<
    TupleValues<A>,
    TupleValues<B>,
    IsTupleOpen<A>,
    IsTupleOpen<B>,
    TupleOpenProps<A>,
    TupleOpenProps<B>
  >,
  N = HasNeverValue<V>,
  O = $Intersect<TupleOpenProps<A>, TupleOpenProps<B>>
> = N extends true
  ? Never
  : $Tuple<V, O extends Never ? false : And<IsTupleOpen<A>, IsTupleOpen<B>>, O>;

type IntersectTupleValues<
  V1 extends Type[],
  V2 extends Type[],
  O1 extends boolean,
  O2 extends boolean,
  P1 extends Type,
  P2 extends Type,
  // TODO: Type as CrossedValue
  R extends L.List = []
> = {
  stop: L.Reverse<R>;
  continue1: IntersectTupleValues<
    L.Tail<V1>,
    V2,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, O2 extends true ? $Intersect<L.Head<V1>, P2> : Never>
  >;
  continue2: IntersectTupleValues<
    V1,
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, O1 extends true ? $Intersect<L.Head<V2>, P1> : Never>
  >;
  continueBoth: IntersectTupleValues<
    L.Tail<V1>,
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, $Intersect<L.Head<V1>, L.Head<V2>>>
  >;
}[V1 extends [any, ...L.List]
  ? V2 extends [any, ...L.List]
    ? "continueBoth"
    : "continue1"
  : V2 extends [any, ...L.List]
  ? "continue2"
  : "stop"];
