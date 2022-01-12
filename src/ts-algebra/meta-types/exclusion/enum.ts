import { A, B, U } from "ts-toolbelt";

import { TypeId, Never, Const, Error } from "..";
import { Enum, EnumType, EnumValues } from "../enum";
import { $Intersect } from "../intersection";
import { UnionType } from "../union";
import { $IsRepresentable } from "../isRepresentable";

import { _$Exclude, ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromEnum<A extends EnumType, B> = {
  any: Never;
  never: A;
  const: FilterExcluded<A, B>;
  enum: FilterExcluded<A, B>;
  primitive: FilterExcluded<A, B>;
  array: FilterExcluded<A, B>;
  tuple: FilterExcluded<A, B>;
  object: FilterExcluded<A, B>;
  union: B extends UnionType ? ExcludeUnion<A, B> : never;
  intersection: ExcludeIntersection<A, B>;
  exclusion: B extends ExclusionType ? ExcludeExclusion<A, B> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

type FilterExcluded<A extends EnumType, B> = Enum<
  RecurseOnEnumValues<EnumValues<A>, B>
>;

type RecurseOnEnumValues<V, B> = V extends infer EnumValue
  ? $IsRepresentable<_$Exclude<Const<EnumValue>, B>> extends false
    ? never
    : EnumValue
  : never;

export type ExcludeEnum<A, B extends EnumType, V = EnumValues<B>> = A.Equals<
  V,
  never
> extends B.True
  ? A
  : ExcludeEnumValue<A, U.Last<V>, V>;

type ExcludeEnumValue<A, L, V> = $Intersect<
  _$Exclude<A, Const<L>>,
  _$Exclude<A, Enum<U.Exclude<V, L>>>
>;
