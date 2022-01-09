import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

// --- EMPTY ---

const test1: A.Equals<M.Resolve<M.Enum<never>>, never> = 1;
test1;

// --- PRIMITIVE ---

const test2: A.Equals<M.Resolve<M.Enum<"foo" | "bar">>, "foo" | "bar"> = 1;
test2;

// --- TUPLE ---

const test3: A.Equals<M.Resolve<M.Enum<["foo", "bar"]>>, ["foo", "bar"]> = 1;
test3;

// --- OBJECT ---

const test4: A.Equals<M.Resolve<M.Enum<{ foo: "bar" }>>, { foo: "bar" }> = 1;
test4;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<IsRepresentable<M.Enum<never>>, false> = 1;
notRepresentable;

const representable: A.Equals<IsRepresentable<M.Enum<"A">>, true> = 1;
representable;
