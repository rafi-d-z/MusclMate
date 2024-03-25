export function isString(input: any){
    const is_string: Boolean = (
        typeof input === 'string' && 
        isNaN(Number(input))
    );
    return is_string;
};

/**
 * assumes input is encoded JSON of an array
 * @param {String} input 
 * @returns {Array | Boolean} array if array, else false
 */
export function toArray(input: any): Array<string> | null {
    let keywords;
    if (typeof input === 'string') {
        try {
            keywords = JSON.parse(decodeURIComponent(input));
            return keywords;
        } catch (err) {
            return null;
        }
    }
    return null;
}