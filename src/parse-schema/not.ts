import { M } from "ts-algebra";

import { Get, HasKeyIn } from "../utils";

import { ParseSchema } from ".";
import { MergeSubSchema } from "./utils";

type AllTypes = M.Union<
  | M.Primitive<null>
  | M.Primitive<boolean>
  | M.Primitive<number>
  | M.Primitive<string>
  | M.Arr<M.Any>
  | M.Object
>;

export type ParseNotSchema<
  S,
  P = ParseSchema<Omit<S, "not">>,
  E = M.Exclusion<
    HasKeyIn<
      S,
      "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf"
    > extends true
      ? P
      : AllTypes,
    ParseSchema<MergeSubSchema<Omit<S, "not">, Get<S, "not">>>
  >
> = M.IsRepresentable<E> extends true ? E : P;
