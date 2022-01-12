import { A } from "ts-toolbelt";

import { And } from "../../../utils";

import { Type, TypeId, Never, Error } from "..";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import {
  $Object,
  ObjectType,
  ObjectValues,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectExclusion } from "./exclusion";
import { $ClearIntersections, $Intersect } from "./index";

export type ClearObjectIntersections<
  A extends ObjectType,
  V = ClearObjectValuesIntersections<ObjectValues<A>>,
  N = NeverKeys<V>,
  O = $ClearIntersections<ObjectOpenProps<A>>
> = ObjectRequiredKeys<A> extends Exclude<ObjectRequiredKeys<A>, N>
  ? $Object<
      {
        [key in Exclude<keyof V, N>]: V[key];
      },
      ObjectRequiredKeys<A>,
      O extends Never ? false : IsObjectOpen<A>,
      O
    >
  : Never;

type ClearObjectValuesIntersections<V extends Record<A.Key, Type>> = {
  [key in keyof V]: $ClearIntersections<V[key]>;
};

export type IntersectObject<A extends ObjectType, B> = {
  any: A;
  never: Never;
  const: B extends ConstType ? IntersectConst<B, A> : never;
  enum: B extends EnumType ? IntersectEnum<B, A> : never;
  primitive: Never;
  array: Never;
  tuple: Never;
  object: B extends ObjectType ? IntersectObjects<A, B> : never;
  union: B extends UnionType ? DistributeIntersection<B, A> : never;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: B extends ExclusionType ? IntersectExclusion<B, A> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

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
  ? $Object<
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

type IntersectOpenProps<
  A extends ObjectType,
  B extends ObjectType
> = $Intersect<ObjectOpenProps<A>, ObjectOpenProps<B>>;
