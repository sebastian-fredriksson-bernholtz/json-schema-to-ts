import { TypeId, Never, $Error } from "..";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { _$Array, ArrayType, ArrayValues } from "../array";
import { TupleType } from "../tuple";
import { UnionType } from "../union";
import { ExclusionType } from "../exclusion";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectTuple } from "./tuple";
import { IntersectUnion } from "./union";
import { IntersectExclusion } from "./exclusion";
import { $ClearIntersections, Intersect } from "./index";

export type ClearArrIntersections<A extends ArrayType> = _$Array<
  $ClearIntersections<ArrayValues<A>>
>;

export type IntersectArray<A extends ArrayType, B> = {
  any: A;
  never: Never;
  const: B extends ConstType ? IntersectConst<B, A> : never;
  enum: B extends EnumType ? IntersectEnum<B, A> : never;
  primitive: Never;
  array: B extends ArrayType ? IntersectArrs<A, B> : never;
  tuple: B extends TupleType ? IntersectTuple<B, A> : never;
  object: Never;
  union: B extends UnionType ? IntersectUnion<B, A> : never;
  exclusion: B extends ExclusionType ? IntersectExclusion<B, A> : never;
  intersection: $Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: $Error<"Missing type property">;
}[B extends { type: TypeId } ? B["type"] : "errorTypeProperty"];

type IntersectArrs<
  A extends ArrayType,
  B extends ArrayType,
  I = Intersect<ArrayValues<A>, ArrayValues<B>>
> = I extends Never ? Never : _$Array<I>;
