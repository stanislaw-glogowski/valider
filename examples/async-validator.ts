import { IValidateParams } from "../src/types";
import { ValidationError } from "../src/validation/error";
import { createSchema } from "../src";

const schema = createSchema({
  fields: [
    {name: "foo", custom: true},
  ],
});

schema.addValidators({
  custom: ({field}: IValidateParams) => new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (field.value === "foo") {
        reject(new Error("bar"));
      }
      resolve();
    }, 1000);
  }),
});

const data = {
  foo: "foo",
};

schema
  .validate(data)
  .catch((err: ValidationError) => console.log("error:", err.format()));

// error: { foo: 'bar' }
