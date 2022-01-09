import { $Exclude, ExclusionSource, ExclusionExcluded } from ".";

export type ExcludeExclusion<Source, ExcludedExclusion> = $Exclude<
  Source,
  $Exclude<
    ExclusionSource<ExcludedExclusion>,
    ExclusionExcluded<ExcludedExclusion>
  >
>;
