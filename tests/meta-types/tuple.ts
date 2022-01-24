import { A } from "ts-toolbelt";

import { M } from "ts-algebra";

// --- OPEN ---

const test1: A.Equals<
  M.Resolve<M.Tuple<[M.Primitive<string>, M.Primitive<number>], true>>,
  [string, number, ...unknown[]]
> = 1;
test1;

const test2: A.Equals<
  M.Resolve<
    M.Tuple<
      [M.Primitive<string>, M.Primitive<number>],
      true,
      M.Primitive<boolean>
    >
  >,
  [string, number, ...boolean[]]
> = 1;
test2;

// --- CLOSED ---

const neverItem: A.Equals<
  M.Resolve<M.Tuple<[M.Primitive<string>, M.Never]>>,
  [string, never]
> = 1;
neverItem;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<
  M.IsRepresentable<M.Tuple<[M.Const<"A">, M.Never], true>>,
  false
> = 1;
notRepresentable;

const representable: A.Equals<
  M.IsRepresentable<M.Tuple<[M.Const<"A">], true>>,
  true
> = 1;
representable;
