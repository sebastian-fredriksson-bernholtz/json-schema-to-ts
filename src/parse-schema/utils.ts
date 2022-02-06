import { Merge } from "../utils";

export type RemoveInvalidAdditionalItems<S> = "items" extends keyof S
  ? "additionalItems" extends keyof S
    ? S
    : Merge<S, { additionalItems: true }>
  : Omit<S, "additionalItems">;

// TOIMPROVE: The way of dealing with subschemas is not clear
// For instance, merging properties instead of replacing them works better with ifThenElse, but not with oneOf !
// To investigate if it can be improved + Investigate on unevaluatedItems
export type MergeSubSchema<P, C> = Merge<
  P,
  Merge<
    { properties: {}; additionalProperties: true; required: [] },
    RemoveInvalidAdditionalItems<C>
  >
>;
