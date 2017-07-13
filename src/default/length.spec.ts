import { length, ERR_LENGTH_MIN, ERR_LENGTH_MAX } from "./length";

describe("internal.length", () => {
  const field = {
    name: "foo",
    value: "bar",
  };

  it("doesn't throw when value length is correct", () => {
    const options = {
      min: 1,
      max: 4,
    };

    expect(() => length({field, options})).not.toThrow();
  });

  it(`throws "${ERR_LENGTH_MIN}" when value is too short`, () => {
    const options = {
      min: 4,
    };

    expect(() => length({field, options})).toThrow(ERR_LENGTH_MIN);
  });

  it(`throws "${ERR_LENGTH_MAX}" when value is too long`, () => {
    const options = {
      max: 2,
    };

    expect(() => length({field, options})).toThrow(ERR_LENGTH_MAX);
  });
});
