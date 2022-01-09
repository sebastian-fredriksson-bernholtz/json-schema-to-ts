import { L } from "ts-toolbelt";

import { Get } from "../../utils";

import { Resolve, Any } from ".";
import { IsRepresentable } from "./isRepresentable";

export type TupleTypeId = "tuple";

// 🔧 TOIMPROVE: Type inputs and preserve types by not using Get
export type Tuple<V, O = true, P = Any> = {
  type: TupleTypeId;
  values: V;
  isOpen: O;
  openProps: P;
};

export type TupleValues<T> = Get<T, "values">;

export type IsTupleOpen<T> = Get<T, "isOpen">;

export type TupleOpenProps<T> = Get<T, "openProps">;

export type ResolveTuple<T> = IsTupleOpen<T> extends true
  ? L.Concat<RecurseOnTuple<TupleValues<T>>, [...Resolve<TupleOpenProps<T>>[]]>
  : RecurseOnTuple<TupleValues<T>>;

type RecurseOnTuple<V, R extends L.List = []> = {
  stop: L.Reverse<R>;
  // 🔧 TOIMPROVE: Not cast here
  continue: V extends L.List
    ? RecurseOnTuple<L.Tail<V>, L.Prepend<R, Resolve<L.Head<V>>>>
    : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];

export type IsTupleRepresentable<T> = AreAllTupleValuesRepresentable<
  TupleValues<T>
>;

type AreAllTupleValuesRepresentable<V> = {
  stop: true;
  // 🔧 TOIMPROVE: Not cast here
  continue: V extends L.List
    ? IsRepresentable<L.Head<V>> extends false
      ? false
      : AreAllTupleValuesRepresentable<L.Tail<V>>
    : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];
