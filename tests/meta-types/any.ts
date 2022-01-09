import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

const test: A.Equals<M.Resolve<M.Any>, unknown> = 1;
test;

// --- ISREPRESENTABLE ---

const representable: A.Equals<IsRepresentable<M.Any>, true> = 1;
representable;
