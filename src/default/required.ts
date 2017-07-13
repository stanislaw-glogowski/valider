import { IValidateParams } from "../types";

export const ERR_REQUIRED = "required";

export function required({field}: IValidateParams): void {
  if (!field.value) {
    throw new Error(ERR_REQUIRED);
  }
}
