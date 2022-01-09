import { Get } from "../../utils";

export type ErrorTypeId = "error";

export type Error<M = "Unknown error"> = {
  type: ErrorTypeId;
  message: M;
};

export type ErrorMessage<E> = Get<E, "message">;
