import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Never>,
  M.Arr<M.Primitive<string>>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Const<["foo", "bar"]>>,
  M.Arr<M.Primitive<string>>
> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Enum<["foo"] | ["bar"] | 42>>,
  M.Arr<M.Primitive<string>>
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Primitive<string>>,
  M.Arr<M.Primitive<string>>
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const excludingArray: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Arr<M.Primitive<string>>>,
  M.Const<[]>
> = 1;
excludingArray;

const nonExcludingArray1: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Arr<M.Primitive<number>>>,
  M.Arr<M.Primitive<string>>
> = 1;
nonExcludingArray1;

const nonExcludingArray2: A.Equals<
  M.Exclude<
    M.Arr<M.Union<M.Primitive<string> | M.Primitive<number>>>,
    M.Arr<M.Primitive<number>>
  >,
  M.Arr<M.Union<M.Primitive<string> | M.Primitive<number>>>
> = 1;
nonExcludingArray2;

// --- TUPLE ---

const excludingTuple: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Tuple<[], true, M.Primitive<string>>>,
  M.Const<[]>
> = 1;
excludingTuple;

const nonExcludingTuple1: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Tuple<[M.Primitive<string>]>>,
  M.Arr<M.Primitive<string>>
> = 1;
nonExcludingTuple1;

const nonExcludingTuple2: A.Equals<
  M.Exclude<
    M.Arr<M.Union<M.Primitive<string> | M.Primitive<number>>>,
    M.Tuple<[], true, M.Primitive<number>>
  >,
  M.Arr<M.Union<M.Primitive<string> | M.Primitive<number>>>
> = 1;
nonExcludingTuple2;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  M.Exclude<
    M.Arr<M.Primitive<string>>,
    M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>
  >,
  M.Arr<M.Primitive<string>>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Arr<M.Primitive<string>>,
    M.Union<M.Arr<M.Primitive<string>> | M.Arr<M.Primitive<number>>>
  >,
  M.Const<[]>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  M.Exclude<
    M.Arr<M.Primitive<string>>,
    M.Union<M.Const<["foo"]> | M.Arr<M.Primitive<number>>>
  >,
  M.Arr<M.Primitive<string>>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Arr<M.Primitive<string>>,
    M.Intersection<
      M.Arr<M.Primitive<string>>,
      M.Arr<M.Union<M.Primitive<string> | M.Primitive<number>>>
    >
  >,
  M.Const<[]>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<
    M.Arr<M.Primitive<string>>,
    M.Intersection<M.Arr<M.Primitive<string>>, M.Arr<M.Const<"A">>>
  >,
  M.Arr<M.Primitive<string>>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Arr<M.Const<"foo">>,
    M.Exclusion<M.Arr<M.Primitive<string>>, M.Const<[]>>
  >,
  M.Const<[]>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Arr<M.Primitive<string>>,
    M.Exclusion<M.Arr<M.Primitive<number>>, M.Arr<M.Const<42>>>
  >,
  M.Arr<M.Primitive<string>>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  M.Exclude<M.Arr<M.Primitive<string>>, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;
