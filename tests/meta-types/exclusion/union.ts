import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { Exclude } from "ts-algebra/meta-types/exclusion";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  Exclude<M.Union<M.Const<"A"> | M.Const<"B">>, M.Any>,
  M.Union<M.Never>
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<M.Union<M.Const<"B"> | M.Const<"A">>, M.Never>,
  M.Union<M.Const<"B"> | M.Const<"A">>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  Exclude<M.Union<M.Const<"A"> | M.Const<"B">>, M.Const<"B">>,
  M.Union<M.Const<"A"> | M.Never>
> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  Exclude<M.Union<M.Const<"A"> | M.Const<"B">>, M.Const<"C">>,
  M.Union<M.Const<"A"> | M.Const<"B">>
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  Exclude<M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<42>>, M.Enum<"B" | 42>>,
  M.Union<M.Const<"A"> | M.Never>
> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  Exclude<M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<42>>, M.Enum<"C" | 43>>,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<42>>
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  Exclude<
    M.Union<M.Primitive<string> | M.Primitive<number>>,
    M.Primitive<number>
  >,
  M.Union<M.Primitive<string> | M.Never>
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  Exclude<
    M.Union<M.Primitive<string> | M.Primitive<number>>,
    M.Primitive<boolean>
  >,
  M.Union<M.Primitive<string> | M.Primitive<number>>
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray: A.Equals<
  Exclude<
    M.Union<M.Arr<M.Primitive<string>> | M.Arr<M.Primitive<number>>>,
    M.Arr<M.Primitive<number>>
  >,
  M.Union<M.Arr<M.Primitive<string>> | M.Const<[]>>
> = 1;
excludingArray;

const nonExcludingArray: A.Equals<
  Exclude<
    M.Union<M.Arr<M.Primitive<string>> | M.Arr<M.Primitive<number>>>,
    M.Arr<M.Primitive<boolean>>
  >,
  M.Union<M.Arr<M.Primitive<string>> | M.Arr<M.Primitive<number>>>
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple: A.Equals<
  Exclude<
    M.Union<
      | M.Tuple<[M.Primitive<string>], false>
      | M.Tuple<[M.Primitive<number>], false>
    >,
    M.Tuple<[M.Primitive<number>], false>
  >,
  M.Union<M.Tuple<[M.Primitive<string>], false, M.Never> | M.Never>
> = 1;
excludingTuple;

const nonExcludingTuple: A.Equals<
  Exclude<
    M.Union<
      | M.Tuple<[M.Primitive<string>], false>
      | M.Tuple<[M.Primitive<number>], false>
    >,
    M.Tuple<[M.Primitive<boolean>], false>
  >,
  M.Union<
    | M.Tuple<[M.Primitive<string>], false, M.Never>
    | M.Tuple<[M.Primitive<number>], false, M.Never>
  >
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const excludingObject: A.Equals<
  Exclude<
    M.Union<
      | M.Object<{ a: M.Primitive<string> }, "a", false>
      | M.Object<{ a: M.Primitive<number> }, "a", false>
    >,
    M.Object<{ a: M.Primitive<number> }, "a", false>
  >,
  M.Union<M.Object<{ a: M.Primitive<string> }, "a", false> | M.Never>
> = 1;
excludingObject;

const nonExcludingObject: A.Equals<
  Exclude<
    M.Union<
      | M.Object<{ a: M.Primitive<string> }, "a", false>
      | M.Object<{ a: M.Primitive<number> }, "a", false>
    >,
    M.Object<{ a: M.Primitive<boolean> }, "a", false>
  >,
  M.Union<
    | M.Object<{ a: M.Primitive<string> }, "a", false>
    | M.Object<{ a: M.Primitive<number> }, "a", false>
  >
> = 1;
nonExcludingObject;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Enum<"C" | 42>>,
    M.Union<M.Enum<"B" | "C"> | M.Const<42>>
  >,
  M.Union<M.Const<"A"> | M.Never | M.Enum<never>>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Enum<"C" | 42>>,
    M.Union<M.Enum<"D" | "E"> | M.Const<43>>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Enum<"C" | 42>>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
    M.Intersection<M.Enum<"C" | "D">, M.Const<"D">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Never>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
    M.Intersection<M.Enum<"D" | "E">, M.Const<"E">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
    M.Exclusion<M.Enum<"C" | "D">, M.Const<"C">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
    M.Exclusion<M.Enum<"D" | "E">, M.Const<"D">>
  >,
  M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  Exclude<M.Union<M.Const<"B"> | M.Const<"A">>, M.Error<"Any">>,
  M.Union<M.Error<"Any">>
> = 1;
error;
