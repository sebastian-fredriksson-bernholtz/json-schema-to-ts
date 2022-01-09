import { Get } from "../../utils";

export type ConstType = "const";

export type Const<V> = {
  type: ConstType;
  value: V;
};

export type ConstValue<C> = Get<C, "value">;

export type ResolveConst<T> = ConstValue<T>;
