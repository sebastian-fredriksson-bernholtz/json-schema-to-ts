import { A, B, U } from "ts-toolbelt";

import { Get } from "../../../utils";

import { TypeId, Never, Const, Error } from "..";
import { Enum, EnumType, EnumValues } from "../enum";
import { Intersect } from "../intersection";
import { UnionType } from "../union";
import { IsRepresentable } from "../isRepresentable";

import { $Exclude, ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromEnum<Source extends EnumType, Excluded> = {
  any: Never;
  never: Source;
  const: FilterExcluded<Source, Excluded>;
  enum: FilterExcluded<Source, Excluded>;
  primitive: FilterExcluded<Source, Excluded>;
  array: FilterExcluded<Source, Excluded>;
  tuple: FilterExcluded<Source, Excluded>;
  object: FilterExcluded<Source, Excluded>;
  union: Excluded extends UnionType ? ExcludeUnion<Source, Excluded> : never;
  intersection: ExcludeIntersection<Source, Excluded>;
  exclusion: Excluded extends ExclusionType
    ? ExcludeExclusion<Source, Excluded>
    : never;
  error: Excluded;
  errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends TypeId
  ? Get<Excluded, "type">
  : "errorTypeProperty"];

type FilterExcluded<SourceEnum extends EnumType, Excluded> = Enum<
  RecurseOnEnumValues<EnumValues<SourceEnum>, Excluded>
>;

type RecurseOnEnumValues<EnumValues, Excluded> =
  EnumValues extends infer EnumValue
    ? IsRepresentable<$Exclude<Const<EnumValue>, Excluded>> extends false
      ? never
      : EnumValue
    : never;

export type ExcludeEnum<
  Source,
  ExcludedEnum extends EnumType,
  ExcludedEnumValues = EnumValues<ExcludedEnum>
> = A.Equals<ExcludedEnumValues, never> extends B.True
  ? Source
  : ExcludeEnumValue<Source, U.Last<ExcludedEnumValues>, ExcludedEnumValues>;

type ExcludeEnumValue<Source, LastEnumValue, ExcludedEnumValues> = Intersect<
  $Exclude<Source, Const<LastEnumValue>>,
  $Exclude<Source, Enum<U.Exclude<ExcludedEnumValues, LastEnumValue>>>
>;
