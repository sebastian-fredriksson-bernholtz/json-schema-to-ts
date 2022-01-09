import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { Exclude } from "ts-algebra/meta-types/exclusion";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Never>,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constTooSmall: A.Equals<
  Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Const<{ a: "A" }>>,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
constTooSmall;

const constTooLarge: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", false>,
    M.Const<{ a: "A"; b: "B" }>
  >,
  M.Object<{ a: M.Const<"A"> }, "a", false>
> = 1;
constTooLarge;

const constSizeMatches1: A.Equals<
  Exclude<M.Object<{ a: M.Const<"A"> }, "a", false>, M.Const<{ a: "A" }>>,
  M.Never
> = 1;
constSizeMatches1;

const constSizeMatches2: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a", false>,
    M.Const<{ a: "C" }>
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, "a", false, M.Any>
> = 1;
constSizeMatches2;

// --- ENUM ---

const enumTooSmall: A.Equals<
  Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Enum<{ a: "A" } | { b: "B" }>>,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
enumTooSmall;

const enumTooLarge: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", false>,
    M.Enum<{ a: "A"; b: "B" } | { a: "A"; c: "C" }>
  >,
  M.Object<{ a: M.Const<"A"> }, "a", false>
> = 1;
enumTooLarge;

const enumSizesMatch: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", false>,
    M.Enum<{ a: "A" } | { b: "B" }>
  >,
  M.Never
> = 1;
enumSizesMatch;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  Exclude<M.Object<{ a: M.Const<"A"> }, "a">, M.Primitive<string>>,
  M.Object<{ a: M.Const<"A"> }, "a">
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  Exclude<M.Object<{ a: M.Const<"A"> }, "a", false>, M.Arr<M.Const<"A">>>,
  M.Object<{ a: M.Const<"A"> }, "a", false>
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", false>,
    M.Tuple<[M.Const<"A">], false>
  >,
  M.Object<{ a: M.Const<"A"> }, "a", false>
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

// Both closed
const bothClosed1Key: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, "a", false>,
    M.Object<{ a: M.Const<"B"> }, "a", false>
  >,
  M.Object<{ a: M.Enum<"A"> }, "a", false>
> = 1;
bothClosed1Key;

const bothClosed2Keys: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B">; b: M.Const<"B"> }, "a" | "b", false>,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b", false>
  >,
  M.Object<{ a: M.Enum<"B">; b: M.Const<"B"> }, "a" | "b", false>
> = 1;
bothClosed2Keys;

const bothClosed3Keys: A.Equals<
  Exclude<
    M.Object<
      { a: M.Enum<"A" | "B">; b: M.Const<"B">; c: M.Const<"C"> },
      "a" | "b" | "c",
      false
    >,
    M.Object<
      { a: M.Const<"B">; b: M.Const<"B">; c: M.Const<"C"> },
      "a" | "b" | "c",
      false
    >
  >,
  M.Object<
    { a: M.Enum<"A">; b: M.Const<"B">; c: M.Const<"C"> },
    "a" | "b" | "c",
    false
  >
> = 1;
bothClosed3Keys;

const bothClosedSizesDontMatch1: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b", false>,
    M.Object<{ a: M.Const<"A"> }, "a", false>
  >,
  M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b", false>
> = 1;
bothClosedSizesDontMatch1;

const bothClosedSizesDontMatch2: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b", false>,
    M.Object<{ a: M.Const<"A">; c: M.Const<"C"> }, "a" | "c", false>
  >,
  M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b", false>
> = 1;
bothClosedSizesDontMatch2;

const bothClosedMoreThan1FreeKey: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B">; b: M.Enum<"A" | "B"> }, "a" | "b", false>,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b", false>
  >,
  M.Object<{ a: M.Enum<"A" | "B">; b: M.Enum<"A" | "B"> }, "a" | "b", false>
> = 1;
bothClosedMoreThan1FreeKey;

const bothClosedImpossible1: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", false>,
    M.Object<{ a: M.Const<"A"> }, "a", false>
  >,
  M.Never
> = 1;
bothClosedImpossible1;

const bothClosedImpossible2: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a", false>,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a", false>
  >,
  M.Never
> = 1;
bothClosedImpossible2;

const bothClosedImpossible3: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a", false>,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a", false>
  >,
  M.Never
> = 1;
bothClosedImpossible3;

const bothClosedOmittableKey1: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a", false>,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B"> }, "a" | "b", false>
  >,
  M.Object<{ a: M.Const<"A">; b: M.Never }, "a", false, M.Any>
> = 1;
bothClosedOmittableKey1;

const bothClosedOmittableKey2: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "b", false>,
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a", false>
  >,
  M.Object<{ a: M.Never; b: M.Const<"B">; c: M.Const<"C"> }, "b", false, M.Any>
