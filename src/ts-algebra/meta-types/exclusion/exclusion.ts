import { Type } from "../type";

import {
  _Exclude,
  _$Exclude,
  ExclusionType,
  ExclusionSource,
  ExclusionExcluded,
} from ".";

export type ExcludeExclusion<
  A extends Type,
  B extends ExclusionType
> = _$Exclude<A, _Exclude<ExclusionSource<B>, ExclusionExcluded<B>>>;
