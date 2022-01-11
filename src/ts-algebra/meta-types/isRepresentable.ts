import { Get } from "../../utils";

import { TypeId } from ".";
import { EnumType, IsEnumRepresentable } from "./enum";
import { TupleType, IsTupleRepresentable } from "./tuple";
import { ObjectType, IsObjectRepresentable } from "./object";
import { UnionType, IsUnionRepresentable } from "./union";
import { IntersectionType, IsIntersectionRepresentable } from "./intersection";
import { ExclusionType, IsExclusionRepresentable } from "./exclusion";

export type IsRepresentable<A> = {
  any: true;
  never: false;
  const: true;
  enum: A extends EnumType ? IsEnumRepresentable<A> : never;
  primitive: true;
  array: true; // Empty array will represent any array
  tuple: A extends TupleType ? IsTupleRepresentable<A> : never;
  object: A extends ObjectType ? IsObjectRepresentable<A> : never;
  union: A extends UnionType ? IsUnionRepresentable<A> : never;
  intersection: A extends IntersectionType
    ? IsIntersectionRepresentable<A>
    : never;
  exclusion: A extends ExclusionType ? IsExclusionRepresentable<A> : never;
  error: false;
  errorMissingType: false;
}[Get<A, "type"> extends TypeId ? Get<A, "type"> : "errorMissingType"];