> = 1;
bothClosedOmittableKey2;

const bothClosedTooManyOmittableKeys: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a", false>,
    M.Object<
      { a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> },
      "a" | "b" | "c",
      false
    >
  >,
  M.Object<{ a: M.Const<"A">; b: M.Const<"B">; c: M.Const<"C"> }, "a", false>
> = 1;
bothClosedTooManyOmittableKeys;

// Closed value open excluded
const closedValueOpenExcluded1: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B">; b: M.Const<"B"> }, "a", false>,
    M.Object<{}, never, true, M.Const<"B">>
  >,
  M.Object<{ a: M.Enum<"A">; b: M.Const<"B"> }, "a", false>
> = 1;
closedValueOpenExcluded1;

const closedValueOpenExcluded2: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", false>,
    M.Object<{}, never, true, M.Const<"C">>
  >,
  M.Object<{ a: M.Const<"A"> }, "a", false>
> = 1;
closedValueOpenExcluded2;

// Open value closed excluded
const openValueClosedExcluded: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", true>,
    M.Object<{ a: M.Const<"A"> }, "a", false>
  >,
  M.Object<{ a: M.Const<"A"> }, "a", true>
> = 1;
openValueClosedExcluded;

// Both open
const bothOpenMatch1: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", true>,
    M.Object<{ a: M.Const<"A"> }, "a", true>
  >,
  M.Never
> = 1;
bothOpenMatch1;

const bothOpenMatch2: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", true, M.Const<"A">>,
    M.Object<{}, never, true, M.Const<"A">>
  >,
  M.Never
> = 1;
bothOpenMatch2;

const bothOpenMatch3: A.Equals<
  Exclude<
    M.Object<
      { a: M.Enum<"A" | "B">; b: M.Const<"B"> },
      "a",
      true,
      M.Const<"B">
    >,
    M.Object<{}, never, true, M.Const<"B">>
  >,
  M.Object<{ a: M.Enum<"A">; b: M.Const<"B"> }, "a", true, M.Const<"B">>
> = 1;
bothOpenMatch3;

const bothOpenMoreThan1FreeKey1: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, never, true, M.Enum<"A" | "B">>,
    M.Object<{}, never, true, M.Const<"A">>
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, never, true, M.Enum<"A" | "B">>
> = 1;
bothOpenMoreThan1FreeKey1;

const bothOpenMoreThan1FreeKey2: A.Equals<
  Exclude<
    M.Object<{ a: M.Const<"A"> }, "a", true>,
    M.Object<{}, never, true, M.Const<"A">>
  >,
  M.Object<{ a: M.Const<"A"> }, "a", true>
> = 1;
bothOpenMoreThan1FreeKey2;

const bothOpenKeyAdded: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, "a", true, M.Enum<"A" | "B">>,
    M.Object<
      { a: M.Enum<"A" | "B">; b: M.Const<"B"> },
      "a" | "b",
      true,
      M.Primitive<string>
    >
  >,
  M.Object<
    { a: M.Enum<"A" | "B">; b: M.Enum<"A"> },
    "a",
    true,
    M.Enum<"A" | "B">
  >
> = 1;
bothOpenKeyAdded;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a", false>,
    M.Union<M.Const<{ a: "C" }> | M.Object<{ a: M.Const<"B"> }, "a", false>>
  >,
  M.Object<{ a: M.Enum<"A"> }, "a", false>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, "a", false>,
    M.Union<M.Const<{ a: "C" }> | M.Object<{ a: M.Const<"D"> }, "a", false>>
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, "a", false>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a", false>,
    M.Intersection<
      M.Const<{ a: "C" }>,
      M.Object<{ a: M.Primitive<string> }, "a", false>
    >
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, "a", false, M.Any>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B"> }, "a", false>,
    M.Intersection<
      M.Const<{ a: "D" }>,
      M.Object<{ a: M.Primitive<string> }, "a", false>
    >
  >,
  M.Object<{ a: M.Enum<"A" | "B"> }, "a", false>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a", false>,
    M.Exclusion<
      M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a", false>,
      M.Const<{ a: "C" }>
    >
  >,
  M.Object<{ a: M.Enum<"C"> }, "a", false>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a", false>,
    M.Exclusion<
      M.Object<{ a: M.Enum<"A" | "B" | "C"> }, never, false>,
      M.Object<{ a: M.Primitive<string> }, "a", false>
    >
  >,
  M.Object<{ a: M.Enum<"A" | "B" | "C"> }, "a", false>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<Exclude<M.Object, M.Error<"Any">>, M.Error<"Any">> = 1;
error;
