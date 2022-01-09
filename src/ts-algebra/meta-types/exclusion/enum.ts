import { A, B, U } from "ts-toolbelt";

import { Get } from "../../../utils";

import { TypeId, Never, Const, Error } from "..";
import { Enum, EnumValues } from "../enum";
import { Intersect } from "../intersection";
import { IsRepresentable } from "../isRepresentable";

import { $Exclude } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromEnum<Source, Excluded> = {
  any: Never;
  never: Source;
  const: FilterExcluded<Source, Excluded>;
  enum: FilterExcluded<Source, Excluded>;
  primitive: FilterExcluded<Source, Excluded>;
  array: FilterExcluded<Source, Excluded>;
  tuple: FilterExcluded<Source, Excluded>;
  object: FilterExcluded<Source, Excluded>;
  union: ExcludeUnion<Source, Excluded>;
  intersection: ExcludeIntersection<Source, Excluded>;
  exclusion: ExcludeExclusion<Source, Excluded>;
  error: Excluded;
  errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends TypeId
  ? Get<Excluded, "type">
  : "errorTypeProperty"];

type FilterExcluded<SourceEnum, Excluded> = Enum<
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
  ExcludedEnum,
  ExcludedEnumValues = EnumValues<ExcludedEnum>
> = A.Equals<ExcludedEnumValues, never> extends B.True
  ? Source
  : ExcludeEnumValue<Source, U.Last<ExcludedEnumValues>, ExcludedEnumValues>;

type ExcludeEnumValue<Source, LastEnumValue, ExcludedEnumValues> = Intersect<
  $Exclude<Source, Const<LastEnumValue>>,
  $Exclude<Source, Enum<U.Exclude<ExcludedEnumValues, LastEnumValue>>>
>;
