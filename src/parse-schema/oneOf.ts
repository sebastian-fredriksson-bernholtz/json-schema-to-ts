import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { JSONSchema7 } from "../definitions";
import { HasKeyIn, Merge } from "../utils";

import { ParseSchema, $ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils";

export type OneOfSchema = { oneOf: JSONSchema7[] };

export type ParseOneOfSchema<
  P extends OneOfSchema,
  O extends ParseSchemaOptions
> = M.$Union<RecurseOnOneOfSchema<P["oneOf"], P, O>>;

type RecurseOnOneOfSchema<
  S extends JSONSchema7[],
  P extends OneOfSchema,
  O extends ParseSchemaOptions,
  R extends any = never
> = {
  stop: R;
  continue: RecurseOnOneOfSchema<
    L.Tail<S>,
    P,
    O,
    | R
    // TOIMPROVE: Directly use ParseAnyOfSchema, ParseEnumSchema etc...
    | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true
        ? M.$Intersect<
            ParseSchema<Omit<P, "oneOf">, O>,
            // TOIMPROVE: Improve MergeSubSchema and use ParseSchema
            $ParseSchema<MergeSubSchema<Omit<P, "oneOf">, L.Head<S>>, O>
          >
        : ParseSchema<
            Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<L.Head<S>>>,
            O
          >)
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
