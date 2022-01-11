import { Get, IsObject } from "../../../utils";

import { Resolve, TypeId, Never, Error } from "..";
import { Const, ConstType, ConstValue } from "../const";
import {
  ObjectType,
  ObjectValues,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";

import { IntersectUnion } from "./union";
import { IntersectExclusion } from "./exclusion";
import { Intersect } from "./index";

export type IntersectConst<A extends ConstType, B> = {
  any: A;
  never: Never;
  const: CheckExtendsResolved<A, B>;
  enum: CheckExtendsResolved<A, B>;
  primitive: CheckExtendsResolved<A, B>;
  array: CheckExtendsResolved<A, B>;
  tuple: CheckExtendsResolved<A, B>;
  object: B extends ObjectType ? ToObject<A, B> : never;
  union: B extends UnionType ? IntersectUnion<B, A> : never;
  exclusion: B extends ExclusionType ? IntersectExclusion<B, A> : never;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends TypeId ? Get<B, "type"> : "errorTypeProperty"];

type CheckExtendsResolved<
  A extends ConstType,
  B
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
  [key in keyof V | ObjectRequiredKeys<B>]: key extends keyof V
    ? key extends keyof ObjectValues<B>
      ? Intersect<Const<V[key]>, ObjectValues<B>[key]>
      : IsObjectOpen<B> extends true
      ? Intersect<Const<V[key]>, ObjectOpenProps<B>>
      : Never
    : Never;
};

type NeverKeys<O> = {
  [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];
