import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { Get, DeepMergeUnsafe } from "../utils";

import { ParseSchema } from ".";

export type ParseMixedSchema<S, T = Get<S, "type">> = T extends any[]
  ? M.$Union<RecurseOnMixedSchema<T, S>>
  : M.Error<"Mixed schema 'type' property should be an array">;

type RecurseOnMixedSchema<T extends any[], S, R = never> = {
  stop: R;
  continue: RecurseOnMixedSchema<
    L.Tail<T>,
    S,
    R | ParseSchema<DeepMergeUnsafe<S, { type: L.Head<T> }>>
  >;
}[T extends [any, ...any[]] ? "continue" : "stop"];
