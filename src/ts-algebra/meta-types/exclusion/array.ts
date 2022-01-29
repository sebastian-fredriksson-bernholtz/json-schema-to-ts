import { A, B } from "ts-toolbelt";

import { And, DoesExtend } from "../../../utils";

import { AnyType } from "../any";
import { Never, NeverType } from "../never";
import { Const, ConstType } from "../const";
import { EnumType } from "../enum";
import { PrimitiveType } from "../primitive";
import { _Array, ArrayType, ArrayValues } from "../array";
import { TupleValues, TupleType, IsTupleOpen, TupleOpenProps } from "../tuple";
import { ObjectType } from "../object";
import { UnionType } from "../union";
import { IntersectionType } from "../intersection";
import { Error, ErrorType } from "../error";
import { Type } from "../type";

import { _Exclude, ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";
import { $IsRepresentable } from "../isRepresentable";

export type ExcludeFromArray<A extends ArrayType, B> = B extends Type
  ? B extends AnyType
    ? Never
    : B extends NeverType
    ? A
    : B extends ConstType
    ? A
    : B extends EnumType
    ? A
    : B extends PrimitiveType
    ? A
    : B extends ArrayType
    ? ExcludeArrays<A, B>
    : B extends TupleType
    ? And<
        DoesExtend<A.Equals<TupleValues<B>, []>, B.True>,
        IsTupleOpen<B>
      > extends true
      ? ExcludeArrays<A, _Array<TupleOpenProps<B>>>
      : A
    : B extends ObjectType
    ? A
    : B extends UnionType
    ? ExcludeUnion<A, B>
    : B extends IntersectionType
    ? ExcludeIntersection<A, B>
    : B extends ExclusionType
    ? ExcludeExclusion<A, B>
    : B extends ErrorType
    ? B
    : Error<"TODO">
  : Error<"TODO">;

type ExcludeArrays<
  A extends ArrayType,
  B extends ArrayType,
  X = _Exclude<ArrayValues<A>, ArrayValues<B>>
> = $IsRepresentable<X> extends true ? A : Const<[]>;
