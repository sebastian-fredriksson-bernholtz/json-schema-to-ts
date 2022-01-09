import { A } from "ts-toolbelt";

import { M } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

// --- OPEN ---

const test1: A.Equals<
  M.Resolve<M.Tuple<[M.Primitive<string>, M.Primitive<number>]>>,
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
  M.Resolve<M.Tuple<[M.Primitive<string>, M.Never], false>>,
  [string, never]
> = 1;
neverItem;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<
  IsRepresentable<M.Tuple<[M.Const<"A">, M.Never]>>,
  false
> = 1;
notRepresentable;

const representable: A.Equals<
  IsRepresentable<M.Tuple<[M.Const<"A">]>>,
  true
> = 1;
representable;
