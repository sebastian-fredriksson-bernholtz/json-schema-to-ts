import { M } from "ts-algebra";

import { HasKeyIn } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type ParseIfThenElseSchema<
  S,
  O extends ParseSchemaOptions,
  R = Omit<S, "if" | "then" | "else">,
  I = "if" extends keyof S ? MergeSubSchema<R, S["if"]> : never,
  T = "then" extends keyof S
    ? M.$Intersect<
        $ParseSchema<I, O>,
        $ParseSchema<MergeSubSchema<R, S["then"]>, O>
      >
    : $ParseSchema<I, O>,
  E = M.$Exclude<
    "else" extends keyof S
      ? $ParseSchema<MergeSubSchema<R, S["else"]>, O>
      : $ParseSchema<R, O>,
    $ParseSchema<I, O>
  >
> = HasKeyIn<
  S,
  "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf" | "not"
> extends true
  ? M.$Intersect<M.$Union<T | E>, $ParseSchema<R, O>>
  : M.$Union<T | E>;
