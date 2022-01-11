import { Get } from "../../../utils";

import { TypeId, Never, Error } from "..";
import { ConstType } from "../const";
import { EnumType } from "../enum";
import { $Array, ArrayValues } from "../array";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectTuple } from "./tuple";
import { IntersectUnion } from "./union";
import { IntersectExclusion } from "./exclusion";
import { ClearIntersections, Intersect } from "./index";

export type ClearArrIntersections<A> = $Array<
  ClearIntersections<ArrayValues<A>>
>;

export type IntersectArr<A, B> = {
  any: A;
  never: Never;
  const: B extends ConstType ? IntersectConst<B, A> : never;
  enum: B extends EnumType ? IntersectEnum<B, A> : never;
  primitive: Never;
  array: IntersectArrs<A, B>;
  tuple: IntersectTuple<B, A>;
  object: Never;
  union: IntersectUnion<B, A>;
  exclusion: IntersectExclusion<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends TypeId ? Get<B, "type"> : "errorTypeProperty"];

type IntersectArrs<
  A,
  B,
  I = Intersect<ArrayValues<A>, ArrayValues<B>>
> = I extends Never ? Never : $Array<I>;
