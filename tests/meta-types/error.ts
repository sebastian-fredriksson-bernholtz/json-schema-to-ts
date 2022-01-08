import { A } from "ts-toolbelt";

import { Resolve, Error } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

const test: A.Equals<Resolve<Error<"Any">>, never> = 1;
test;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<IsRepresentable<Error<"Any">>, false> = 1;
notRepresentable;
