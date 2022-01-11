import { Get } from "../../utils";

import { ResolveAny } from "./any";
import { ResolveNever } from "./never";
import { ConstType, ResolveConst } from "./const";
import { ResolveEnum, EnumType } from "./enum";
import { ResolvePrimitive, PrimitiveType } from "./primitive";
import { ResolveArr } from "./array";
import { ResolveTuple } from "./tuple";
import { ResolveObject } from "./object";
import { ResolveUnion } from "./union";
import { ResolveIntersection } from "./intersection";
import { ResolveExclusion } from "./exclusion";

import { TypeId } from "./typeId";

export type Resolve<T> = {
  any: ResolveAny;
  never: ResolveNever;
  const: T extends ConstType ? ResolveConst<T> : never;
  enum: T extends EnumType ? ResolveEnum<T> : never;
  primitive: T extends PrimitiveType ? ResolvePrimitive<T> : never;
  array: ResolveArr<T>;
  tuple: ResolveTuple<T>;
  object: ResolveObject<T>;
  union: ResolveUnion<T>;
  intersection: ResolveIntersection<T>;
  exclusion: ResolveExclusion<T>;
  error: never;
}[Get<T, "type"> extends TypeId ? Get<T, "type"> : "error"];
