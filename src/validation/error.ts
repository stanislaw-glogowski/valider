import { IField } from "../types";

export const ERR_MESSAGE = "VALIDATION_ERROR";
export const ERR_TYPE_UNKNOWN = "unknown";

export enum FormatterTypes {
  Map = "map",
  Array = "array",
}

export type Formatter = (errors: IFieldError[]) => any;

export function mapFormatter(fieldErrors: IFieldError[]): any {
  return fieldErrors.reduce((prev, current: IFieldError) => Object.assign(prev, {
    [current.field.name]: current.type,
  }), {});
}

export function arrayFormatter(fieldErrors: IFieldError[]): any {
  return fieldErrors.map(({field, type}) => ({
    ...field,
    type,
  }));
}

export interface IFieldError {
  field: IField;
  type: string;
}

export interface IValidationError {
  addFieldError(field: IField, type: string): void;
  hasFieldErrors(): boolean;
  formatAs(type: FormatterTypes): any;
  format(formatter?: Formatter): any;
}

export class ValidationError extends Error implements IValidationError {
  private fieldErrors: IFieldError[] = [];

  constructor() {
    super(ERR_MESSAGE);
  }

  public addFieldError(field, type) {
    if (!type) {
      type = ERR_TYPE_UNKNOWN;
    }

    this.fieldErrors.push({
      field,
      type,
    });
  }

  public hasFieldErrors() {
    return !!this.fieldErrors.length;
  }

  public formatAs(type) {
    let result = null;
    switch (type) {
      case FormatterTypes.Map:
        result = this.format(mapFormatter);
        break;
      case FormatterTypes.Array:
        result = this.format(arrayFormatter);
        break;
    }
    return result;
  }

  public format(formatter = mapFormatter) {
    return formatter(this.fieldErrors);
  }
}
