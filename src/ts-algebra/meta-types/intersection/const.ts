import { Get, IsObject } from "../../../utils";

import { Resolve, Type, Never, Error } from "..";
import { Const, ConstValue } from "../const";
import { ObjectValues, Required, IsOpen, OpenProps } from "../object";

import { IntersectUnion } from "./union";
import { IntersectExclusion } from "./exclusion";
import { Intersect } from "./index";

export type IntersectConst<A, B> = {
  any: A;
  never: Never;
  const: CheckExtendsResolved<A, B>;
  enum: CheckExtendsResolved<A, B>;
  primitive: CheckExtendsResolved<A, B>;
  array: CheckExtendsResolved<A, B>;
  tuple: CheckExtendsResolved<A, B>;
  object: ToObject<A, B>;
  union: IntersectUnion<B, A>;
  exclusion: IntersectExclusion<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends Type ? Get<B, "type"> : "errorTypeProperty"];

type CheckExtendsResolved<A, B> = ConstValue<A> extends Resolve<B> ? A : Never;

type ToObject<A, B> = IsObject<ConstValue<A>> extends true
  ? IntersectConstToObject<A, B>
  : Never;

type IntersectConstToObject<
  A,
  B,
  V = IntersectConstValues<ConstValue<A>, B>
> = NeverKeys<V> extends never ? A : Never;

type IntersectConstValues<V, B> = {
  [key in keyof V | Required<B>]: key extends keyof V
    ? key extends keyof ObjectValues<B>
      ? Intersect<Const<V[key]>, ObjectValues<B>[key]>
      : IsOpen<B> extends true
      ? Intersect<Const<V[key]>, OpenProps<B>>
      : Never
    : Never;
};

type NeverKeys<O> = {
  [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];
