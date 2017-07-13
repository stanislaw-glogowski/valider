import { ValidationError, FormatterTypes } from "./error";

describe("ValidationError", () => {
  it("checks if error is instance of Error", () => {
    expect(new ValidationError()).toBeInstanceOf(Error);
  });

  describe("addFieldError()", () => {
    const error = new ValidationError();
    const field = {
      name: "foo",
      value: "bar",
    };

    test("adding new field error", () => {
      const type = "err";
      error.addFieldError(field, "err");

      expect(error.format()).toEqual({
        [field.name]: type,
      });
    });
  });

  describe("hasFieldErrors()", () => {
    test("when no errors", () => {
      expect((new ValidationError()).hasFieldErrors()).toBeFalsy();
    });

    test("when has errors", () => {
      const error = new ValidationError();
      error.addFieldError({name: "foo", value: null}, "bar");
      expect(error.hasFieldErrors()).toBeTruthy();
    });
  });

  describe("formatAs()", () => {
    const error = new ValidationError();
    const fieldFoo = {
      name: "foo",
      value: "bar",
    };
    const fieldBar = {
      name: "bar",
      value: "foo",
    };
    const typeFoo = "foo";
    const typeBar = "bar";

    error.addFieldError(fieldFoo, typeFoo);
    error.addFieldError(fieldBar, typeBar);

    test(`formatting as "${FormatterTypes.Map}"`, () => {
      expect(error.formatAs(FormatterTypes.Map)).toEqual({
        [fieldFoo.name]: typeFoo,
        [fieldBar.name]: typeBar,
      });
    });

    test(`formatting as "${FormatterTypes.Array}"`, () => {
      expect(error.formatAs(FormatterTypes.Array)).toEqual([{
        ...fieldFoo,
        type: typeFoo,
      }, {
        ...fieldBar,
        type: typeBar,
      }]);
    });
  });
});
