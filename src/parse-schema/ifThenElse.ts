import { M } from "ts-algebra";

import { ParseSchema } from "../parse-schema";
import { HasKeyIn } from "../utils";

import { MergeSubSchema } from "./utils";

export type ParseIfThenElseSchema<
  S,
  R = Omit<S, "if" | "then" | "else">,
  I = "if" extends keyof S ? MergeSubSchema<R, S["if"]> : never,
  T = "then" extends keyof S
    ? M.$Intersect<ParseSchema<I>, ParseSchema<MergeSubSchema<R, S["then"]>>>
    : ParseSchema<I>,
  E = M.$Exclude<
    "else" extends keyof S
      ? ParseSchema<MergeSubSchema<R, S["else"]>>
      : ParseSchema<R>,
    ParseSchema<I>
  >
> = HasKeyIn<
  S,
  "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf" | "not"
> extends true
  ? M.$Intersect<M.$Union<T | E>, ParseSchema<R>>
  : M.$Union<T | E>;

type ApplyIfThenElse<
  S,
  R,
  I = "if" extends keyof S ? MergeSubSchema<R, S["if"]> : never
> = M.$Union<
  | ("then" extends keyof S
      ? M.$Intersection<
          ParseSchema<I>,
          ParseSchema<MergeSubSchema<R, S["then"]>>
        >
      : ParseSchema<I>)
  | M.$Exclusion<
      "else" extends keyof S
        ? ParseSchema<MergeSubSchema<R, S["else"]>>
        : ParseSchema<R>,
      ParseSchema<I>
    >
>;
