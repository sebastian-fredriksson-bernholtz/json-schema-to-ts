export type ConstTypeId = "const";

export type Const<V extends any> = {
  type: ConstTypeId;
  value: V;
};

export type ConstType = {
  type: ConstTypeId;
  value: any;
};

export type ConstValue<C extends ConstType> = C["value"];

export type ResolveConst<T extends ConstType> = ConstValue<T>;
