import { required, ERR_REQUIRED } from "./required";

describe("internal.required", () => {
  it("doesn't throw when value is defined", () => {
    const field = {
      name: "foo",
      value: "bar",
    };

    expect(() => required({field})).not.toThrow();
  });

  it(`throws "${ERR_REQUIRED}" when value is null`, () => {
    const field = {
      name: "foo",
      value: null,
    };

    expect(() => required({field})).toThrow(ERR_REQUIRED);
  });
});
