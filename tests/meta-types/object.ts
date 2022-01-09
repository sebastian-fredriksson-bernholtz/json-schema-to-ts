import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

// --- OPEN ---

const test1: A.Equals<
  M.Resolve<
    M.Object<
      { str: M.Primitive<string>; num: M.Primitive<number> },
      "str",
      true,
      M.Primitive<string>
    >
  >,
  { str: string; num?: number | undefined; [k: string]: unknown }
> = 1;
test1;

const test2: A.Equals<
  M.Resolve<M.Object<{}, never, true, M.Primitive<string>>>,
  { [k: string]: string }
> = 1;
test2;

// --- CLOSED ---

const test3: A.Equals<
  M.Resolve<
    M.Object<
      { str: M.Primitive<string>; num: M.Primitive<number> },
      "str",
      false
    >
  >,
  { str: string; num?: number | undefined }
> = 1;
test3;

const test4: A.Equals<
  M.Resolve<M.Object<{ str: M.Primitive<string> }, "str" | "num", false>>,
  never
> = 1;
test4;

// --- ISREPRESENTABLE ---

const notRepresentable1: A.Equals<
  IsRepresentable<M.Object<{ a: M.Const<"A">; b: M.Never }, "b">>,
  false
> = 1;
notRepresentable1;

const notRepresentable2: A.Equals<
  IsRepresentable<M.Object<{}, "b", false>>,
  false
> = 1;
notRepresentable2;

const notRepresentable3: A.Equals<
  IsRepresentable<M.Object<{}, "b", true, M.Never>>,
  false
> = 1;
notRepresentable3;

const representable1: A.Equals<
  IsRepresentable<M.Object<{ a: M.Const<"A">; b: M.Never }, "a">>,
  true
> = 1;
representable1;

const representable2: A.Equals<
  IsRepresentable<M.Object<{}, "b", true>>,
  true
> = 1;
representable2;

const representable3: A.Equals<
  IsRepresentable<M.Object<{}, "b", true, M.Const<"A">>>,
  true
> = 1;
representable3;
