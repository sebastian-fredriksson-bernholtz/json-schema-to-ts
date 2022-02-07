import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";
import { HasKeyIn } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type NotSchema = {
  not: JSONSchema7;
};

type AllTypes = M.Union<
  | M.Primitive<null>
  | M.Primitive<boolean>
  | M.Primitive<number>
  | M.Primitive<string>
  | M.Array<M.Any>
  | M.Object<{}, never, true, M.Any>
>;

export type ParseNotSchema<
  S extends NotSchema,
  O extends ParseSchemaOptions,
  P extends any = $ParseSchema<Omit<S, "not">, O>,
  // TOIMPROVE: Stating that E extends any causes infinite loop error
  E = M.$Exclude<
    // TOIMPROVE: Directly use ParseAllOfSchema, ParseOneOfSchema etc...
    HasKeyIn<
      S,
      "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf"
    > extends true
      ? P
      : AllTypes,
    // TOIMPROVE: Improve MergeSubSchema and use ParseSchema
    $ParseSchema<MergeSubSchema<Omit<S, "not">, S["not"]>, O>
  >
> = E extends M.Never ? P : E;
