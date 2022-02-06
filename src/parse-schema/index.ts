import { M } from "ts-algebra";

import { And, DoesExtend } from "../utils";

import { JSONSchema7 } from "../definitions";

import { MultipleTypesSchema, ParseMultipleTypesSchema } from "./multipleTypes";
import { ConstSchema, ParseConstSchema } from "./const";
import { EnumSchema, ParseEnumSchema } from "./enum";
import { ParseArraySchema } from "./array";
import { ParseObjectSchema } from "./object";
import { AnyOfSchema, ParseAnyOfSchema } from "./anyOf";
import { OneOfSchema, ParseOneOfSchema } from "./oneOf";
import { AllOfSchema, ParseAllOfSchema } from "./allOf";
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

// TOIMPROVE: Use only ParseSchema
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
  : S extends AllOfSchema
  ? ParseAllOfSchema<S, O>
  : S extends OneOfSchema
  ? ParseOneOfSchema<S, O>
  : S extends AnyOfSchema
  ? ParseAnyOfSchema<S, O>
  : S extends EnumSchema
  ? ParseEnumSchema<S, O>
  : S extends ConstSchema
  ? ParseConstSchema<S, O>
  : "type" extends keyof S
  ? S extends MultipleTypesSchema
    ? ParseMultipleTypesSchema<S, O>
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
