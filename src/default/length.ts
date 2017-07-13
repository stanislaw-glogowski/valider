import { IValidateParams } from "../types";

export const ERR_LENGTH_MIN = "lengthMin";
export const ERR_LENGTH_MAX = "lengthMax";

export interface ILengthOptions {
  min?: number;
  max?: number;
}

export function length({field, options}: IValidateParams): void {
  if (!field.value) {
    return;
  }

  options = options as ILengthOptions;
  const value = `${field.value}`;

  if (options.min && value.length < options.min) {
    throw new Error(ERR_LENGTH_MIN);
  }

  if (options.max && value.length > options.max) {
    throw new Error(ERR_LENGTH_MAX);
  }
}
