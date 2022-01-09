import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">, M.Const<"B">]>, M.Any>,
  M.Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">, M.Const<"B">]>, M.Never>,
  M.Tuple<[M.Const<"A">, M.Const<"B">]>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constTooSmall: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Const<["A"]>>,
  M.Tuple<[M.Const<"A">]>
> = 1;
constTooSmall;

const constTooLarge: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], false>, M.Const<["A", "B"]>>,
  M.Tuple<[M.Const<"A">], false>
> = 1;
constTooLarge;

const constSizeMatches: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], false>, M.Const<["A"]>>,
  M.Never
> = 1;
constSizeMatches;

// --- ENUM ---

const enumTooSmall: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Enum<["A"] | ["B"]>>,
  M.Tuple<[M.Const<"A">]>
> = 1;
enumTooSmall;

const enumTooLarge: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], false>, M.Enum<["A", "B"] | ["A", "C"]>>,
  M.Tuple<[M.Const<"A">], false>
> = 1;
enumTooLarge;

const enumSizesMatch: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], false>, M.Enum<["A"] | ["B"]>>,
  M.Never
> = 1;
enumSizesMatch;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Primitive<string>>,
  M.Tuple<[M.Const<"A">]>
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arrayTooSmall1: A.Equals<
  M.Exclude<M.Tuple<[M.Primitive<string>]>, M.Arr<M.Primitive<string>>>,
  M.Tuple<[M.Primitive<string>]>
> = 1;
arrayTooSmall1;

const arrayTooSmall2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Primitive<string>], true, M.Enum<"A" | 42>>,
    M.Arr<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], true, M.Enum<"A" | 42>>
> = 1;
arrayTooSmall2;

const excludingArray1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], true, M.Primitive<string>>,
    M.Arr<M.Primitive<string>>
  >,
  M.Never
> = 1;
excludingArray1;

const excludingArray2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | 42>], true, M.Primitive<string>>,
    M.Arr<M.Primitive<string>>
  >,
  M.Tuple<[M.Enum<42>], false, M.Never>
> = 1;
excludingArray2;

const excludingArray3: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | 42>, M.Const<"A">], true, M.Primitive<string>>,
    M.Arr<M.Primitive<string>>
  >,
  M.Tuple<[M.Enum<42>, M.Const<"A">], false, M.Never>
> = 1;
excludingArray3;

const nonExcludingArray1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | 42>, M.Enum<"A" | 42>], true, M.Primitive<string>>,
    M.Arr<M.Primitive<string>>
  >,
  M.Tuple<[M.Enum<"A" | 42>, M.Enum<"A" | 42>], true, M.Primitive<string>>
> = 1;
nonExcludingArray1;

const nonExcludingArray2: A.Equals<
  M.Exclude<
    M.Tuple<
      [M.Primitive<string>, M.Primitive<boolean>],
      true,
      M.Primitive<string>
    >,
    M.Arr<M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>, M.Primitive<boolean>], false, M.Never>
> = 1;
nonExcludingArray2;

// --- TUPLE ---

// Both closed
const bothClosed1Item: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], false>,
    M.Tuple<[M.Const<"B">], false>
  >,
  M.Tuple<[M.Enum<"A">], false, M.Never>
> = 1;
bothClosed1Item;

const bothClosed2Items: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">, M.Const<"B">], false>,
    M.Tuple<[M.Const<"A">, M.Const<"B">], false>
  >,
  M.Tuple<[M.Enum<"B">, M.Const<"B">], false, M.Never>
> = 1;
bothClosed2Items;

const bothClosed3Keys: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">, M.Const<"B">, M.Const<"C">], false>,
    M.Tuple<[M.Const<"B">, M.Const<"B">, M.Const<"C">], false>
  >,
  M.Tuple<[M.Enum<"A">, M.Const<"B">, M.Const<"C">], false, M.Never>
> = 1;
bothClosed3Keys;

const bothClosedSizesDontMatch1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Const<"A">, M.Const<"B">], false>,
    M.Tuple<[M.Const<"A">], false>
  >,
  M.Tuple<[M.Const<"A">, M.Const<"B">], false>
> = 1;
bothClosedSizesDontMatch1;

const bothClosedSizesDontMatch2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Const<"A">], false>,
    M.Tuple<[M.Const<"A">, M.Const<"B">], false>
  >,
  M.Tuple<[M.Const<"A">], false>
> = 1;
bothClosedSizesDontMatch2;

