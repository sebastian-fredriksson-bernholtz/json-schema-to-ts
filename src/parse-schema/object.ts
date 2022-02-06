import { M } from "ts-algebra";

import { IsObject } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";

export type ParseObjectSchema<
  S,
  O extends ParseSchemaOptions
> = "properties" extends keyof S
  ? M.$Object<
      {
        [key in keyof S["properties"]]: $ParseSchema<S["properties"][key], O>;
      },
      GetRequired<S>,
      "additionalProperties" extends keyof S
        ? S["additionalProperties"] extends false
          ? false
          : true
        : true,
      GetOpenProps<S, O>
    >
  : M.$Object<{}, GetRequired<S>, true, GetOpenProps<S, O>>;

type GetRequired<S> = S extends { required: ReadonlyArray<string> }
  ? S["required"][number]
  : never;

type GetOpenProps<
  S,
  O extends ParseSchemaOptions
> = "additionalProperties" extends keyof S
  ? "patternProperties" extends keyof S
    ? AdditionalAndPatternProps<
        S["additionalProperties"],
        S["patternProperties"],
        O
      >
    : AdditionalProps<S["additionalProperties"], O>
  : "patternProperties" extends keyof S
  ? PatternProps<S["patternProperties"], O>
  : M.Any;

type AdditionalProps<A, O extends ParseSchemaOptions> = A extends false
  ? M.Never
  : A extends true
  ? M.Any
  : IsObject<A> extends true
  ? $ParseSchema<A, O>
  : M.Error<'Invalid value in "additionalProperties" property'>;

type PatternProps<P, O extends ParseSchemaOptions> = {
  type: "union";
  values: {
    [key in keyof P]: $ParseSchema<P[key], O>;
  }[keyof P];
};

type AdditionalAndPatternProps<
  A,
  P,
  O extends ParseSchemaOptions
> = A extends boolean
  ? M.$Union<
      {
        [key in keyof P]: $ParseSchema<P[key], O>;
      }[keyof P]
    >
  : IsObject<A> extends true
  ? M.$Union<
      | $ParseSchema<A, O>
      | {
          [key in keyof P]: $ParseSchema<P[key], O>;
        }[keyof P]
    >
  : never;
