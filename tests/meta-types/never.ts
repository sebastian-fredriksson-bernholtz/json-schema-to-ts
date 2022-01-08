import { A } from "ts-toolbelt";

import { Resolve, Never } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

const test: A.Equals<Resolve<Never>, never> = 1;
test;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<IsRepresentable<Never>, false> = 1;
notRepresentable;
