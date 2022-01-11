import { Get } from "../../../utils";

import { TypeId, Never, Error } from "..";
import { UnionType } from "../union";

import { ExclusionType } from ".";
import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromAny<Source, Excluded> = {
  any: Never;
  never: Source;
  const: Source;
  enum: Source;
  primitive: Source;
  array: Source;
  tuple: Source;
  object: Source;
  union: Excluded extends UnionType ? ExcludeUnion<Source, Excluded> : never;
  intersection: ExcludeIntersection<Source, Excluded>;
  exclusion: Excluded extends ExclusionType
    ? ExcludeExclusion<Source, Excluded>
    : never;
  error: Excluded;
  errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends TypeId
  ? Get<Excluded, "type">
  : "errorTypeProperty"];
