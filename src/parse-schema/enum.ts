import { M } from "ts-algebra";

import { DeepGet, HasKeyIn } from "../utils";

import { ParseSchema } from ".";

export type ParseEnumSchema<S> = HasKeyIn<S, "const" | "type"> extends true
  ? M.$Intersection<
      M.Enum<DeepGet<S, ["enum", number]>>,
      ParseSchema<Omit<S, "enum">>
    >
  : M.Enum<DeepGet<S, ["enum", number]>>;