const bothClosedMoreThan1FreeKey: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">, M.Enum<"A" | "B">], false>,
    M.Tuple<[M.Const<"A">, M.Const<"B">], false>
  >,
  M.Tuple<[M.Enum<"A" | "B">, M.Enum<"A" | "B">], false>
> = 1;
bothClosedMoreThan1FreeKey;

const bothClosedImpossible1: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], false>, M.Tuple<[M.Const<"A">], false>>,
  M.Never
> = 1;
bothClosedImpossible1;

const bothClosedImpossible2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Const<"A">, M.Const<"B">], false>,
    M.Tuple<[M.Const<"A">, M.Const<"B">], false>
  >,
  M.Never
> = 1;
bothClosedImpossible2;

// Closed value open excluded
const closedValueOpenExcluded1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">, M.Const<"B">], false>,
    M.Tuple<[], true, M.Const<"B">>
  >,
  M.Tuple<[M.Enum<"A">, M.Const<"B">], false>
> = 1;
closedValueOpenExcluded1;

const closedValueOpenExcluded2: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], false>, M.Tuple<[], true, M.Const<"C">>>,
  M.Tuple<[M.Const<"A">], false>
> = 1;
closedValueOpenExcluded2;

// Open value closed excluded
const openValueClosedExcluded: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Tuple<[M.Const<"A">], false>>,
  M.Tuple<[M.Const<"A">], true>
> = 1;
openValueClosedExcluded;

// Both open
const bothOpenMatch1: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Tuple<[M.Const<"A">], true>>,
  M.Never
> = 1;
bothOpenMatch1;

const bothOpenMatch2: A.Equals<
  M.Exclude<
    M.Tuple<[M.Const<"A">], true, M.Const<"A">>,
    M.Tuple<[], true, M.Const<"A">>
  >,
  M.Never
> = 1;
bothOpenMatch2;

const bothOpenMoreThan1FreeKey1: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], true, M.Enum<"A" | "B">>,
    M.Tuple<[], true, M.Const<"A">>
  >,
  M.Tuple<[M.Enum<"A" | "B">], true, M.Enum<"A" | "B">>
> = 1;
bothOpenMoreThan1FreeKey1;

const bothOpenMoreThan1FreeKey2: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">], true>, M.Tuple<[], true, M.Const<"A">>>,
  M.Tuple<[M.Const<"A">], true>
> = 1;
bothOpenMoreThan1FreeKey2;

const bothOpenItemAdded: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], true, M.Enum<"A" | "B">>,
    M.Tuple<[M.Enum<"A" | "B">, M.Const<"B">], true, M.Primitive<string>>
  >,
  M.Tuple<[M.Enum<"A" | "B">, M.Enum<"A">], false, M.Enum<never>>
> = 1;
bothOpenItemAdded;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  M.Exclude<M.Tuple<[M.Const<"A">]>, M.Object<{ a: M.Const<"A"> }, "a", false>>,
  M.Tuple<[M.Const<"A">]>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B" | "C">], false>,
    M.Union<M.Const<["C"]> | M.Tuple<[M.Const<"B">], false>>
  >,
  M.Tuple<[M.Enum<"A">], false, M.Never>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], false>,
    M.Union<M.Const<["C"]> | M.Tuple<[M.Const<"D">], false>>
  >,
  M.Tuple<[M.Enum<"A" | "B">], false, M.Never>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B" | "C">], false>,
    M.Intersection<M.Const<["C"]>, M.Tuple<[M.Primitive<string>], false>>
  >,
  M.Tuple<[M.Enum<"A" | "B">], false>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B">], false>,
    M.Intersection<M.Const<["D"]>, M.Tuple<[M.Primitive<string>], false>>
  >,
  M.Tuple<[M.Enum<"A" | "B">], false>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B" | "C">], false>,
    M.Exclusion<M.Tuple<[M.Enum<"A" | "B" | "C">], false>, M.Const<["C"]>>
  >,
  M.Tuple<[M.Enum<"C">], false, M.Never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  M.Exclude<
    M.Tuple<[M.Enum<"A" | "B" | "C">], false>,
    M.Exclusion<
      M.Tuple<[M.Enum<"A" | "B" | "C">], false>,
      M.Tuple<[M.Primitive<string>], false>
    >
  >,
  M.Tuple<[M.Enum<"A" | "B" | "C">], false>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  M.Exclude<M.Tuple<["A", "B"]>, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;
