import { AnyType } from "./any";
import { NeverType } from "./never";
import { ConstType } from "./const";
import { EnumType } from "./enum";
import { PrimitiveType } from "./primitive";

export type Type = AnyType | NeverType | ConstType | EnumType | PrimitiveType;
