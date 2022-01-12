import { IsObject } from "../../../utils";

import { $Resolve, TypeId, Never, Error } from "..";
import { Const, ConstType, ConstValue } from "../const";
import {
  ObjectType,
  ObjectValues,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { $IsRepresentable } from "../isRepresentable";

import { _Exclude, ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromConst<A extends ConstType, B> = {
  any: Never;
  never: A;
  const: CheckNotExtendsResolved<A, B>;
  enum: CheckNotExtendsResolved<A, B>;
  primitive: CheckNotExtendsResolved<A, B>;
  array: CheckNotExtendsResolved<A, B>;
  tuple: CheckNotExtendsResolved<A, B>;
  object: B extends ObjectType ? ExcludeObject<A, B> : never;
  union: B extends UnionType ? ExcludeUnion<A, B> : never;
  intersection: ExcludeIntersection<A, B>;
  exclusion: B extends ExclusionType ? ExcludeExclusion<A, B> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

type CheckNotExtendsResolved<
  A extends ConstType,
  B
> = ConstValue<A> extends $Resolve<B> ? Never : A;

type ExcludeObject<A extends ConstType, B extends ObjectType> = IsObject<
  ConstValue<A>
> extends true
  ? ObjectRequiredKeys<B> extends keyof ConstValue<A>
    ? ExcludeObjectFromConst<A, B>
    : A
  : A;

type ExcludeObjectFromConst<
  A extends ConstType,
  B extends ObjectType,
  X = ExcludeConstValues<ConstValue<A>, B>
> = RepresentableKeys<X> extends never ? Never : A;

type ExcludeConstValues<V, B extends ObjectType> = {
  [key in keyof V]: key extends keyof ObjectValues<B>
    ? _Exclude<Const<V[key]>, ObjectValues<B>[key]>
    : IsObjectOpen<B> extends true
    ? _Exclude<Const<V[key]>, ObjectOpenProps<B>>
    : Const<V[key]>;
};

type RepresentableKeys<O> = {
  [key in keyof O]: $IsRepresentable<O[key]> extends true ? key : never;
}[keyof O];
