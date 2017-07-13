import * as mixins from "./mixins";
import { IField, IValidator } from "./types";
import { ValidationError } from "./validation/error";

export const ERR_MISSING_SCHEMA_FIELD_NAME = "Missing schema field name";

export interface ISchemaFieldOptions {
  name: string;
  [key: string]: any;
}

export interface ISchemaOptions<FieldOptions = {}> {
  throwOnFirstError?: boolean;
  throwOnComplete?: boolean;
  returnError?: boolean;
  fields?: Array<ISchemaFieldOptions & FieldOptions>;
}

export interface ISchema extends mixins.IValidators {
  validate(data: {}): Promise<{}>;
}

export class Schema extends mixins.Validators implements ISchema {
  constructor(private options: ISchemaOptions = {}, validators: IValidator[] = []) {
    super(validators);

    this.options = {
      throwOnFirstError: false,
      throwOnComplete: true,
      returnError: false,
      fields: [],
      ...options,
    };
  }

  public async validate(data) {
    let result = {};

    const error = new ValidationError();

    if (!data || typeof data !== "object") {
      data = {};
    }

    for (const fieldSchema of this.options.fields) {
      const {name} = fieldSchema;

      if (!name) {
        throw new Error(ERR_MISSING_SCHEMA_FIELD_NAME);
      }

      const field: IField = {
        name,
        value: data[name] || null,
      };

      try {
        for (const validator of this.validators) {
          const options = fieldSchema[validator.name];
          if (options) {
            await validator.validate({
              field,
              data,
              options,
            });
          }
        }

        result[field.name] = field.value;
      } catch (err) {
        error.addFieldError(field, err.message);
        if (this.options.throwOnFirstError) {
          throw error;
        }
      }
    }

    if (error.hasFieldErrors()) {
      if (this.options.throwOnComplete) {
        throw error;
      }

      if (this.options.returnError) {
        result = error;
      }
    }

    return result;
  }
}
