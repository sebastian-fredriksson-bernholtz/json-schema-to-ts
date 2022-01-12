import { _$Exclude } from ".";

import { $ClearIntersections } from "../intersection";

export type ExcludeIntersection<A, B> = _$Exclude<A, $ClearIntersections<B>>;
