import { IValidateParams } from "../types";

export const ERR_RANGE_MIN = "rangeMin";
export const ERR_RANGE_MAX = "rangeMax";

export interface IRangeOptions {
  min?: number;
  max?: number;
}

export function range({field, options}: IValidateParams): void {
  if (!field.value) {
    return;
  }

  options = options as IRangeOptions;
  const value = parseFloat(field.value) || 0;

  if (options.min && value < options.min) {
    throw new Error(ERR_RANGE_MIN);
  }

  if (options.max && value > options.max) {
    throw new Error(ERR_RANGE_MAX);
  }
}
