import { Get } from "../../../utils";

import { TypeId, Never, Error } from "..";
import { PrimitiveType, PrimitiveValue } from "../primitive";
import { UnionType } from "../union";

import { ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromPrimitive<A extends PrimitiveType, B> = {
  any: Never;
  never: A;
  const: A;
  enum: A;
  primitive: B extends PrimitiveType
    ? PrimitiveValue<A> extends PrimitiveValue<B>
      ? Never
      : A
    : never;
  array: A;
  tuple: A;
  object: A;
  union: B extends UnionType ? ExcludeUnion<A, B> : never;
  intersection: ExcludeIntersection<A, B>;
  exclusion: B extends ExclusionType ? ExcludeExclusion<A, B> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends TypeId ? Get<B, "type"> : "errorTypeProperty"];
