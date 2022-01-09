import { L } from "ts-toolbelt";
import { M } from "ts-algebra";

import { Get, HasKeyIn } from "../utils";

import { ParseSchema } from ".";
import { MergeSubSchema } from "./utils";

export type ParseAllOfSchema<S> = RecurseOnAllOfSchema<
  Get<S, "allOf">,
  S,
  HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf"> extends true
    ? ParseSchema<Omit<S, "allOf">>
    : M.Any
>;

type RecurseOnAllOfSchema<V, S, R> = {
  stop: R;
  continue: V extends L.List
    ? RecurseOnAllOfSchema<
        L.Tail<V>,
        S,
        M.Intersection<
          ParseSchema<MergeSubSchema<Omit<S, "allOf">, L.Head<V>>>,
          R
        >
      >
    : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];
