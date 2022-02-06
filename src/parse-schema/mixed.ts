import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { Get, DeepMergeUnsafe } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";

export type ParseMixedSchema<
  S,
  O extends ParseSchemaOptions,
  T = Get<S, "type">
> = T extends any[]
  ? M.$Union<RecurseOnMixedSchema<T, S, O>>
  : M.Error<"Mixed schema 'type' property should be an array">;

type RecurseOnMixedSchema<
  T extends any[],
  S,
  O extends ParseSchemaOptions,
  R = never
> = {
  stop: R;
  continue: RecurseOnMixedSchema<
    L.Tail<T>,
    S,
    O,
    R | $ParseSchema<DeepMergeUnsafe<S, { type: L.Head<T> }>, O>
  >;
}[T extends [any, ...any[]] ? "continue" : "stop"];
