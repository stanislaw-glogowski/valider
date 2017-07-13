import { Validation } from "./validation";
import { Schema } from "./schema";

describe("Validation", () => {
  const validation = new Validation();

  describe("clone()", () => {
    it("should returns instance of Validation", () => {
      expect(validation.clone()).toBeInstanceOf(Validation);
    });
  });

  describe("createSchema()", () => {
    it("should returns instance of Schema", () => {
      expect(validation.createSchema({})).toBeInstanceOf(Schema);
    });
  });
});
