import { Get, IsObject } from "../../../utils";

import { Resolve, TypeId, Never, Error } from "..";
import { Const, ConstType, ConstValue } from "../const";
import {
  ObjectType,
  ObjectValues,
  ObjectRequiredKeys,
  IsObjectOpen,
  ObjectOpenProps,
} from "../object";
import { UnionType } from "../union";
import { IsRepresentable } from "../isRepresentable";

import { $Exclude, ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromConst<Source extends ConstType, Excluded> = {
  any: Never;
  never: Source;
  const: CheckNotExtendsResolved<Source, Excluded>;
  enum: CheckNotExtendsResolved<Source, Excluded>;
  primitive: CheckNotExtendsResolved<Source, Excluded>;
  array: CheckNotExtendsResolved<Source, Excluded>;
  tuple: CheckNotExtendsResolved<Source, Excluded>;
  object: Excluded extends ObjectType ? ExcludeObject<Source, Excluded> : never;
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

type CheckNotExtendsResolved<
  Source extends ConstType,
  Excluded
> = ConstValue<Source> extends Resolve<Excluded> ? Never : Source;

type ExcludeObject<
  Source extends ConstType,
  Excluded extends ObjectType
> = IsObject<ConstValue<Source>> extends true
  ? ObjectRequiredKeys<Excluded> extends keyof ConstValue<Source>
    ? ExcludeObjectFromConst<Source, Excluded>
    : Source
  : Source;

type ExcludeObjectFromConst<
  Source extends ConstType,
  Excluded extends ObjectType,
  ExcludedValues = ExcludeConstValues<ConstValue<Source>, Excluded>
> = RepresentableKeys<ExcludedValues> extends never ? Never : Source;

type ExcludeConstValues<SourceValue, Excluded extends ObjectType> = {
  [key in keyof SourceValue]: key extends keyof ObjectValues<Excluded>
    ? $Exclude<Const<SourceValue[key]>, ObjectValues<Excluded>[key]>
    : IsObjectOpen<Excluded> extends true
    ? $Exclude<Const<SourceValue[key]>, ObjectOpenProps<Excluded>>
    : SourceValue[key];
};

type RepresentableKeys<O> = {
  [key in keyof O]: IsRepresentable<O[key]> extends true ? key : never;
}[keyof O];
