import { Get } from "../../utils";

export type PrimitiveTypeId = "primitive";

export type Primitive<T> = {
  type: PrimitiveTypeId;
  value: T;
};

export type PrimitiveValue<T> = Get<T, "value">;

export type ResolvePrimitive<T> = PrimitiveValue<T>;
