import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { Exclude } from "ts-algebra/meta-types/exclusion";

// --- ANY ---

const anysAlwaysExclude: A.Equals<Exclude<M.Any, M.Any>, M.Never> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<Exclude<M.Any, M.Never>, M.Any> = 1;
neversNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<Exclude<M.Any, M.Const<"foo">>, M.Any> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  Exclude<M.Any, M.Enum<"foo" | "bar" | 42>>,
  M.Any
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  Exclude<M.Any, M.Primitive<string>>,
  M.Any
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  Exclude<M.Any, M.Arr<M.Primitive<string>>>,
  M.Any
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  Exclude<M.Any, M.Tuple<[M.Primitive<string>]>>,
  M.Any
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<Exclude<M.Any, M.Object>, M.Any> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<M.Any, M.Union<M.Any | M.Arr<M.Primitive<number>>>>,
  M.Never
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<M.Any, M.Union<M.Const<["foo"]> | M.Primitive<number>>>,
  M.Any
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<M.Any, M.Intersection<M.Any, M.Any>>,
  M.Never
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<M.Any, M.Intersection<M.Any, M.Const<"A">>>,
  M.Any
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<M.Any, M.Exclusion<M.Any, M.Const<"A">>>,
  M.Never
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    M.Any,
    M.Exclusion<
      M.Union<M.Primitive<number> | M.Primitive<string>>,
      M.Primitive<string>
    >
  >,
  M.Any
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<Exclude<M.Any, M.Error<"Any">>, M.Error<"Any">> = 1;
error;
