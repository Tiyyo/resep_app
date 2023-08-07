import addUnit from "../add.unit";

test("addUnit returns a unit", () => {
    expect(addUnit("calories")).toBe("(kcal)");
    expect(addUnit("proteins")).toBe("(g)");
    expect(addUnit("carbs")).toBe("(g)");
    expect(addUnit("fat")).toBe("(g)");
    expect(addUnit("water")).toBe("(ml)");
    expect(addUnit("")).toBe("");
});