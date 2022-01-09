import { M } from "ts-algebra";

import { IsObject } from "../utils";

import { ParseSchema } from ".";

export type ParseObjectSchema<S> = "properties" extends keyof S
  ? M.Object<
      {
        [key in keyof S["properties"]]: ParseSchema<S["properties"][key]>;
      },
      GetRequired<S>,
      "additionalProperties" extends keyof S
        ? S["additionalProperties"] extends false
          ? false
          : true
        : true,
      GetOpenProps<S>
    >
  : M.Object<{}, GetRequired<S>, true, GetOpenProps<S>>;

type GetRequired<S> = S extends { required: ReadonlyArray<string> }
  ? S["required"][number]
  : never;

type GetOpenProps<S> = "additionalProperties" extends keyof S
  ? "patternProperties" extends keyof S
    ? AdditionalAndPatternProps<
        S["additionalProperties"],
        S["patternProperties"]
      >
    : AdditionalProps<S["additionalProperties"]>
  : "patternProperties" extends keyof S
  ? PatternProps<S["patternProperties"]>
  : M.Any;

type AdditionalProps<A> = A extends false
  ? M.Never
  : A extends true
  ? M.Any
  : IsObject<A> extends true
  ? ParseSchema<A>
  : M.Error<'Invalid value in "additionalProperties" property'>;

type PatternProps<P> = {
  type: "union";
  values: {
    [key in keyof P]: ParseSchema<P[key]>;
  }[keyof P];
};

type AdditionalAndPatternProps<A, P> = A extends boolean
  ? M.Union<
      {
        [key in keyof P]: ParseSchema<P[key]>;
      }[keyof P]
    >
  : IsObject<A> extends true
  ? M.Union<
      | ParseSchema<A>
      | {
          [key in keyof P]: ParseSchema<P[key]>;
        }[keyof P]
    >
  : never;
