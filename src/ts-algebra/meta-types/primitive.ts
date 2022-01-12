export type PrimitiveTypeId = "primitive";

export type Primitive<T extends null | boolean | number | string> = {
  type: PrimitiveTypeId;
  value: T;
};

export type $Primitive<T> = {
  type: PrimitiveTypeId;
  value: T;
};

export type PrimitiveType = {
  type: PrimitiveTypeId;
  value: null | boolean | number | string;
};

export type PrimitiveValue<T extends PrimitiveType> = T["value"];

export type ResolvePrimitive<T extends PrimitiveType> = PrimitiveValue<T>;
