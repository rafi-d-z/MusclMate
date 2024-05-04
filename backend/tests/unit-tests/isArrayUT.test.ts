import { isArray } from "../../server/bi";

describe("isArray unit tests", () => {
    describe("should return true on correct input", () => {
        test("uniform content array", () => {
            const input: Array<number> = [1, 2, 3];
            const result: Boolean = isArray(input);
            expect(result).toStrictEqual(true);
        });

        test("mixed content array number string", () => {
            const input: Array<any> = ["1", 2, "what the sigma", ".", "%"];
            const result: Boolean = isArray(input);
            expect(result).toStrictEqual(true);
        });
    });

    describe("should return false on incorrect input", () => {
        test("standard number", () => {
            const input: number = 123;
            const result: Boolean = isArray(input);
            expect(result).toStrictEqual(false);
        });
        test("malformed array", () => {
            const input: string = "[element, element2]"
            const result: Boolean = isArray(input);
            expect(result).toStrictEqual(false);
        })
    })
})