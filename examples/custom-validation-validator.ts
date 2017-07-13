import { IValidateParams } from "../src/types";
import { ValidationError } from "../src/validation/error";
import { createValidation } from "../src";

const validation = createValidation();

validation.addValidators({
  custom: ({field, options}: IValidateParams) => {
    console.log("options:", options);
    if (field.value === "bar") {
      throw new Error("bar");
    }
  },
});

const schema = validation.createSchema({
  fields: [
    {name: "foo", custom: {bar: true}},
  ],
});

schema
  .validate({
    foo: "bar",
  })
  .catch((err: ValidationError) => console.log("error:", err.format()));

// options: { bar: true }
// error: { foo: 'bar' }
