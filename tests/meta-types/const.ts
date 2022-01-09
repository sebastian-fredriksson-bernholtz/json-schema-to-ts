import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

// --- PRIMITIVE ---

const test1: A.Equals<M.Resolve<M.Const<null>>, null> = 1;
test1;

const test2: A.Equals<M.Resolve<M.Const<true>>, true> = 1;
test2;

const test3: A.Equals<M.Resolve<M.Const<"foo">>, "foo"> = 1;
test3;

const test4: A.Equals<M.Resolve<M.Const<42>>, 42> = 1;
test4;

// --- TUPLE ---

const test5: A.Equals<M.Resolve<M.Const<["foo", "bar"]>>, ["foo", "bar"]> = 1;
test5;

// --- OBJECT ---

const test6: A.Equals<M.Resolve<M.Const<{ foo: "bar" }>>, { foo: "bar" }> = 1;
test6;

// --- ISREPRESENTABLE ---

const representable: A.Equals<IsRepresentable<M.Const<"A">>, true> = 1;
representable;
