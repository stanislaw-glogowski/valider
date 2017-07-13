export interface IField {
  name: string;
  value: any;
}

export interface IValidateParams {
  field?: IField;
  data?: {};
  options?: any;
}

export type Validate = (params: IValidateParams) => Promise<void> | void;

export interface IValidator {
  name: string;
  validate: Validate;
}
