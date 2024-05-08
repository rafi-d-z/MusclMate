import { toNumber } from "@/bi";

describe("toNumber unit tests", () => {
    describe("should return true on correct input", () => {
        test("integer", () => {
            const input: number = 123;
            const result: Number = toNumber(123);
            expect(result).toStrictEqual(123);
        });

        test("float", () => {
            const input: number = 123.456;
            const result: Number = toNumber(input);
            expect(result).toStrictEqual(123.456);
        });
    });

    describe("should return false on incorrect input", () => {
        test("array", () => {
            const input: Array<number> = [1, 2, 3];
            const result: Number = toNumber(input);
            expect(result).toStrictEqual(NaN);
        });
        test("string", () => {
            const input: string = "not a number"
            const result: Number = toNumber(input);
            expect(result).toStrictEqual(NaN);
        })
    })
})