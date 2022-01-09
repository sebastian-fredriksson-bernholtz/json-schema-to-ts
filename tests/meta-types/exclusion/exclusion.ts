import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Exclusion<M.Primitive<string>, M.Const<"A">>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Exclusion<M.Primitive<string>, M.Const<"A">>, M.Never>,
  M.Primitive<string>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  M.Exclude<M.Exclusion<M.Enum<"A" | "B" | "C">, M.Const<"A">>, M.Const<"B">>,
  M.Enum<"C">
> = 1;
excludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  M.Exclude<
    M.Exclusion<M.Enum<"A" | "B" | "C" | "D">, M.Const<"A">>,
    M.Enum<"B" | "C">
  >,
  M.Enum<"D">
> = 1;
excludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  M.Exclude<
    M.Exclusion<
      M.Union<M.Primitive<string> | M.Primitive<number> | M.Const<"A">>,
      M.Const<"A">
    >,
    M.Primitive<number>
  >,
  M.Union<M.Primitive<string> | M.Never>
> = 1;
excludingPrimitive;

// --- ARRAY ---

const excludingArray1: A.Equals<
  M.Exclude<
    M.Exclusion<M.Arr<M.Primitive<string>>, M.Never>,
    M.Arr<M.Primitive<string>>
  >,
  M.Const<[]>
> = 1;
excludingArray1;

const excludingArray2: A.Equals<
  M.Exclude<
    M.Exclusion<
      M.Arr<M.Union<M.Primitive<string> | M.Primitive<number>>>,
      M.Never
    >,
    M.Arr<M.Primitive<string>>
  >,
  M.Arr<M.Union<M.Primitive<string> | M.Primitive<number>>>
> = 1;
excludingArray2;

// --- TUPLE ---

const excludingTuple: A.Equals<
  M.Exclude<
    M.Exclusion<M.Tuple<[M.Enum<"A" | "B" | "C">], false>, M.Const<["A"]>>,
    M.Const<["B"]>
  >,
  M.Tuple<[M.Enum<"C">], false>
> = 1;
excludingTuple;

// --- OBJECT ---

const excludingObject: A.Equals<
  M.Exclude<
    M.Exclusion<M.Object<{ a: M.Enum<"A" | "B"> }, "a", false>, M.Never>,
    M.Object<{ a: M.Const<"B"> }, "a", false>
  >,
  M.Object<{ a: M.Enum<"A"> }, "a", false>
> = 1;
excludingObject;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Exclusion<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
      M.Const<"A">
    >,
    M.Union<M.Const<"B"> | M.Const<"C">>
  >,
  M.Union<M.Const<"D"> | M.Never>
> = 1;
excludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Exclusion<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
      M.Const<"A">
    >,
    M.Intersection<
      M.Enum<"B" | "C">,
      M.Union<M.Primitive<string> | M.Primitive<number>>
    >
  >,
  M.Union<M.Const<"D"> | M.Never>
> = 1;
excludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Exclusion<
      M.Union<M.Const<"A"> | M.Const<"B"> | M.Const<"C"> | M.Const<"D">>,
      M.Const<"A">
    >,
    M.Exclusion<M.Enum<"B" | "C">, M.Const<"B">>
  >,
  M.Union<M.Const<"B"> | M.Const<"D"> | M.Never>
> = 1;
excludingExclusion;

// --- ERROR ---

const error: A.Equals<M.Exclude<M.Any, M.Error<"Any">>, M.Error<"Any">> = 1;
error;
