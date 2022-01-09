import { Get, And } from "../../../utils";

import { Type, Never, Error } from "..";
import { Object, ObjectValues, Required, IsOpen, OpenProps } from "../object";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectExclusion } from "./exclusion";
import { ClearIntersections, Intersect } from "./index";

export type ClearObjectIntersections<
  A,
  V = ClearObjectValuesIntersections<ObjectValues<A>>,
  N = NeverKeys<V>,
  O = ClearIntersections<OpenProps<A>>
> = Required<A> extends Exclude<Required<A>, N>
  ? Object<
      {
        [key in Exclude<keyof V, N>]: V[key];
      },
      Required<A>,
      O extends Never ? false : IsOpen<A>,
      O
    >
  : Never;

type ClearObjectValuesIntersections<V> = {
  [key in keyof V]: ClearIntersections<V[key]>;
};

export type IntersectObject<A, B> = {
  any: A;
  never: Never;
  const: IntersectConst<B, A>;
  enum: IntersectEnum<B, A>;
  primitive: Never;
  array: Never;
  tuple: Never;
  object: IntersectObjects<A, B>;
  union: DistributeIntersection<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: IntersectExclusion<B, A>;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends Type ? Get<B, "type"> : "errorTypeProperty"];

type IntersectObjects<
  A,
  B,
  V = IntersectValues<A, B>,
  N = NeverKeys<V>,
  O = IntersectOpenProps<A, B>
> = Required<A> | Required<B> extends Exclude<Required<A> | Required<B>, N>
  ? Object<
      {
        [key in Exclude<keyof V, N>]: V[key];
      },
      Required<A> | Required<B>,
      O extends Never ? false : And<IsOpen<A>, IsOpen<B>>,
      O
    >
  : Never;

type IntersectValues<A, B> = {
  [key in
    | keyof ObjectValues<A>
    | keyof ObjectValues<B>]: key extends keyof ObjectValues<A>
    ? key extends keyof ObjectValues<B>
      ? Intersect<ObjectValues<A>[key], ObjectValues<B>[key]>
      : IsOpen<B> extends true
      ? Intersect<ObjectValues<A>[key], OpenProps<B>>
      : Never
    : key extends keyof ObjectValues<B>
    ? IsOpen<A> extends true
      ? Intersect<OpenProps<A>, ObjectValues<B>[key]>
      : Never
    : Never;
};

type NeverKeys<O> = {
  [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];

type IntersectOpenProps<A, B> = Intersect<OpenProps<A>, OpenProps<B>>;
