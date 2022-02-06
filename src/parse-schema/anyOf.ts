import { L } from "ts-toolbelt";
import { M } from "ts-algebra";

import { Get, HasKeyIn, Merge } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils";

export type ParseAnyOfSchema<S, O extends ParseSchemaOptions> = M.$Union<
  RecurseOnAnyOfSchema<Get<S, "anyOf">, S, O>
>;

type RecurseOnAnyOfSchema<S, P, O extends ParseSchemaOptions, R = never> = {
  stop: R;
  // 🔧 TOIMPROVE: Not cast here
  continue: S extends any[]
    ? RecurseOnAnyOfSchema<
        L.Tail<S>,
        P,
        O,
        | R
        | (HasKeyIn<P, "enum" | "const" | "type"> extends true
            ? M.$Intersect<
                $ParseSchema<Omit<P, "anyOf">, O>,
                $ParseSchema<MergeSubSchema<Omit<P, "anyOf">, L.Head<S>>, O>
              >
            : $ParseSchema<
                Merge<
                  Omit<P, "anyOf">,
                  RemoveInvalidAdditionalItems<L.Head<S>>
                >,
                O
              >)
      >
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
