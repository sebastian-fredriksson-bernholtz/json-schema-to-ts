import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

const test1: A.Equals<
  M.Resolve<M.Exclusion<M.Enum<"foo" | 42>, M.Primitive<string>>>,
  42
> = 1;
test1;

const test2: A.Equals<
  M.Resolve<M.Exclusion<M.Enum<"foo" | "bar">, M.Const<"bar">>>,
  "foo"
> = 1;
test2;

const test3: A.Equals<
  M.Resolve<
    M.Exclusion<
      M.Union<
        | M.Object<{}, never, true>
        | M.Tuple<[M.Primitive<string>], true>
        | M.Primitive<string>
      >,
      M.Union<M.Primitive<string> | M.Tuple<[M.Any], true>>
    >
  >,
  { [k: string]: unknown }
> = 1;
test3;

const test4: A.Equals<
  M.Resolve<
    M.Exclusion<
      M.Union<M.Never | M.Const<"B"> | M.Const<"C">>,
      M.Union<M.Const<"A"> | M.Const<"B">>
    >
  >,
  "C"
> = 1;
test4;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<
  M.IsRepresentable<M.Exclusion<M.Const<"A">, M.Primitive<string>>>,
  false
> = 1;
notRepresentable;

const representable: A.Equals<
  M.IsRepresentable<M.Exclusion<M.Primitive<string>, M.Const<"A">>>,
  true
> = 1;
representable;
