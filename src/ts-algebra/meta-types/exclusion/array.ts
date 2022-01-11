import { A, B } from "ts-toolbelt";

import { Get, And, DoesExtend } from "../../../utils";

import { TypeId, Never, Const, Error } from "..";
import { $Array, ArrayType, ArrayValues } from "../array";
import { TupleValues, TupleType, IsTupleOpen, TupleOpenProps } from "../tuple";
import { UnionType } from "../union";

import { $Exclude, ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";
import { IsRepresentable } from "../isRepresentable";

export type ExcludeFromArray<Source extends ArrayType, Excluded> = {
  any: Never;
  never: Source;
  const: Source;
  enum: Source;
  primitive: Source;
  array: Excluded extends ArrayType ? ExcludeArrays<Source, Excluded> : never;
  tuple: Excluded extends TupleType
    ? And<
        DoesExtend<A.Equals<TupleValues<Excluded>, []>, B.True>,
        IsTupleOpen<Excluded>
      > extends true
      ? ExcludeArrays<Source, $Array<TupleOpenProps<Excluded>>>
      : Source
    : never;
  object: Source;
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

type ExcludeArrays<
  Source extends ArrayType,
  Excluded extends ArrayType,
  ExcludedValues = $Exclude<ArrayValues<Source>, ArrayValues<Excluded>>
> = IsRepresentable<ExcludedValues> extends true ? Source : Const<[]>;
