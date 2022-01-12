import { TypeId, Never, Error } from "..";
import { AnyType } from "../any";
import { UnionType } from "../union";

import { ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromAny<A extends AnyType, B> = {
  any: Never;
  never: A;
  const: A;
  enum: A;
  primitive: A;
  array: A;
  tuple: A;
  object: A;
  union: B extends UnionType ? ExcludeUnion<A, B> : never;
  intersection: ExcludeIntersection<A, B>;
  exclusion: B extends ExclusionType ? ExcludeExclusion<A, B> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];
