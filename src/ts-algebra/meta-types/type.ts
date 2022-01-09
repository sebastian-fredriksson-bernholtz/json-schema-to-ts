import { AnyType } from "./any";
import { NeverType } from "./never";
import { ConstType } from "./const";
import { EnumType } from "./enum";
import { PrimitiveType } from "./primitive";
import { ArrType } from "./array";
import { TupleType } from "./tuple";
import { ObjectType } from "./object";
import { UnionType } from "./union";
import { IntersectionType } from "./intersection";
import { ErrorType } from "./error";
import { ExclusionType } from "./exclusion";

export type Type =
  | AnyType
  | NeverType
  | ConstType
  | EnumType
  | PrimitiveType
  | ArrType
  | TupleType
  | ObjectType
  | UnionType
  | IntersectionType
  | ExclusionType
  | ErrorType;
