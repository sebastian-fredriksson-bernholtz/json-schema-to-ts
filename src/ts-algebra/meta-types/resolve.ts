import { Get } from "../../utils";

import { ResolveAny } from "./any";
import { ResolveNever } from "./never";
import { ResolveConst } from "./const";
import { ResolveEnum } from "./enum";
import { ResolvePrimitive } from "./primitive";
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
  const: ResolveConst<T>;
  enum: ResolveEnum<T>;
  primitive: ResolvePrimitive<T>;
  array: ResolveArr<T>;
  tuple: ResolveTuple<T>;
  object: ResolveObject<T>;
  union: ResolveUnion<T>;
  intersection: ResolveIntersection<T>;
  exclusion: ResolveExclusion<T>;
  error: never;
}[Get<T, "type"> extends TypeId ? Get<T, "type"> : "error"];
