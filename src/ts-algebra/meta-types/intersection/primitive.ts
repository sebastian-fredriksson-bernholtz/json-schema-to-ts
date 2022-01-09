import { Get } from "../../../utils";

import { TypeId, Never, Error } from "..";
import { PrimitiveValue } from "../primitive";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectExclusion } from "./exclusion";
import { Intersect } from ".";

export type IntersectPrimitive<A, B> = {
  any: A;
  never: Never;
  const: IntersectConst<B, A>;
  enum: IntersectEnum<B, A>;
  primitive: PrimitiveValue<A> extends PrimitiveValue<B>
    ? A
    : PrimitiveValue<B> extends PrimitiveValue<A>
    ? B
    : Never;
  array: Never;
  tuple: Never;
  object: Never;
  union: Intersect<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: IntersectExclusion<B, A>;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends TypeId ? Get<B, "type"> : "errorTypeProperty"];
