import { Validation, IValidation } from "./validation";
import { ISchema, ISchemaOptions } from "./schema";
import { required, length, ILengthOptions, range, IRangeOptions } from "./default";

const defaultValidation = new Validation();

defaultValidation.addValidators({
  required,
  length,
  range,
});

export interface IFieldOptions {
  required?: boolean;
  length?: ILengthOptions;
  range?: IRangeOptions;
}

export function createValidation(): IValidation {
  return defaultValidation.clone();
}

export function createSchema<FieldOptions>(options: ISchemaOptions<FieldOptions & IFieldOptions>): ISchema {
  return defaultValidation.createSchema(options);
}

export default defaultValidation;
