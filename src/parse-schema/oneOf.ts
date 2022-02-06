import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { Get, HasKeyIn, Merge } from "../utils";

import { ParseSchema } from ".";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils";

export type ParseOneOfSchema<S, O = Get<S, "oneOf">> = O extends any[]
  ? M.$Union<RecurseOnOneOfSchema<O, S>>
  : M.Error<"'oneOf' property should be an array">;

type RecurseOnOneOfSchema<S extends any[], P, R = never> = {
  stop: R;
  continue: RecurseOnOneOfSchema<
    L.Tail<S>,
    P,
    | R
    | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true
        ? M.$Intersect<
            ParseSchema<Omit<P, "oneOf">>,
            ParseSchema<MergeSubSchema<Omit<P, "oneOf">, L.Head<S>>>
          >
        : ParseSchema<
            Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<L.Head<S>>>
          >)
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
