import { Primitive, Any, Never } from "ts-algebra";

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

export type ParseSchema<S> = {
  any: Any;
  never: Never;
  null: Primitive<null>;
  boolean: Primitive<boolean>;
  number: Primitive<number>;
  string: Primitive<string>;
  mixed: ParseMixedSchema<S>;
  object: ParseObjectSchema<S>;
  array: ParseArrSchema<S>;
  const: ParseConstSchema<S>;
  enum: ParseEnumSchema<S>;
  anyOf: ParseAnyOfSchema<S>;
  oneOf: ParseOneOfSchema<S>;
  allOf: ParseAllOfSchema<S>;
  not: ParseNotSchema<S>;
  ifThenElse: ParseIfThenElseSchema<S>;
}[InferSchemaType<S>];

type InferSchemaType<S> = S extends true | string
  ? "any"
  : S extends false
  ? "never"
  : "if" extends keyof S
  ? "ifThenElse"
  : "not" extends keyof S
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
