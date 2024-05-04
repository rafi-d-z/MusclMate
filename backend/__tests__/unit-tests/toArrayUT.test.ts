import { toArray } from '../../server/bi';

describe('toArray', () => {
    it('should convert a string to an array', () => {
        const result = toArray('["hello"]');
        expect(result).toEqual(['hello']);
    });

    it('should throw', () => {
        expect(() => toArray('abc')).toThrow();
    });
});
