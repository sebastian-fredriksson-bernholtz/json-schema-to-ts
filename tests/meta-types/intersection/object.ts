import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  M.Intersect<M.Object<{ str: M.Primitive<string> }, "str">, M.Any>,
  M.Object<{ str: M.Primitive<string> }, "str">
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  M.Intersect<M.Object<{ str: M.Primitive<string> }, "str">, M.Never>,
  M.Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Const<{ str: "str"; bar: "str" }>
  >,
  M.Const<{ str: "str"; bar: "str" }>
> = 1;
intersectingConst1;

const intersectingConst2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Const<{ num: 42; str: "string" }>
  >,
  M.Const<{ num: 42; str: "string" }>
> = 1;
intersectingConst2;

const nonIntersectingConst1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", false>,
    M.Const<{ str: "str"; bar: "str" }>
  >,
  M.Never
> = 1;
nonIntersectingConst1;

const nonIntersectingConst2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Const<{ num: 42 }>
  >,
  M.Never
> = 1;
nonIntersectingConst2;

// --- ENUM ---

const intersectingEnum: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Enum<{ str: "string" } | 42>
  >,
  M.Enum<{ str: "string" }>
> = 1;
intersectingEnum;

const nonIntersectingEnum1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", false>,
    M.Enum<"bar" | { str: "string"; bar: 42 }>
  >,
  M.Enum<never>
> = 1;
nonIntersectingEnum1;

const nonIntersectingEnum2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Enum<"bar" | true | { num: 42 }>
  >,
  M.Enum<never>
> = 1;
nonIntersectingEnum2;

// --- PRIMITIVES ---

const primitivesNeverIntersect1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Primitive<string>
  >,
  M.Never
> = 1;
primitivesNeverIntersect1;

const primitivesNeverIntersect2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Primitive<boolean>
  >,
  M.Never
> = 1;
primitivesNeverIntersect2;

// --- ARRAY ---

const arraysNeverIntersect: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Array<M.Primitive<string>>
  >,
  M.Never
> = 1;
arraysNeverIntersect;

// --- TUPLE ---

const tuplesNeverIntersect: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Tuple<[M.Primitive<string>], true, M.Primitive<string>>
  >,
  M.Never
> = 1;
tuplesNeverIntersect;

// --- OBJECT ---

const intersectingObject1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>
  >,
  M.Object<
    { str: M.Primitive<string>; foo: M.Primitive<string> },
    "str" | "foo",
    true,
    M.Primitive<string>
  >
> = 1;
intersectingObject1;

const intersectingObject2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Object<{ str: M.Primitive<string> }, "str", false>
  >,
  M.Object<{ str: M.Primitive<string> }, "str", false, M.Any>
> = 1;
intersectingObject2;

const intersectingObject3: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str", true>,
    M.Object<{ str: M.Primitive<string> }, "str", false>
  >,
  M.Object<{ str: M.Primitive<string> }, "str", false, M.Any>
> = 1;
intersectingObject3;

// Rejects "str" property because B is closed
const nonIntersectingObject1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Object<{ otherStr: M.Primitive<string> }, "otherStr", false>
  >,
  M.Never
> = 1;
nonIntersectingObject1;

// Rejects "str" property because it should be bool AND str
const nonIntersectingObject2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Object<{ bool: M.Primitive<boolean> }, "bool", true, M.Primitive<boolean>>
  >,
  M.Never
> = 1;
nonIntersectingObject2;

// --- UNION ---

const intersectingUnion: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Union<M.Primitive<string> | M.Const<{ str: "str" }>>
  >,
  M.Union<M.Never | M.Const<{ str: "str" }>>
> = 1;
intersectingUnion;

// Doesn't match string, neither object because it is closed
const nonIntersectingUnion1: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Union<
      M.Const<"foo"> | M.Object<{ foo: M.Primitive<string> }, "foo", false>
    >
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion1;

const nonIntersectingUnion2: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Union<M.Array<M.Primitive<boolean>>>
  >,
  M.Union<M.Never>
> = 1;
nonIntersectingUnion2;

// --- INTERSECTION ---

const cannotIntersectIntersection: A.Equals<
  M.Intersect<
    M.Object<{ str: M.Primitive<string> }, "str">,
    M.Intersection<M.Primitive<string>, M.Primitive<number>>
  >,
  M.Error<"Cannot intersect intersection">
> = 1;
cannotIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  M.Intersect<
    M.Object<{ baz: M.Primitive<string> }, "baz", true>,
    M.Exclusion<
      M.Object<{ foo: M.Primitive<string> }, "foo", true, M.Primitive<string>>,
      M.Const<{ foo: "bar" }>
    >
  >,
  M.Exclusion<
    M.Object<
      { foo: M.Primitive<string>; baz: M.Primitive<string> },
      "foo" | "baz",
      true,
      M.Primitive<string>
    >,
    M.Const<{ foo: "bar" }>
  >
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  M.Intersect<M.Object<{ str: M.Primitive<string> }, "str">, M.Error<"Any">>,
  M.Error<"Any">
> = 1;
error;
