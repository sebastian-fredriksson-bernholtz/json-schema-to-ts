import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

// --- ANY ---

const test1: A.Equals<M.Resolve<M.Arr<M.Any>>, unknown[]> = 1;
test1;

//  --- NEVER ---

const test2: A.Equals<M.Resolve<M.Arr<M.Never>>, never[]> = 1;
test2;

// --- CONST ---

const test3: A.Equals<M.Resolve<M.Arr<M.Const<"foo">>>, "foo"[]> = 1;
test3;

// --- ENUM ---

const test4: A.Equals<
  M.Resolve<M.Arr<M.Enum<"foo" | "bar" | 42>>>,
  ("foo" | "bar" | 42)[]
> = 1;
test4;

// --- PRIMITIVES ---

const test5: A.Equals<M.Resolve<M.Arr<M.Primitive<string>>>, string[]> = 1;
test5;

// --- ARRAY ---

const test6: A.Equals<
  M.Resolve<M.Arr<M.Arr<M.Primitive<string>>>>,
  string[][]
> = 1;
test6;

// --- TUPLE ---

const test7: A.Equals<
  M.Resolve<M.Arr<M.Tuple<[M.Primitive<string>], false>>>,
  [string][]
> = 1;
test7;

// --- OBJECT ---

const test8: A.Equals<
  M.Resolve<
    M.Arr<
      M.Object<
        { foo: M.Primitive<string>; bar: M.Primitive<number> },
        "bar",
        false,
        M.Primitive<string>
      >
    >
  >,
  { foo?: string | undefined; bar: number }[]
> = 1;
test8;

// --- UNION ---

const test9: A.Equals<
  M.Resolve<M.Arr<M.Union<M.Primitive<string> | M.Const<42>>>>,
  (string | 42)[]
> = 1;
test9;

// --- INTERSECTION ---

const test10: A.Equals<
  M.Resolve<M.Arr<M.Intersection<M.Primitive<string>, M.Const<"foo">>>>,
  "foo"[]
> = 1;
test10;

// --- ERROR ---

const test11: A.Equals<M.Resolve<M.Arr<M.Error<"Any">>>, never[]> = 1;
test11;

// --- ISREPRESENTABLE ---

const representable: A.Equals<IsRepresentable<M.Arr<M.Never>>, true> = 1;
representable;
