import { Get } from "../utils";

import { MetaType } from "./meta-types";
import { IsEnumRepresentable } from "./meta-types/enum";
import { IsTupleRepresentable } from "./meta-types/tuple";
import { IsObjectRepresentable } from "./meta-types/object";
import { IsUnionRepresentable } from "./meta-types/union";
import { IsIntersectionRepresentable } from "./meta-types/intersection";
import { IsExclusionRepresentable } from "./meta-types/exclusion";

export type IsRepresentable<A> = {
  any: true;
  never: false;
  const: true;
  enum: IsEnumRepresentable<A>;
  primitive: true;
  array: true; // Empty array will represent any array
  tuple: IsTupleRepresentable<A>;
  object: IsObjectRepresentable<A>;
  union: IsUnionRepresentable<A>;
  intersection: IsIntersectionRepresentable<A>;
  exclusion: IsExclusionRepresentable<A>;
  error: false;
  errorMissingType: false;
}[Get<A, "type"> extends MetaType ? Get<A, "type"> : "errorMissingType"];
