import { M } from "ts-algebra";

import { Get, HasKeyIn } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";

export type ParseConstSchema<S, O extends ParseSchemaOptions> = HasKeyIn<
  S,
  "type"
> extends true
  ? M.$Intersect<M.Const<Get<S, "const">>, $ParseSchema<Omit<S, "const">, O>>
  : M.Const<Get<S, "const">>;
