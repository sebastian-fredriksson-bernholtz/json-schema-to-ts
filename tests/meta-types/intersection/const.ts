import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { Intersect } from "ts-algebra/meta-types/intersection";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  Intersect<M.Const<"foo">, M.Any>,
  M.Const<"foo">
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  Intersect<M.Const<"foo">, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  Intersect<M.Const<"foo">, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  Intersect<M.Const<"foo">, M.Const<"bar">>,
  M.Never
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  Intersect<M.Const<"foo">, M.Enum<"foo" | "bar" | "baz">>,
  M.Const<"foo">
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  Intersect<M.Const<"foo">, M.Enum<"bar" | "baz">>,
  M.Never
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  Intersect<M.Const<"foo">, M.Primitive<string>>,
  M.Const<"foo">
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  Intersect<M.Const<"foo">, M.Primitive<boolean>>,
  M.Never
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  Intersect<M.Const<["foo", "bar"]>, M.Arr<M.Primitive<string>>>,
  M.Const<["foo", "bar"]>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  Intersect<M.Const<"foo">, M.Arr<M.Primitive<string>>>,
  M.Never
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  Intersect<
    M.Const<["foo", "bar"]>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Const<["foo", "bar"]>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  Intersect<
    M.Const<["foo", 42, "bar"]>,
    M.Tuple<
      [M.Primitive<string>, M.Primitive<number>],
      true,
      M.Primitive<string>
    >
  >,
  M.Const<["foo", 42, "bar"]>
> = 1;
intersectingTuple2;

const nonIntersectingTuple1: A.Equals<
  Intersect<
    M.Const<["foo", 42]>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingTuple1;

const nonIntersectingTuple2: A.Equals<
  Intersect<
    M.Const<"foo">,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingTuple2;

// --- OBJECT ---

const intersectingObject: A.Equals<
  Intersect<
    M.Const<{ foo: "bar" }>,
    M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>
  >,
  M.Const<{ foo: "bar" }>
> = 1;
intersectingObject;

const nonIntersectingObject: A.Equals<
  Intersect<
    M.Const<"foo">,
    M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>
  >,
  M.Never
> = 1;
nonIntersectingObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  Intersect<M.Const<"foo">, M.Union<M.Primitive<string> | M.Primitive<number>>>,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  Intersect<M.Const<"foo">, M.Union<M.Const<"foo"> | M.Primitive<number>>>,
  M.Union<M.Const<"foo"> | M.Never>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  Intersect<
    M.Const<"foo">,
    M.Union<M.Primitive<number> | M.Arr<M.Primitive<string>>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const cannonIntersectIntersection: A.Equals<
  Intersect<
    M.Const<"foo">,
    M.Intersection<M.Const<"foo">, M.Primitive<string>>
  >,
  M.Error<"Cannot intersect intersection">
> = 1;
cannonIntersectIntersection;

// --- EXCLUSION ---

const intersectsExclusionValue: A.Equals<
  Intersect<M.Const<"foo">, M.Exclusion<M.Primitive<string>, M.Const<"bar">>>,
  M.Exclusion<M.Const<"foo">, M.Const<"bar">>
> = 1;
intersectsExclusionValue;

// --- ERROR ---

const error: A.Equals<
  Intersect<M.Const<"foo">, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;
