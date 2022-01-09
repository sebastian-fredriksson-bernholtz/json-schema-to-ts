import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

const test: A.Equals<M.Resolve<M.Error<"Any">>, never> = 1;
test;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<M.IsRepresentable<M.Error<"Any">>, false> = 1;
notRepresentable;
