import { Get, Prettify } from "../../utils";

import { Resolve, Any } from ".";

export type ArrayTypeId = "array";

// Prefixed with $ to not confuse with native Array type
export type $Array<V = Any> = {
  type: ArrayTypeId;
  values: V;
};

export type ArrayValues<A> = Get<A, "values">;

export type ResolveArr<T> = Prettify<Resolve<ArrayValues<T>>[]>;
