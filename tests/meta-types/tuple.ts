import { A } from "ts-toolbelt";

import { Resolve, Never, Const, Primitive, Tuple } from "ts-algebra";
import { IsRepresentable } from "ts-algebra/utils";

// --- OPEN ---

const test1: A.Equals<
  Resolve<Tuple<[Primitive<string>, Primitive<number>]>>,
  [string, number, ...unknown[]]
> = 1;
test1;

const test2: A.Equals<
  Resolve<
    Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>
  >,
  [string, number, ...boolean[]]
> = 1;
test2;

// --- CLOSED ---

const neverItem: A.Equals<
  Resolve<Tuple<[Primitive<string>, Never], false>>,
  [string, never]
> = 1;
neverItem;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<
  IsRepresentable<Tuple<[Const<"A">, Never]>>,
  false
> = 1;
notRepresentable;

const representable: A.Equals<IsRepresentable<Tuple<[Const<"A">]>>, true> = 1;
representable;
