import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { Get, HasKeyIn, Merge } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils";

export type ParseOneOfSchema<
  P,
  O extends ParseSchemaOptions,
  S = Get<P, "oneOf">
> = S extends any[]
  ? M.$Union<RecurseOnOneOfSchema<S, P, O>>
  : M.Error<"'oneOf' property should be an array">;

type RecurseOnOneOfSchema<
  S extends any[],
  P,
  O extends ParseSchemaOptions,
  R = never
> = {
  stop: R;
  continue: RecurseOnOneOfSchema<
    L.Tail<S>,
    P,
    O,
    | R
    | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true
        ? M.$Intersect<
            $ParseSchema<Omit<P, "oneOf">, O>,
            $ParseSchema<MergeSubSchema<Omit<P, "oneOf">, L.Head<S>>, O>
          >
        : $ParseSchema<
            Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<L.Head<S>>>,
            O
          >)
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
