import { A, B } from "ts-toolbelt";

import { DoesExtend, Or, Not, Get, DeepMergeUnsafe } from "../../utils";

import { Resolve, Any, Never } from ".";
import { IsRepresentable } from "./isRepresentable";

export type ObjectTypeId = "object";

export type Object<V = {}, R = never, O = true, P = Any> = {
  type: ObjectTypeId;
  values: V;
  required: R;
  isOpen: O;
  openProps: P;
};

export type ObjectValues<O> = Get<O, "values">;

export type ObjectValue<O, K> = K extends keyof ObjectValues<O>
  ? ObjectValues<O>[K]
  : IsObjectOpen<O> extends true
  ? ObjectOpenProps<O>
  : Never;

export type ObjectRequiredKeys<O> = Get<O, "required"> extends string
  ? Get<O, "required">
  : never;

export type IsObjectOpen<O> = Get<O, "isOpen">;

export type ObjectOpenProps<O> = Get<O, "openProps">;

type IsObjectEmpty<O> = DoesExtend<
  Extract<keyof ObjectValues<O>, keyof ObjectValues<O>>,
  never
>;

export type ResolveObject<O> = IsObjectValid<O> extends true
  ? ResolveValidObject<O>
  : never;

type IsObjectValid<O> = IsObjectOpen<O> extends false
  ? ObjectRequiredKeys<O> extends keyof ObjectValues<O>
    ? true
    : false
  : true;

type ResolveValidObject<O> = DeepMergeUnsafe<
  IsObjectOpen<O> extends true
    ? IsObjectEmpty<O> extends true
      ? { [key: string]: Resolve<Get<O, "openProps">> }
      : { [key: string]: Resolve<Any> }
    : {},
  DeepMergeUnsafe<
    {
      [key in Exclude<keyof ObjectValues<O>, ObjectRequiredKeys<O>>]?: Resolve<
        ObjectValues<O>[key]
      >;
    },
    {
      [key in ObjectRequiredKeys<O>]: key extends keyof ObjectValues<O>
        ? Resolve<ObjectValues<O>[key]>
        : Resolve<Any>;
    }
  >
>;

type IsObjectValueRepresentable<O, K> = K extends keyof ObjectValues<O>
  ? IsRepresentable<ObjectValues<O>[K]>
  : IsObjectOpen<O> extends true
  ? IsRepresentable<ObjectOpenProps<O>>
  : false;

export type IsObjectRepresentable<O> = Or<
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
