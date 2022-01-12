import { ResolveAny } from "./any";
import { ResolveNever } from "./never";
import { ConstType, ResolveConst } from "./const";
import { EnumType, ResolveEnum } from "./enum";
import { PrimitiveType, ResolvePrimitive } from "./primitive";
import { ArrayType, ResolveArray } from "./array";
import { TupleType, ResolveTuple } from "./tuple";
import { ObjectType, ResolveObject } from "./object";
import { UnionType, ResolveUnion } from "./union";
import { IntersectionType, ResolveIntersection } from "./intersection";
import { ExclusionType, ResolveExclusion } from "./exclusion";

import { Type } from "./type";
import { TypeId } from "./typeId";

export type Resolve<T extends Type> = {
  any: ResolveAny;
  never: ResolveNever;
  const: T extends ConstType ? ResolveConst<T> : never;
  enum: T extends EnumType ? ResolveEnum<T> : never;
  primitive: T extends PrimitiveType ? ResolvePrimitive<T> : never;
  array: T extends ArrayType ? ResolveArray<T> : never;
  tuple: T extends TupleType ? ResolveTuple<T> : never;
  object: T extends ObjectType ? ResolveObject<T> : never;
  union: T extends UnionType ? ResolveUnion<T> : never;
  intersection: T extends IntersectionType ? ResolveIntersection<T> : never;
  exclusion: T extends ExclusionType ? ResolveExclusion<T> : never;
  error: never;
}[T["type"]];

export type $Resolve<T> = {
  any: ResolveAny;
  never: ResolveNever;
  const: T extends ConstType ? ResolveConst<T> : never;
  enum: T extends EnumType ? ResolveEnum<T> : never;
  primitive: T extends PrimitiveType ? ResolvePrimitive<T> : never;
  array: T extends ArrayType ? ResolveArray<T> : never;
  tuple: T extends TupleType ? ResolveTuple<T> : never;
  object: T extends ObjectType ? ResolveObject<T> : never;
  union: T extends UnionType ? ResolveUnion<T> : never;
  intersection: T extends IntersectionType ? ResolveIntersection<T> : never;
  exclusion: T extends ExclusionType ? ResolveExclusion<T> : never;
  error: never;
}[T extends { type: TypeId } ? T["type"] : "error"];
