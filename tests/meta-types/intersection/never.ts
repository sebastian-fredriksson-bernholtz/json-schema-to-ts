import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { Intersect } from "ts-algebra/meta-types/intersection";

// --- ANY ---

const neverToAny: A.Equals<Intersect<M.Never, M.Any>, M.Never> = 1;
neverToAny;

// --- NEVER ---

const neverToNever: A.Equals<Intersect<M.Never, M.Never>, M.Never> = 1;
neverToNever;

// --- CONSTS ---

const neverToConst: A.Equals<Intersect<M.Never, M.Const<"foo">>, M.Never> = 1;
neverToConst;

// --- ENUM ---

const neverToEnum: A.Equals<
  Intersect<M.Never, M.Enum<"foo" | "bar" | 42>>,
  M.Never
> = 1;
neverToEnum;

// --- PRIMITIVES ---

const neverToPrimitive: A.Equals<
  Intersect<M.Never, M.Primitive<string>>,
  M.Never
> = 1;
neverToPrimitive;

// --- ARRAY ---

const neverToArray: A.Equals<
  Intersect<M.Never, M.Arr<M.Primitive<string>>>,
  M.Never
> = 1;
neverToArray;

// --- TUPLE ---

const neverToTuple: A.Equals<
  Intersect<M.Never, M.Tuple<[M.Primitive<string>]>>,
  M.Never
> = 1;
neverToTuple;

// --- OBJECT ---

const neverToObject: A.Equals<Intersect<M.Never, M.Object>, M.Never> = 1;
neverToObject;

// --- UNION ---

const neverToUnion: A.Equals<
  Intersect<M.Never, M.Union<M.Any | M.Arr<M.Primitive<number>>>>,
  M.Never
> = 1;
neverToUnion;

// --- INTERSECTION ---

const neverToIntersection: A.Equals<
  Intersect<M.Never, M.Intersection<M.Any, M.Any>>,
  M.Never
> = 1;
neverToIntersection;

// --- EXCLUSION ---

const neverToExclusion: A.Equals<
  Intersect<M.Never, M.Exclusion<M.Any, M.Const<"A">>>,
  M.Never
> = 1;
neverToExclusion;

// --- ERROR ---

const error: A.Equals<Intersect<M.Never, M.Error<"Any">>, M.Error<"Any">> = 1;
error;
