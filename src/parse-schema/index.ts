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
> = S extends true | string
  ? M.Any
  : S extends false
  ? M.Never
  : And<
      DoesExtend<O["parseIfThenElseKeywords"], true>,
      DoesExtend<"if", keyof S>
    > extends true
  ? ParseIfThenElseSchema<S>
  : And<
      DoesExtend<O["parseNotKeyword"], true>,
      DoesExtend<"not", keyof S>
    > extends true
  ? // @ts-expect-error "Type instanciation is too deep and potentially infinite" error
    ParseNotSchema<S>
  : "allOf" extends keyof S
  ? ParseAllOfSchema<S>
  : "oneOf" extends keyof S
  ? ParseOneOfSchema<S>
  : "anyOf" extends keyof S
  ? ParseAnyOfSchema<S>
  : "enum" extends keyof S
  ? ParseEnumSchema<S>
  : "const" extends keyof S
  ? ParseConstSchema<S>
  : "type" extends keyof S
  ? S["type"] extends any[]
    ? ParseMixedSchema<S>
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
    ? ParseObjectSchema<S>
    : S["type"] extends "array"
    ? ParseArrSchema<S>
    : M.Never
  : M.Any;
