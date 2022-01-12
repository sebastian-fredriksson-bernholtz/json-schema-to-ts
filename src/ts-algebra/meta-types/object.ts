import { A, B } from "ts-toolbelt";

import { DoesExtend, Or, Not, DeepMergeUnsafe } from "../../utils";

import { $Resolve, Any, Never } from ".";
import { Type } from "./type";
import { $IsRepresentable } from "./isRepresentable";

export type ObjectTypeId = "object";

export type Object<
  V extends Record<A.Key, Type> = {},
  R extends A.Key = never,
  O extends boolean = true,
  P extends Type = Any
> = {
  type: ObjectTypeId;
  values: V;
  required: R;
  isOpen: O;
  openProps: P;
};

export type $Object<V = {}, R = never, O = true, P = Any> = {
  type: ObjectTypeId;
  values: V;
  required: R;
  isOpen: O;
  openProps: P;
};

export type ObjectType = {
  type: ObjectTypeId;
  values: Record<A.Key, Type>;
  required: A.Key;
  isOpen: boolean;
  openProps: Type;
};

export type ObjectValues<O extends ObjectType> = O["values"];

export type ObjectValue<
  O extends ObjectType,
  K extends A.Key
> = K extends keyof ObjectValues<O>
  ? ObjectValues<O>[K]
  : IsObjectOpen<O> extends true
  ? ObjectOpenProps<O>
  : Never;

export type ObjectRequiredKeys<O extends ObjectType> = O["required"];

export type IsObjectOpen<O extends ObjectType> = O["isOpen"];

export type ObjectOpenProps<O extends ObjectType> = O["openProps"];

type IsObjectEmpty<O extends ObjectType> = DoesExtend<
  Extract<keyof ObjectValues<O>, keyof ObjectValues<O>>,
  never
>;

export type ResolveObject<O extends ObjectType> = IsObjectValid<O> extends true
  ? ResolveValidObject<O>
  : never;

type IsObjectValid<O extends ObjectType> = IsObjectOpen<O> extends false
  ? ObjectRequiredKeys<O> extends keyof ObjectValues<O>
    ? true
    : false
  : true;

type ResolveValidObject<O extends ObjectType> = DeepMergeUnsafe<
  IsObjectOpen<O> extends true
    ? IsObjectEmpty<O> extends true
      ? { [key: string]: $Resolve<ObjectOpenProps<O>> }
      : { [key: string]: $Resolve<Any> }
    : {},
  DeepMergeUnsafe<
    {
      [key in Exclude<keyof ObjectValues<O>, ObjectRequiredKeys<O>>]?: $Resolve<
        ObjectValues<O>[key]
      >;
    },
    {
      [key in ObjectRequiredKeys<O>]: key extends keyof ObjectValues<O>
        ? $Resolve<ObjectValues<O>[key]>
        : $Resolve<Any>;
    }
  >
>;

type IsObjectValueRepresentable<
  O extends ObjectType,
  K extends A.Key
> = K extends keyof ObjectValues<O>
  ? $IsRepresentable<ObjectValues<O>[K]>
  : IsObjectOpen<O> extends true
  ? $IsRepresentable<ObjectOpenProps<O>>
  : false;

export type IsObjectRepresentable<O extends ObjectType> = Or<
  DoesExtend<A.Equals<ObjectRequiredKeys<O>, never>, B.True>,
  Not<
    DoesExtend<
      false,
      {
        [key in ObjectRequiredKeys<O>]: IsObjectValueRepresentable<O, key>;
      }[ObjectRequiredKeys<O>]
    >
  >
>;
