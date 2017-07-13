import { IValidateParams } from "../src/types";
import { ValidationError, FormatterTypes } from "../src/validation/error";
import { createSchema } from "../src";

const schema = createSchema({
  fields: [
    {name: "foo", custom: true},
  ],
});

schema.addValidators({
  custom: ({field}: IValidateParams) => {
    if (field.value === "foo") {
      throw new Error("bar");
    }
  },
});

const data = {
  foo: "foo",
};

schema
  .validate(data)
  .catch((err: ValidationError) => console.log("error:", err.formatAs(FormatterTypes.Map)));

// error: { foo: 'bar' }
