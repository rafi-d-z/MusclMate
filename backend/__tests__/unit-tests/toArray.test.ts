import { toArray } from "@/bi";

describe('toArray', () => {
    it('should convert a string to an array', () => {
        const result = toArray('["hello"]');
        expect(result).toEqual(['hello']);
    });
    
    it('should convert a string of an empty array', () => {
        const result = toArray('[]');
        expect(result).toEqual([]);
    })

    it('should throw', () => {
        expect(() => toArray('abc')).toThrow();
    });
});
