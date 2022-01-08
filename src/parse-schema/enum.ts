import { Enum, Intersection } from "ts-algebra";

import { DeepGet, HasKeyIn } from "../utils";

import { ParseSchema } from ".";

export type ParseEnumSchema<S> = HasKeyIn<S, "const" | "type"> extends true
  ? Intersection<
      Enum<DeepGet<S, ["enum", number]>>,
      ParseSchema<Omit<S, "enum">>
    >
  : Enum<DeepGet<S, ["enum", number]>>;
