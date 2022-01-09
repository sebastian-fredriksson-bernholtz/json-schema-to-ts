import { M } from "ts-algebra";

import { Get, HasKeyIn } from "../utils";

import { ParseSchema } from ".";

export type ParseConstSchema<S> = HasKeyIn<S, "type"> extends true
  ? M.Intersection<M.Const<Get<S, "const">>, ParseSchema<Omit<S, "const">>>
  : M.Const<Get<S, "const">>;
