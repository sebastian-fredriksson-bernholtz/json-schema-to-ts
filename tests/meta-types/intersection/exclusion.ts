import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { Intersect } from "ts-algebra/meta-types/intersection";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  Intersect<M.Exclusion<M.Primitive<string>, M.Const<"bar">>, M.Any>,
  M.Exclusion<M.Primitive<string>, M.Const<"bar">>
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  Intersect<M.Exclusion<M.Primitive<string>, M.Const<"bar">>, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  Intersect<M.Exclusion<M.Primitive<string>, M.Const<"bar">>, M.Const<"foo">>,
  M.Exclusion<M.Const<"foo">, M.Const<"bar">>
> = 1;
intersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  Intersect<
    M.Exclusion<M.Primitive<string>, M.Enum<"foo" | "bar">>,
    M.Enum<"foo" | "bar" | "baz" | 42>
  >,
  M.Exclusion<M.Enum<"foo" | "bar" | "baz">, M.Enum<"bar" | "foo">>
> = 1;
intersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  Intersect<
    M.Exclusion<M.Enum<"foo" | 42 | true>, M.Primitive<number>>,
    M.Primitive<string>
  >,
  M.Exclusion<M.Enum<"foo">, M.Primitive<number>>
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  Intersect<M.Exclusion<M.Primitive<number>, M.Const<42>>, M.Primitive<number>>,
  M.Exclusion<M.Primitive<number>, M.Const<42>>
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  Intersect<
    M.Exclusion<M.Arr<M.Primitive<string>>, M.Const<[]>>,
    M.Arr<M.Const<"foo">>
  >,
  M.Exclusion<M.Arr<M.Const<"foo">>, M.Const<[]>>
> = 1;
intersectingArray;

// --- TUPLE ---

const intersectingTuple: A.Equals<
  Intersect<
    M.Exclusion<M.Tuple<[M.Primitive<string>]>, M.Const<[]>>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Exclusion<
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>,
    M.Const<[]>
  >
> = 1;
intersectingTuple;

// --- OBJECT ---

const intersectingObject: A.Equals<
  Intersect<
    M.Exclusion<
      M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>,
      M.Const<{ foo: "bar" }>
    >,
    M.Object<{ baz: M.Primitive<string> }, "baz", true>
  >,
  M.Exclusion<
    M.Object<
      { foo: M.Primitive<string>; baz: M.Primitive<string> },
      "foo" | "baz",
      true,
      M.Primitive<string>
    >,
    M.Const<{ foo: "bar" }>
  >
> = 1;
intersectingObject;

// --- UNION ---

const intersectingUnion: A.Equals<
  Intersect<
    M.Exclusion<M.Enum<42 | true | "foo" | "bar">, M.Primitive<number>>,
    M.Union<M.Const<"foo"> | M.Primitive<boolean>>
  >,
  M.Union<
    | M.Exclusion<M.Const<"foo">, M.Primitive<number>>
    | M.Exclusion<M.Enum<true>, M.Primitive<number>>
  >
> = 1;
intersectingUnion;

// --- INTERSECTION ---

const cannotIntersectIntersection: A.Equals<
  Intersect<
    M.Exclusion<M.Primitive<string>, M.Const<"foo">>,
    M.Intersection<M.Primitive<string>, M.Enum<"foo" | "bar">>
  >,
  M.Error<"Cannot intersect intersection">
> = 1;
cannotIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  Intersect<
    M.Exclusion<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
      M.Const<"A">
    >,
    M.Exclusion<M.Enum<"B" | "C">, M.Const<"B">>
  >,
  M.Exclusion<
    M.Union<M.Never | M.Const<"B"> | M.Const<"C">>,
    M.Union<M.Const<"A"> | M.Const<"B">>
  >
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  Intersect<M.Exclusion<M.Primitive<string>, M.Const<"foo">>, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;
