import { L } from "ts-toolbelt";
import { M } from "ts-algebra";

import { Get, HasKeyIn } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type ParseAllOfSchema<
  S,
  O extends ParseSchemaOptions
> = RecurseOnAllOfSchema<
  Get<S, "allOf">,
  S,
  O,
  HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf"> extends true
    ? $ParseSchema<Omit<S, "allOf">, O>
    : M.Any
>;

type RecurseOnAllOfSchema<V, S, O extends ParseSchemaOptions, R> = {
  stop: R;
  continue: V extends any[]
    ? RecurseOnAllOfSchema<
        L.Tail<V>,
        S,
        O,
        M.$Intersect<
          $ParseSchema<MergeSubSchema<Omit<S, "allOf">, L.Head<V>>, O>,
          R
        >
      >
    : never;
}[V extends [any, ...any[]] ? "continue" : "stop"];
