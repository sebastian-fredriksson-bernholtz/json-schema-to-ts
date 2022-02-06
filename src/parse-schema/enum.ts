import { M } from "ts-algebra";

import { DeepGet, HasKeyIn } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";

export type ParseEnumSchema<S, O extends ParseSchemaOptions> = HasKeyIn<
  S,
  "const" | "type"
> extends true
  ? M.$Intersect<
      M.Enum<DeepGet<S, ["enum", number]>>,
      $ParseSchema<Omit<S, "enum">, O>
    >
  : M.Enum<DeepGet<S, ["enum", number]>>;
