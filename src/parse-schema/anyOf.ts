import { L } from "ts-toolbelt";
import { M } from "ts-algebra";

import { Get, HasKeyIn, Merge } from "../utils";

import { ParseSchema } from ".";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils";

export type ParseAnyOfSchema<S> = M.Union<
  RecurseOnAnyOfSchema<Get<S, "anyOf">, S>
>;

type RecurseOnAnyOfSchema<S, P, R = never> = {
  stop: R;
  // 🔧 TOIMPROVE: Not cast here
  continue: S extends L.List
    ? RecurseOnAnyOfSchema<
        L.Tail<S>,
        P,
        | R
        | (HasKeyIn<P, "enum" | "const" | "type"> extends true
            ? M.Intersection<
                ParseSchema<Omit<P, "anyOf">>,
                ParseSchema<MergeSubSchema<Omit<P, "anyOf">, L.Head<S>>>
              >
            : ParseSchema<
                Merge<Omit<P, "anyOf">, RemoveInvalidAdditionalItems<L.Head<S>>>
              >)
      >
    : never;
}[S extends [any, ...L.List] ? "continue" : "stop"];
