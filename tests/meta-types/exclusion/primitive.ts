import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { Exclude } from "ts-algebra/meta-types/exclusion";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  Exclude<M.Primitive<string>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<M.Primitive<string>, M.Never>,
  M.Primitive<string>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<
  Exclude<M.Primitive<string>, M.Const<"A">>,
  M.Primitive<string>
> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  Exclude<M.Primitive<string>, M.Enum<"A" | "B">>,
  M.Primitive<string>
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  Exclude<M.Primitive<string>, M.Primitive<string>>,
  M.Never
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  Exclude<M.Primitive<string>, M.Primitive<number>>,
  M.Primitive<string>
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  Exclude<M.Primitive<string>, M.Arr<M.Primitive<string>>>,
  M.Primitive<string>
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  Exclude<M.Primitive<string>, M.Tuple<[], true, M.Primitive<string>>>,
  M.Primitive<string>
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  Exclude<M.Primitive<string>, M.Object>,
  M.Primitive<string>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    M.Primitive<string>,
    M.Union<M.Primitive<string> | M.Primitive<number>>
  >,
  M.Never
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<M.Primitive<string>, M.Union<M.Const<"C"> | M.Primitive<number>>>,
  M.Primitive<string>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    M.Primitive<string>,
    M.Intersection<
      M.Union<M.Primitive<string> | M.Primitive<number>>,
      M.Primitive<string>
    >
  >,
  M.Never
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<M.Primitive<string>, M.Union<M.Const<"C"> | M.Primitive<number>>>,
  M.Primitive<string>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<M.Primitive<string>, M.Exclusion<M.Primitive<string>, M.Const<"B">>>,
  M.Never
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    M.Primitive<string>,
    M.Exclusion<
      M.Union<M.Primitive<string> | M.Primitive<number>>,
      M.Primitive<string>
    >
  >,
  M.Primitive<string>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  Exclude<M.Primitive<string>, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;
