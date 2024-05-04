import { isNumber } from '../server/bi';

describe('isNumber', () => {
    test('should return true for valid numbers', () => {
        expect(isNumber(42)).toBe(true);
        expect(isNumber(3.14)).toBe(true);
        expect(isNumber(-10)).toBe(true);
    });

    test('should return false for non-numbers', () => {
        expect(isNumber('42')).toBe(false);
        expect(isNumber('3.14')).toBe(false);
        expect(isNumber('abc')).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber(undefined)).toBe(false);
        expect(isNumber({})).toBe(false);
        expect(isNumber([])).toBe(false);
        expect(isNumber(true)).toBe(false);
        expect(isNumber(false)).toBe(false);
    });
});
