import { $Exclude, ExclusionType, ExclusionSource, ExclusionExcluded } from ".";

export type ExcludeExclusion<
  Source,
  ExcludedExclusion extends ExclusionType
> = $Exclude<
  Source,
  $Exclude<
    ExclusionSource<ExcludedExclusion>,
    ExclusionExcluded<ExcludedExclusion>
  >
>;
