import { Get } from "../../utils";

export type ConstTypeId = "const";

export type Const<V> = {
  type: ConstTypeId;
  value: V;
};

export type ConstValue<C> = Get<C, "value">;

export type ResolveConst<T> = ConstValue<T>;
