import { M } from "ts-algebra";

import { And, DoesExtend } from "../utils";

import { JSONSchema7 } from "../definitions";

import { ParseMixedSchema } from "./mixed";
import { ParseConstSchema } from "./const";
import { ParseEnumSchema } from "./enum";
import { ParseArraySchema } from "./array";
import { ParseObjectSchema } from "./object";
import { ParseAnyOfSchema } from "./anyOf";
import { ParseOneOfSchema } from "./oneOf";
import { ParseAllOfSchema } from "./allOf";
import { ParseNotSchema } from "./not";
import { ParseIfThenElseSchema } from "./ifThenElse";

export type ParseSchemaOptions = {
  parseNotKeyword: boolean;
  parseIfThenElseKeywords: boolean;
};

export type ParseSchema<
  S extends JSONSchema7,
  O extends ParseSchemaOptions
> = $ParseSchema<S, O>;

export type $ParseSchema<S, O extends ParseSchemaOptions> = S extends
  | true
  | string
  ? M.Any
  : S extends false
  ? M.Never
  : And<
      DoesExtend<O["parseIfThenElseKeywords"], true>,
      DoesExtend<"if", keyof S>
    > extends true
  ? ParseIfThenElseSchema<S, O>
  : And<
      DoesExtend<O["parseNotKeyword"], true>,
      DoesExtend<"not", keyof S>
    > extends true
  ? ParseNotSchema<S, O>
  : "allOf" extends keyof S
  ? ParseAllOfSchema<S, O>
  : "oneOf" extends keyof S
  ? ParseOneOfSchema<S, O>
  : "anyOf" extends keyof S
  ? ParseAnyOfSchema<S, O>
  : "enum" extends keyof S
  ? ParseEnumSchema<S, O>
  : "const" extends keyof S
  ? ParseConstSchema<S, O>
  : "type" extends keyof S
  ? S["type"] extends any[]
    ? ParseMixedSchema<S, O>
    : S["type"] extends "null"
    ? M.Primitive<null>
    : S["type"] extends "boolean"
    ? M.Primitive<boolean>
    : S["type"] extends "integer"
    ? M.Primitive<number>
    : S["type"] extends "number"
    ? M.Primitive<number>
    : S["type"] extends "string"
    ? M.Primitive<string>
    : S["type"] extends "object"
    ? ParseObjectSchema<S, O>
    : S["type"] extends "array"
    ? ParseArraySchema<S, O>
    : M.Never
  : M.Any;
