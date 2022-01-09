import { Get, IsObject } from "../../../utils";

import { Resolve, Type, Never, Error } from "..";
import { Const, ConstValue } from "../const";
import { ObjectValues, Required, IsOpen, OpenProps } from "../object";
import { IsRepresentable } from "../isRepresentable";

import { $Exclude } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromConst<Source, Excluded> = {
  any: Never;
  never: Source;
  const: CheckNotExtendsResolved<Source, Excluded>;
  enum: CheckNotExtendsResolved<Source, Excluded>;
  primitive: CheckNotExtendsResolved<Source, Excluded>;
  array: CheckNotExtendsResolved<Source, Excluded>;
  tuple: CheckNotExtendsResolved<Source, Excluded>;
  object: ExcludeObject<Source, Excluded>;
  union: ExcludeUnion<Source, Excluded>;
  intersection: ExcludeIntersection<Source, Excluded>;
  exclusion: ExcludeExclusion<Source, Excluded>;
  error: Excluded;
  errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends Type
  ? Get<Excluded, "type">
  : "errorTypeProperty"];

type CheckNotExtendsResolved<Source, Excluded> =
  ConstValue<Source> extends Resolve<Excluded> ? Never : Source;

type ExcludeObject<Source, Excluded> = IsObject<ConstValue<Source>> extends true
  ? Required<Source> extends keyof ConstValue<Source>
    ? ExcludeObjectFromConst<Source, Excluded>
    : Source
  : Source;

type ExcludeObjectFromConst<
  Source,
  Excluded,
  ExcludedValues = ExcludeConstValues<ConstValue<Source>, Excluded>
> = RepresentableKeys<ExcludedValues> extends never ? Never : Source;

type ExcludeConstValues<SourceValue, Excluded> = {
  [key in keyof SourceValue]: key extends keyof ObjectValues<Excluded>
    ? $Exclude<Const<SourceValue[key]>, ObjectValues<Excluded>[key]>
    : IsOpen<Excluded> extends true
    ? $Exclude<Const<SourceValue[key]>, OpenProps<Excluded>>
    : SourceValue[key];
};

type RepresentableKeys<O> = {
  [key in keyof O]: IsRepresentable<O[key]> extends true ? key : never;
}[keyof O];
