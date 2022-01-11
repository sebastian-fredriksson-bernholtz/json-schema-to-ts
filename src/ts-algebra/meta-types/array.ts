import { Prettify } from "../../utils";

import { Resolve, Any } from ".";
import { Type } from "./type";

export type ArrayTypeId = "array";

// Prefixed with $ to not confuse with native Array type
export type $Array<V = Any> = {
  type: ArrayTypeId;
  values: V;
};

export type ArrayType = {
  type: ArrayTypeId;
  values: Type;
};

export type ArrayValues<A extends ArrayType> = A["values"];

export type ResolveArray<T extends ArrayType> = Prettify<
  Resolve<ArrayValues<T>>[]
>;
