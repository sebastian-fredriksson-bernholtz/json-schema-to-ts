import { Get } from "../../../utils";

import { TypeId, Never, Error } from "..";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveValue, PrimitiveType } from "../primitive";
import { ExclusionType } from "../exclusion";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectExclusion } from "./exclusion";
import { Intersect } from ".";

export type IntersectPrimitive<A extends PrimitiveType, B> = {
  any: A;
  never: Never;
  const: B extends ConstType ? IntersectConst<B, A> : never;
  enum: B extends EnumType ? IntersectEnum<B, A> : never;
  primitive: B extends PrimitiveType
    ? PrimitiveValue<A> extends PrimitiveValue<B>
      ? A
      : PrimitiveValue<B> extends PrimitiveValue<A>
      ? B
      : Never
    : never;
  array: Never;
  tuple: Never;
  object: Never;
  union: Intersect<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: B extends ExclusionType ? IntersectExclusion<B, A> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends TypeId ? Get<B, "type"> : "errorTypeProperty"];
