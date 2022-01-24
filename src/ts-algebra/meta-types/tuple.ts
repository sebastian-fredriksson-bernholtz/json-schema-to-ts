import { L } from "ts-toolbelt";

import { Resolve, Any } from ".";
import { Type } from "./type";
import { IsRepresentable } from "./isRepresentable";

export type TupleTypeId = "tuple";

export type Tuple<
  V extends Type[],
  O extends boolean = false,
  P extends Type = Any
> = {
  type: TupleTypeId;
  values: V;
  isOpen: O;
  openProps: P;
};

export type $Tuple<V, O = false, P = Any> = {
  type: TupleTypeId;
  values: V;
  isOpen: O;
  openProps: P;
};

export type TupleType = {
  type: TupleTypeId;
  values: Type[];
  isOpen: boolean;
  openProps: Type;
};

export type TupleValues<T extends TupleType> = T["values"];

export type IsTupleOpen<T extends TupleType> = T["isOpen"];

export type TupleOpenProps<T extends TupleType> = T["openProps"];

export type ResolveTuple<T extends TupleType> = IsTupleOpen<T> extends true
  ? L.Concat<RecurseOnTuple<TupleValues<T>>, [...Resolve<TupleOpenProps<T>>[]]>
  : RecurseOnTuple<TupleValues<T>>;

type RecurseOnTuple<V extends Type[], R extends any[] = []> = {
  stop: L.Reverse<R>;
  continue: RecurseOnTuple<L.Tail<V>, L.Prepend<R, Resolve<L.Head<V>>>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];

export type IsTupleRepresentable<T extends TupleType> =
  AreAllTupleValuesRepresentable<TupleValues<T>>;

type AreAllTupleValuesRepresentable<V extends Type[]> = {
  stop: true;
  continue: IsRepresentable<L.Head<V>> extends false
    ? false
    : AreAllTupleValuesRepresentable<L.Tail<V>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
