import {
  _Exclude,
  _$Exclude,
  ExclusionType,
  ExclusionSource,
  ExclusionExcluded,
} from ".";

export type ExcludeExclusion<A, B extends ExclusionType> = _$Exclude<
  A,
  _Exclude<ExclusionSource<B>, ExclusionExcluded<B>>
>;
