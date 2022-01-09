import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

const test: A.Equals<M.Resolve<M.Never>, never> = 1;
test;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<M.IsRepresentable<M.Never>, false> = 1;
notRepresentable;
