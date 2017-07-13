# Valider

Object schema validator

## Installation

```bash
$ npm install valider --save
```

## Features

 * Internal validators (required, length, range)
 * Custom validators per validation or schema
 * Supports async validators
 * ValidationError formatters
 * TypeScript ready

## Examples

Creating validation schema on global validation. Validates schema using internal validators.

```typescript
import { createSchema } from "valider"

const schema = createSchema({
  fields: [
    {name: "foo", required: true, length: {min: 1, max: 3}},
    {name: "bar", range: {min: 1, max: 3}},
  ],
});

const data = {
  foo: "f",
  bar: 1,
  unknown: "unknown",
};

schema
  .validate(data)
  .then((data) => console.log("data:", data));

// data: { foo: 'f', bar: 1 }
```

More complex example demonstrating usage local validation with custom validator.

```typescript
import { IValidateParams } from "valider/types";
import { ValidationError } from "valider/validation/error";
import { createValidation } from "valider";

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
```

More examples can be found in [examples](examples) directory.

## License

The MIT License