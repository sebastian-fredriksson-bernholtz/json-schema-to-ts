import { Get } from "../../utils";

export type ErrorType = "error";

export type Error<M = "Unknown error"> = {
  type: ErrorType;
  message: M;
};

export type ErrorMessage<E> = Get<E, "message">;
