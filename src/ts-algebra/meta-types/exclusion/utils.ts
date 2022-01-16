import { And, Not } from "../../../utils";

import { Type } from "..";

import { $IsRepresentable } from "../isRepresentable";

import { _$Exclude } from ".";

export type CrossValue<
  V1 extends Type,
  P1 extends boolean,
  R1 extends boolean,
  V2 extends Type,
  P2 extends boolean,
  R2 extends boolean,
  X = _$Exclude<V1, V2>
> = {
  sourceValue: V1;
  isPossibleInSource: P1;
  isRequiredInSource: R1;
  isPossibleInExcluded: P2;
  isRequiredInExcluded: R2;
  exclusionValue: X;
  isExclusionValueRepresentable: $IsRepresentable<X>;
};

export type CrossValueType = {
  sourceValue: Type;
  isPossibleInSource: boolean;
  isRequiredInSource: boolean;
  isPossibleInExcluded: boolean;
  isRequiredInExcluded: boolean;
  exclusionValue: any;
  isExclusionValueRepresentable: any;
};

export type SourceValue<C extends CrossValueType> = C["sourceValue"];

type IsPossibleInSource<C extends CrossValueType> = C["isPossibleInSource"];

type IsRequiredInSource<C extends CrossValueType> = C["isRequiredInSource"];

type IsPossibleInExcluded<C extends CrossValueType> = C["isPossibleInExcluded"];

type IsRequiredInExcluded<C extends CrossValueType> = C["isRequiredInExcluded"];

export type ExclusionValue<C extends CrossValueType> = C["exclusionValue"];

export type IsExclusionValueRepresentable<C extends CrossValueType> =
  C["isExclusionValueRepresentable"];

export type IsOutsideOfSourceScope<C extends CrossValueType> = And<
  IsRequiredInExcluded<C>,
  Not<IsPossibleInSource<C>>
>;

export type IsOutsideOfExcludedScope<C extends CrossValueType> = And<
  IsRequiredInSource<C>,
  Not<IsPossibleInExcluded<C>>
>;

export type Propagate<C extends CrossValueType> =
  IsExclusionValueRepresentable<C> extends true
    ? ExclusionValue<C>
    : SourceValue<C>;

export type IsOmittable<C extends CrossValueType> = And<
  Not<IsRequiredInSource<C>>,
  IsRequiredInExcluded<C>
>;
