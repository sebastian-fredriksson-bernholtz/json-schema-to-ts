import { A, L } from "ts-toolbelt";
import { M } from "ts-algebra";

import { DoesExtend, Get, IsObject } from "../utils";

import { $ParseSchema, ParseSchemaOptions } from "./index";

export type ParseArraySchema<
  S,
  O extends ParseSchemaOptions
> = "items" extends keyof S
  ? IsObject<S["items"]> extends true
    ? M.$Array<$ParseSchema<S["items"], O>>
    : S extends { items: any[] }
    ? M.$Union<FromTreeTuple<ParseTuple<S["items"], O>, S, O>>
    : M.Error<'Invalid value in "items" property'>
  : M.$Array;

export type ParseTuple<
  S extends any[],
  O extends ParseSchemaOptions,
  R extends any[] = []
> = {
  stop: R;
  continue: ParseTuple<L.Tail<S>, O, L.Prepend<R, $ParseSchema<L.Head<S>, O>>>;
}[S extends [any, ...any[]] ? "continue" : "stop"];

type FromTreeTuple<
  T extends any[],
  S,
  O extends ParseSchemaOptions
> = ApplyAdditionalItems<
  ApplyBoundaries<
    T,
    "minItems" extends keyof S ? S["minItems"] : 0,
    "maxItems" extends keyof S ? S["maxItems"] : undefined
  >,
  "additionalItems" extends keyof S ? S["additionalItems"] : true,
  O
>;

type ApplyBoundaries<
  T extends any[],
  Min,
  Max,
  R = never,
  HasMin extends boolean = false,
  HasMax extends boolean = false,
  C = T
> = {
  stop: {
    result: Max extends undefined
      ? R | M.$Tuple<L.Reverse<T>>
      : HasMax extends true
      ? R | M.$Tuple<L.Reverse<T>>
      : Max extends T["length"]
      ? M.$Tuple<L.Reverse<T>>
      : IsLongerThan<L.Tail<T>, Max> extends true
      ? never
      : R | M.$Tuple<L.Reverse<T>>;
    hasEncounteredMin: DoesExtend<Min, T["length"]>;
    hasEncounteredMax: HasMax extends true
      ? true
      : Max extends T["length"]
      ? true
      : IsLongerThan<L.Tail<T>, Max>;
    completeTuple: C;
  };
  continue: ApplyBoundaries<
    L.Tail<T>,
    Min,
    Max,
    T["length"] extends Max
      ? M.$Tuple<L.Reverse<T>>
      : R | M.$Tuple<L.Reverse<T>>,
    HasMin extends true ? true : DoesExtend<Min, T["length"]>,
    HasMax extends true ? true : DoesExtend<Max, T["length"]>,
    C
  >;
}[Min extends T["length"]
  ? "stop"
  : T extends [any, ...any[]]
  ? "continue"
  : "stop"];

type IsLongerThan<T extends any[], N, R = false> = {
  continue: T["length"] extends N ? true : IsLongerThan<L.Tail<T>, N>;
  stop: T["length"] extends N ? true : R;
}[T extends [any, ...any[]] ? "continue" : "stop"];

type ApplyAdditionalItems<R, A, O extends ParseSchemaOptions> = Get<
  R,
  "hasEncounteredMax"
> extends true
  ? Get<R, "hasEncounteredMin"> extends true
    ? Get<R, "result">
    : M.Error<'"minItems" property is lower than "maxItems"'>
  : A extends false
  ? Get<R, "hasEncounteredMin"> extends true
    ? Get<R, "result">
    : M.Error<'"minItems" property is higher than allowed number of items'>
  : A extends true
  ? Get<R, "hasEncounteredMin"> extends true
    ?
        | Get<R, "result">
        | M.$Tuple<L.Reverse<A.Cast<Get<R, "completeTuple">, any[]>>, true>
    : // 🔧 TOIMPROVE: Not cast here
      M.$Tuple<L.Reverse<A.Cast<Get<R, "completeTuple">, any[]>>, true>
  : IsObject<A> extends true
  ? Get<R, "hasEncounteredMin"> extends true
    ?
        | Get<R, "result">
        | M.$Tuple<
            // 🔧 TOIMPROVE: Not cast here
            L.Reverse<A.Cast<Get<R, "completeTuple">, any[]>>,
            true,
            $ParseSchema<A, O>
          >
    : M.$Tuple<
        // 🔧 TOIMPROVE: Not cast here
        L.Reverse<A.Cast<Get<R, "completeTuple">, any[]>>,
        true,
        $ParseSchema<A, O>
      >
  : M.Error<'Invalid value in "additionalItems" property'>;
