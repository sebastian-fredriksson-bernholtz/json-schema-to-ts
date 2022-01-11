import { Get } from "../../../utils";

import { TypeId, Never, Const, Error } from "..";
import { ConstType } from "../const";
import { Enum, EnumType, EnumValues } from "../enum";

import { IntersectConst } from "./const";
import { IntersectUnion } from "./union";
import { IntersectExclusion } from "./exclusion";
import { Intersect } from "./index";

export type IntersectEnum<A extends EnumType, B> = {
  any: A;
  never: Never;
  const: B extends ConstType ? IntersectConst<B, A> : never;
  enum: FilterUnintersecting<A, B>;
  primitive: FilterUnintersecting<A, B>;
  array: FilterUnintersecting<A, B>;
  tuple: FilterUnintersecting<A, B>;
  object: FilterUnintersecting<A, B>;
  union: IntersectUnion<B, A>;
  exclusion: IntersectExclusion<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends TypeId ? Get<B, "type"> : "errorTypeProperty"];

type FilterUnintersecting<A extends EnumType, B> = Enum<
  RecurseOnEnumValues<EnumValues<A>, B>
>;

type RecurseOnEnumValues<V, B> = V extends infer T
  ? Intersect<Const<T>, B> extends Never
    ? never
    : T
  : never;
