import * as mixins from "./mixins";
import { Schema, ISchema, ISchemaOptions } from "./schema";

export interface IValidation extends mixins.IValidators {
  clone(): IValidation;
  createSchema<FieldOptions = {}>(options: ISchemaOptions<FieldOptions>): ISchema;
}

export class Validation extends mixins.Validators implements IValidation {
  public clone() {
    return new Validation([...this.validators]);
  }

  public createSchema<FieldOptions = {}>(options) {
    return new Schema(options, [...this.validators]);
  }
}
