import { DoesExtend, Get } from "../../../utils";

import { Resolve, TypeId, Never, Error } from "..";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { ErrorTypeId } from "../error";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectPrimitive } from "./primitive";
import { ClearArrIntersections, IntersectArr } from "./array";
import { ClearTupleIntersections, IntersectTuple } from "./tuple";
import { ClearObjectIntersections, IntersectObject } from "./object";
import { ClearUnionIntersections, IntersectUnion } from "./union";
import { ClearExclusionIntersections, IntersectExclusion } from "./exclusion";
import { IsRepresentable } from "../isRepresentable";

export type IntersectionTypeId = "intersection";

export type Intersection<L, R> = {
  type: IntersectionTypeId;
  left: L;
  right: R;
};

export type IsIntersection<I> = DoesExtend<Get<I, "type">, IntersectionTypeId>;

export type IntersectionLeft<I> = Get<I, "left">;

export type IntersectionRight<I> = Get<I, "right">;

export type ResolveIntersection<T> = Resolve<ClearIntersections<T>>;

export type ClearIntersections<T> = {
  any: T;
  never: T;
  const: T;
  enum: T;
  primitive: T;
  array: ClearArrIntersections<T>;
  tuple: ClearTupleIntersections<T>;
  object: ClearObjectIntersections<T>;
  union: ClearUnionIntersections<T>;
  intersection: Intersect<
    ClearIntersections<IntersectionLeft<T>>,
    ClearIntersections<IntersectionRight<T>>
  >;
  exclusion: ClearExclusionIntersections<T>;
  error: T;
  errorMissingType: Error<"Missing type property">;
}[Get<T, "type"> extends TypeId ? Get<T, "type"> : "errorMissingType"];

export type Intersect<A, B> = {
  any: B;
  never: Get<B, "type"> extends ErrorTypeId ? B : Never;
  const: A extends ConstType ? IntersectConst<A, B> : never;
  enum: A extends EnumType ? IntersectEnum<A, B> : never;
  primitive: A extends PrimitiveType ? IntersectPrimitive<A, B> : never;
  array: IntersectArr<A, B>;
  tuple: IntersectTuple<A, B>;
  object: IntersectObject<A, B>;
  union: IntersectUnion<A, B>;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: IntersectExclusion<A, B>;
  error: A;
  errorMissingType: Error<"Missing type property">;
}[Get<A, "type"> extends TypeId ? Get<A, "type"> : "errorMissingType"];

export type IsIntersectionRepresentable<A> = IsRepresentable<
  ClearIntersections<A>
>;
