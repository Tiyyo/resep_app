import convertStringToNumber from "../convert.to.number";


describe("convertStringToNumber throws an error", () => {
    test("when value is not a number", async () => {
        await expect(convertStringToNumber({ key: 'a' })).rejects.toThrowError("Invalid values");
    });
    test("when value is negative", async () => {
        await expect(convertStringToNumber({ key: '-1' })).rejects.toThrowError("Invalid values");
    });
    test("when value is Infinity", async () => {
        await expect(convertStringToNumber({ key: 'Infinity' })).rejects.toThrowError("Invalid values");
    });
});

describe("convertStringToNumber returns null", () => {
    test("when value is null", async () => {
        expect(await convertStringToNumber({ key: null })).toEqual({ key: null });
    })
    test("when value is undefined", async () => {
        expect(await convertStringToNumber({ key: undefined })).toEqual({ key: null });
    });
    test("when value is empty string", async () => {
        expect(await convertStringToNumber({ key: '' })).toEqual({ key: null });
    });
})

test("convertStringToNumber returns a number", async () => {
    expect(await convertStringToNumber({ key: '1' })).toEqual({ key: 1 });
    expect(await convertStringToNumber({ key: '1.1' })).toEqual({ key: 1.1 });
    expect(await convertStringToNumber({ key: '1.11' })).toEqual({ key: 1.1 });
    expect(await convertStringToNumber({ key: '0' })).toEqual({ key: 0 });
    expect(await convertStringToNumber({ key: '0.0' })).toEqual({ key: 0 });
    expect(await convertStringToNumber({ key: '1', key2: '2' })).toEqual({ key: 1, key2: 2 });
});