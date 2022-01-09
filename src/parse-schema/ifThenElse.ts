import { M } from "ts-algebra";

import { ParseSchema } from "../parse-schema";
import { HasKeyIn } from "../utils";

import { MergeSubSchema } from "./utils";

export type ParseIfThenElseSchema<
  S,
  R = Omit<S, "if" | "then" | "else">
> = HasKeyIn<
  S,
  "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf" | "not"
> extends true
  ? M.Intersection<ApplyIfThenElse<S, R>, ParseSchema<R>>
  : ApplyIfThenElse<S, R>;

type ApplyIfThenElse<
  S,
  R,
  I = "if" extends keyof S ? MergeSubSchema<R, S["if"]> : never
> = M.Union<
  | ("then" extends keyof S
      ? M.Intersection<
          ParseSchema<I>,
          ParseSchema<MergeSubSchema<R, S["then"]>>
        >
      : ParseSchema<I>)
  | M.Exclusion<
      "else" extends keyof S
        ? ParseSchema<MergeSubSchema<R, S["else"]>>
        : ParseSchema<R>,
      ParseSchema<I>
    >
>;
