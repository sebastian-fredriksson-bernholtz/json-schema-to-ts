import { Const, Intersection } from "ts-algebra";

import { Get, HasKeyIn } from "../utils";

import { ParseSchema } from ".";

export type ParseConstSchema<S> = HasKeyIn<S, "type"> extends true
  ? Intersection<Const<Get<S, "const">>, ParseSchema<Omit<S, "const">>>
  : Const<Get<S, "const">>;
