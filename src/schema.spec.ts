import { Schema } from "./schema";

describe("Schema", () => {
  const schema = new Schema({
    fields: [
      {name: "foo"},
      {name: "bar"},
    ],
  });

  describe("validate()", () => {
    it("should returns all schema fields", async () => {
      const unknown = {
        unknown: "unknown",
      };

      const data = {
        foo: "bar",
        bar: "foo",
      };

      expect(await schema.validate({
        ...unknown,
        ...data,
      })).toEqual(data);
    });
  });
});
