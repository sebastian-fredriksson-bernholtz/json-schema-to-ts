import { A, B } from "ts-toolbelt";

import { And, DoesExtend } from "../../../utils";

import { TypeId, Never, Const, Error } from "..";
import { _Array, ArrayType, ArrayValues } from "../array";
import { TupleValues, TupleType, IsTupleOpen, TupleOpenProps } from "../tuple";
import { UnionType } from "../union";

import { _Exclude, ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";
import { $IsRepresentable } from "../isRepresentable";

export type ExcludeFromArray<A extends ArrayType, B> = {
  any: Never;
  never: A;
  const: A;
  enum: A;
  primitive: A;
  array: B extends ArrayType ? ExcludeArrays<A, B> : never;
  tuple: B extends TupleType
    ? And<
        DoesExtend<A.Equals<TupleValues<B>, []>, B.True>,
        IsTupleOpen<B>
      > extends true
      ? ExcludeArrays<A, _Array<TupleOpenProps<B>>>
      : A
    : never;
  object: A;
  union: B extends UnionType ? ExcludeUnion<A, B> : never;
  intersection: ExcludeIntersection<A, B>;
  exclusion: B extends ExclusionType ? ExcludeExclusion<A, B> : never;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

type ExcludeArrays<
  A extends ArrayType,
  B extends ArrayType,
  X = _Exclude<ArrayValues<A>, ArrayValues<B>>
> = $IsRepresentable<X> extends true ? A : Const<[]>;
