import { TypeId, Never, Const, Error } from "..";
import { ConstType } from "../const";
import { Enum, EnumType, EnumValues } from "../enum";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";

import { IntersectConst } from "./const";
import { IntersectUnion } from "./union";
import { IntersectExclusion } from "./exclusion";
import { $Intersect } from "./index";

export type IntersectEnum<A extends EnumType, B> = {
  any: A;
  never: Never;
  const: B extends ConstType ? IntersectConst<B, A> : never;
  enum: FilterUnintersecting<A, B>;
  primitive: FilterUnintersecting<A, B>;
  array: FilterUnintersecting<A, B>;
  tuple: FilterUnintersecting<A, B>;
  object: FilterUnintersecting<A, B>;
  union: B extends UnionType ? IntersectUnion<B, A> : never;
  exclusion: B extends ExclusionType ? IntersectExclusion<B, A> : never;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

type FilterUnintersecting<A extends EnumType, B> = Enum<
  RecurseOnEnumValues<EnumValues<A>, B>
>;

type RecurseOnEnumValues<V, B> = V extends infer T
  ? $Intersect<Const<T>, B> extends Never
    ? never
    : T
  : never;
