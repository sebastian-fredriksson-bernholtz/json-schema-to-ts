import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

const test: A.Equals<M.Resolve<M.Never>, never> = 1;
test;
