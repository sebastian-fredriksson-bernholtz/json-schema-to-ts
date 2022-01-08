import { A } from "ts-toolbelt";

import { Resolve, Any } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

const test: A.Equals<Resolve<Any>, unknown> = 1;
test;

// --- ISREPRESENTABLE ---

const representable: A.Equals<IsRepresentable<Any>, true> = 1;
representable;
