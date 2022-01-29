import { IntersectionType, $ClearIntersections } from "../intersection";
import { Type } from "../type";

import { _$Exclude } from ".";

export type ExcludeIntersection<
  A extends Type,
  B extends IntersectionType
> = _$Exclude<A, $ClearIntersections<B>>;
