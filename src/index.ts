import { M } from "ts-algebra";
import { A, O } from "ts-toolbelt";
import { JSONSchema6Definition } from "json-schema";

import {
  JSONSchema6DefinitionWithoutInterface,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "./definitions";
import { ParseSchema } from "./parse-schema";

export { FromSchemaOptions, FromSchemaDefaultOptions } from "./definitions";

/**
 * Unwided JSON schema (e.g. defined with the `as const` statement)
 */
export type JSONSchema =
  | JSONSchema6Definition
  | boolean
  | O.Readonly<
      Exclude<JSONSchema6DefinitionWithoutInterface, boolean>,
      A.Key,
      "deep"
    >;

/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * @param S JSON schema
 */
export type FromSchema<
  S extends JSONSchema,
  O extends FromSchemaOptions = FromSchemaDefaultOptions
> = M.$Resolve<
  ParseSchema<S extends object ? O.Writable<S, string, "deep"> : S, O>
>;
