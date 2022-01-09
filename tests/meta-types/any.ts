import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

const test: A.Equals<M.Resolve<M.Any>, unknown> = 1;
test;

// --- ISREPRESENTABLE ---

const representable: A.Equals<M.IsRepresentable<M.Any>, true> = 1;
representable;
