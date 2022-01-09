import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

// --- ANY ---

const anyToAny: A.Equals<M.Intersect<M.Any, M.Any>, M.Any> = 1;
anyToAny;

// --- NEVER ---

const anyToNever: A.Equals<M.Intersect<M.Any, M.Never>, M.Never> = 1;
anyToNever;

// --- CONSTS ---

const anyToConst: A.Equals<
  M.Intersect<M.Any, M.Const<"foo">>,
  M.Const<"foo">
> = 1;
anyToConst;

// --- ENUM ---

const anyToEnum: A.Equals<
  M.Intersect<M.Any, M.Enum<"foo" | "bar" | 42>>,
  M.Enum<"foo" | "bar" | 42>
> = 1;
anyToEnum;

// --- PRIMITIVES ---

const anyToPrimitive: A.Equals<
  M.Intersect<M.Any, M.Primitive<string>>,
  M.Primitive<string>
> = 1;
anyToPrimitive;

// --- ARRAY ---

const anyToArray: A.Equals<
  M.Intersect<M.Any, M.Arr<M.Primitive<string>>>,
  M.Arr<M.Primitive<string>>
> = 1;
anyToArray;

// --- TUPLE ---

const anyToTuple: A.Equals<
  M.Intersect<M.Any, M.Tuple<[M.Primitive<string>]>>,
  M.Tuple<[M.Primitive<string>]>
> = 1;
anyToTuple;

// --- OBJECT ---

const anyToObject: A.Equals<M.Intersect<M.Any, Object>, Object> = 1;
anyToObject;

// --- UNION ---

const anyToUnion: A.Equals<
  M.Intersect<M.Any, M.Union<M.Const<"foo"> | M.Arr<M.Primitive<number>>>>,
  M.Union<M.Const<"foo"> | M.Arr<M.Primitive<number>>>
> = 1;
anyToUnion;

// --- INTERSECTION ---

const anyToIntersection: A.Equals<
  M.Intersect<M.Any, M.Intersection<M.Enum<"A" | "B">, M.Const<"A">>>,
  M.Intersection<M.Enum<"A" | "B">, M.Const<"A">>
> = 1;
anyToIntersection;

// --- EXCLUSION ---

const anyToExclusion: A.Equals<
  M.Intersect<M.Any, M.Exclusion<M.Any, M.Const<"A">>>,
  M.Exclusion<M.Any, M.Const<"A">>
> = 1;
anyToExclusion;

// --- ERROR ---

const error: A.Equals<M.Intersect<M.Any, M.Error<"Any">>, M.Error<"Any">> = 1;
error;
