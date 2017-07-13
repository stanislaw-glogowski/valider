import { range, ERR_RANGE_MIN, ERR_RANGE_MAX } from "./range";

describe("internal.range", () => {
  const field = {
    name: "foo",
    value: 2,
  };

  it("doesn't throw when value is in range", () => {
    const options = {
      min: 1,
      max: 3,
    };

    expect(() => range({field, options})).not.toThrow();
  });

  it(`throws "${ERR_RANGE_MIN}" when value is too low`, () => {
    const options = {
      min: 3,
    };

    expect(() => range({field, options})).toThrow(ERR_RANGE_MIN);
  });

  it(`throws "${ERR_RANGE_MAX}" when value is too height`, () => {
    const options = {
      max: 1,
    };

    expect(() => range({field, options})).toThrow(ERR_RANGE_MAX);
  });
});
