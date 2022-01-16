import { M } from "ts-algebra";

import { And, DoesExtend } from "../utils";

import { FromSchemaOptions, FromSchemaDefaultOptions } from "../definitions";

import { ParseMixedSchema } from "./mixed";
import { ParseConstSchema } from "./const";
import { ParseEnumSchema } from "./enum";
import { ParseArrSchema } from "./array";
import { ParseObjectSchema } from "./object";
import { ParseAnyOfSchema } from "./anyOf";
import { ParseOneOfSchema } from "./oneOf";
import { ParseAllOfSchema } from "./allOf";
import { ParseNotSchema } from "./not";
import { ParseIfThenElseSchema } from "./ifThenElse";

export type ParseSchema<
  S,
  O extends FromSchemaOptions = FromSchemaDefaultOptions
> = {
  any: M.Any;
  never: M.Never;
  null: M.Primitive<null>;
  boolean: M.Primitive<boolean>;
  number: M.Primitive<number>;
  string: M.Primitive<string>;
  mixed: ParseMixedSchema<S>;
  object: ParseObjectSchema<S>;
  array: ParseArrSchema<S>;
  const: ParseConstSchema<S>;
  enum: ParseEnumSchema<S>;
  anyOf: ParseAnyOfSchema<S>;
  oneOf: ParseOneOfSchema<S>;
  allOf: ParseAllOfSchema<S>;
  // @ts-expect-error "Type instanciation is too deep and potentially infinite" error
  not: ParseNotSchema<S>;
  ifThenElse: ParseIfThenElseSchema<S>;
}[InferSchemaType<S, O>];

type InferSchemaType<
  S,
  O extends FromSchemaOptions = FromSchemaDefaultOptions
> = S extends true | string
  ? "any"
  : S extends false
  ? "never"
  : And<
      DoesExtend<O["parseIfThenElseKeywords"], true>,
      DoesExtend<"if", keyof S>
    > extends true
  ? "ifThenElse"
  : And<
      DoesExtend<O["parseNotKeyword"], true>,
      DoesExtend<"not", keyof S>
    > extends true
  ? "not"
  : "allOf" extends keyof S
  ? "allOf"
  : "oneOf" extends keyof S
  ? "oneOf"
  : "anyOf" extends keyof S
  ? "anyOf"
  : "enum" extends keyof S
  ? "enum"
  : "const" extends keyof S
  ? "const"
  : "type" extends keyof S
  ? S["type"] extends any[]
    ? "mixed"
    : S["type"] extends "null"
    ? "null"
    : S["type"] extends "boolean"
    ? "boolean"
    : S["type"] extends "integer" | "number"
    ? "number"
    : S["type"] extends "string"
    ? "string"
    : S["type"] extends "object"
    ? "object"
    : S["type"] extends "array"
    ? "array"
    : "never"
  : "any";
