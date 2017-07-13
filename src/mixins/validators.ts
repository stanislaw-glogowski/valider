import { IValidator, Validate } from "../types";

export interface IValidators {
  addValidators(validators: { [key: string]: Validate }): this;
}

export class Validators implements IValidators {
  protected validators: IValidator[];

  constructor(validators: IValidator[] = []) {
    this.validators = [...validators];
  }

  public addValidators(validators) {
    Object.entries<Validate>(validators).forEach(([name, validate]) => {
      this.validators.push({
        name,
        validate,
      });
    });

    return this;
  }
}