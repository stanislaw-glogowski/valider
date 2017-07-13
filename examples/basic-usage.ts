import { createSchema } from "../src";

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
