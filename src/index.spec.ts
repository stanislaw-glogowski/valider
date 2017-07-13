import { createSchema } from "./index";
import { ValidationError } from "./validation/error";

describe("defaultValidation", () => {
  describe("createSchema()", () => {
    const schema = createSchema({
      fields: [
        {name: "foo", required: true, length: {min: 1, max: 3}},
        {name: "bar", range: {min: 1, max: 3}},
      ],
    });

    it("should returns all matched fields", async () => {
      const data = {
        foo: "bar",
        bar: null,
      };

      expect(await schema.validate(data)).toEqual(data);
    });

    it("should throw ValidationError", async () => {
      const data = {
        foo: "bar",
        bar: 5,
      };

      await expect(schema.validate(data)).rejects.toBeInstanceOf(ValidationError);
    });
  });
});
