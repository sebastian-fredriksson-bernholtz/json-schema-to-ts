import { JSONSchema7TypeName } from "json-schema";
import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { DeepMergeUnsafe } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";

export type MultipleTypesSchema = { type: JSONSchema7TypeName[] };

export type ParseMultipleTypesSchema<
  P extends MultipleTypesSchema,
  O extends ParseSchemaOptions
> = M.$Union<RecurseOnMixedSchema<P["type"], P, O>>;

type RecurseOnMixedSchema<
  S extends JSONSchema7TypeName[],
  P extends MultipleTypesSchema,
  O extends ParseSchemaOptions,
  R extends any = never
> = {
  stop: R;
  continue: RecurseOnMixedSchema<
    L.Tail<S>,
    P,
    O,
    // TOIMPROVE: Improve DeepMergeUnsafe & use ParseSchema
    R | $ParseSchema<DeepMergeUnsafe<P, { type: L.Head<S> }>, O>
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
