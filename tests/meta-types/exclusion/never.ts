import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { Exclude } from "ts-algebra/meta-types/exclusion";

// --- ANY ---

const anNeverExclude: A.Equals<Exclude<M.Never, M.Any>, M.Never> = 1;
anNeverExclude;

// --- NEVER ---

const neveNeverExclude: A.Equals<Exclude<M.Never, M.Never>, M.Never> = 1;
neveNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<
  Exclude<M.Never, M.Const<"foo">>,
  M.Never
> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  Exclude<M.Never, M.Enum<"foo" | "bar" | 42>>,
  M.Never
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  Exclude<M.Never, M.Primitive<string>>,
  M.Never
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  Exclude<M.Never, M.Arr<M.Primitive<string>>>,
  M.Never
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  Exclude<M.Never, M.Tuple<[M.Primitive<string>]>>,
  M.Never
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<Exclude<M.Never, Object>, M.Never> = 1;
objectsNeverExclude;

// --- UNION ---

const unionsNeverExclude: A.Equals<
  Exclude<M.Never, M.Union<M.Any | M.Arr<M.Primitive<number>>>>,
  M.Never
> = 1;
unionsNeverExclude;

// --- INTERSECTION ---

const intersectionsNeverExclude: A.Equals<
  Exclude<M.Never, M.Intersection<M.Any, M.Any>>,
  M.Never
> = 1;
intersectionsNeverExclude;

// --- EXCLUSION ---

const exclusionsNeverExclude: A.Equals<
  Exclude<M.Never, M.Exclusion<M.Any, M.Const<"A">>>,
  M.Never
> = 1;
exclusionsNeverExclude;

// --- ERROR ---

const error: A.Equals<Exclude<M.Any, M.Error<"Any">>, M.Error<"Any">> = 1;
error;
