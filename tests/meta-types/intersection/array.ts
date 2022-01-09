import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

// --- ANY ---

const anyAlwaysIntersects: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Any>,
  M.Arr<M.Primitive<string>>
> = 1;
anyAlwaysIntersects;

// --- NEVER ---

const neverNeverIntersects: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Never>,
  M.Never
> = 1;
neverNeverIntersects;

// --- CONSTS ---

const intersectingConst: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Const<["foo", "bar"]>>,
  M.Const<["foo", "bar"]>
> = 1;
intersectingConst;

const test1b: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Const<["foo", 42]>>,
  M.Never
> = 1;
test1b;

// --- ENUM ---

let intersectingEnum1: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Enum<["foo"] | ["bar"] | 42>>,
  M.Enum<["foo"] | ["bar"]>
> = 1;
intersectingEnum1;

let intersectingEnum2: A.Equals<
  M.Intersect<M.Arr<M.Primitive<number>>, M.Enum<["bar", "baz"] | [42]>>,
  M.Enum<[42]>
> = 1;
intersectingEnum2;

const nonIntersectingEnum: A.Equals<
  M.Intersect<M.Arr<M.Primitive<number>>, M.Enum<["bar", "baz"]>>,
  M.Enum<never>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const primitivesNeverIntersect: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Primitive<string>>,
  M.Never
> = 1;
primitivesNeverIntersect;

// --- ARRAY ---

const intersectingArray: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Arr<M.Primitive<string>>>,
  M.Arr<M.Primitive<string>>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Arr<M.Primitive<number>>>,
  M.Never
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], true, M.Const<"foo">>
  >,
  M.Tuple<[M.Primitive<string>], true, M.Const<"foo">>
> = 1;
intersectingTuple2;

const tupleOpenPropsBecomeString: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Tuple<[M.Primitive<string>]>>,
  M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
> = 1;
tupleOpenPropsBecomeString;

const tupleOpenPropsBecomeFoo: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], true, M.Enum<"foo" | 42>>
  >,
  M.Tuple<[M.Primitive<string>], true, M.Enum<"foo">>
> = 1;
tupleOpenPropsBecomeFoo;

const tupleBecomeClose: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<number>>
  >,
  M.Tuple<[M.Primitive<string>], false, M.Never>
> = 1;
tupleBecomeClose;

const nonIntersectingTuple: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Tuple<
      [M.Primitive<string>, M.Primitive<boolean>],
      true,
      M.Primitive<string>
    >
  >,
  M.Never
> = 1;
nonIntersectingTuple;

// --- OBJECT ---

const objectsNeverIntersect: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>
  >,
  M.Never
> = 1;
objectsNeverIntersect;

// --- UNION ---

const numberIsExcluded1: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Union<M.Arr<M.Primitive<string>> | M.Arr<M.Primitive<number>>>
  >,
  M.Union<M.Arr<M.Primitive<string>> | M.Never>
> = 1;
numberIsExcluded1;

const numberIsExcluded2: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Union<M.Const<["foo"]> | M.Arr<M.Primitive<number>>>
  >,
  M.Union<M.Const<["foo"]> | M.Never>
> = 1;
numberIsExcluded2;

const tupleIsKept: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Union<M.Arr<M.Primitive<number>> | M.Tuple<[M.Primitive<string>]>>
  >,
  M.Union<M.Never | M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>>
> = 1;
tupleIsKept;

// --- INTERSECTION ---

const cannonIntersectIntersection: A.Equals<
  M.Intersect<
    M.Arr<M.Primitive<string>>,
    M.Intersection<M.Primitive<string>, M.Primitive<string>>
  >,
  M.Error<"Cannot intersect intersection">
> = 1;
cannonIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Arr<M.Const<"foo">>,
    M.Exclusion<M.Arr<M.Primitive<string>>, M.Const<[]>>
  >,
  M.Exclusion<M.Arr<M.Const<"foo">>, M.Const<[]>>
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  M.Intersect<M.Arr<M.Primitive<string>>, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;
