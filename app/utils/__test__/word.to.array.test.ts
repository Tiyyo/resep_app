import wordsToArray from "../word.to.array";

test("wordsToArray returns an array of words", () => {
    expect(wordsToArray("hello world")).toEqual(["hello", "world"]);
    expect(wordsToArray("hello_world")).toEqual(["hello_world"]);
})