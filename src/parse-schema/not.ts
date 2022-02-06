import { M } from "ts-algebra";

import { Get, HasKeyIn } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

type AllTypes = M.Union<
  | M.Primitive<null>
  | M.Primitive<boolean>
  | M.Primitive<number>
  | M.Primitive<string>
  | M.Array<M.Any>
  | M.Object<{}, never, true, M.Any>
>;

export type ParseNotSchema<
  S,
  O extends ParseSchemaOptions,
  P = $ParseSchema<Omit<S, "not">, O>,
  E = M.$Exclude<
    HasKeyIn<
      S,
      "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf"
    > extends true
      ? P
      : AllTypes,
    $ParseSchema<MergeSubSchema<Omit<S, "not">, Get<S, "not">>, O>
  >
> = E extends M.Never ? P : E;

