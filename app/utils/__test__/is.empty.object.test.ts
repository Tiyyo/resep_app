import isEmptyObject from "../is.empty.object";

test("isEmptyObject returns true if object is empty", () => {
    expectTypeOf(isEmptyObject({})).toEqualTypeOf<boolean>();
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 1 })).toBe(false);
});