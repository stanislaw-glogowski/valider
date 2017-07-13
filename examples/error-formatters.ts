import { ValidationError, FormatterTypes } from "../src/validation/error";
import { createSchema } from "../src";

const schema = createSchema({
  fields: [
    {name: "foo", length: {min: 10}},
    {name: "bar", required: true},
  ],
});

const data = {
  foo: "f",
};

schema
  .validate(data)
  .catch((err: ValidationError) => {
    console.log("error array:", err.formatAs(FormatterTypes.Array));
    console.log("error map:", err.formatAs(FormatterTypes.Map));
    console.log("error custom", err.format((fieldErrors) => fieldErrors.map((fieldError) => fieldError.field.name)));
  });

// error array: [ { name: 'foo', value: 'f', type: 'lengthMin' }, { name: 'bar', value: null, type: 'required' } ]
// error map: { foo: 'lengthMin', bar: 'required' }
// error custom [ 'foo', 'bar' ]
