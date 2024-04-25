import { isString } from "../server/bi";

describe("isString unit tests", () => {
    describe("should return true on correct input", () => {
        test("standard string", () => {
            const input: string = "hello";
            const result: Boolean = isString(input);
            expect(result).toStrictEqual(true);
        });

        test("mixed letter number string", () => {
            const input: string = "Hello123";
            const result: Boolean = isString(input);
            expect(result).toStrictEqual(true);
        });

        test("mixed letter symbol string", () => {
            const input: string = "Hello!!!";
            const result: Boolean = isString(input);
            expect(result).toStrictEqual(true);
        });
    });

    describe("should return false on incorrect input", () => {
        test("standard number", () => {
            const input: number = 123;
            const result: Boolean = isString(input);
            expect(result).toStrictEqual(false);
        });
        test("symbols", () => {
            const input: string = "!@#$";
            const result: Boolean = isString(input);
            expect(result).toStrictEqual(false);
        })
    })
})