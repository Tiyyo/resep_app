import displayValue
    from "../display.value.one.float";
test("displayValue returns a number with one decimal place", () => {
    expect(displayValue(1)).toBe("1.0");
    expect(displayValue(1.1)).toBe("1.1");
    expect(displayValue(1.11)).toBe("1.1");
    expect(displayValue(1.111)).toBe("1.1");
});