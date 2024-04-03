/**
 * returns if input is a string - not even a string representation of a number
 * @param {any} input 
 * @returns {Boolean} is_string
 */
export function isString(input: any): Boolean{
    const is_string: Boolean = (
        typeof input === 'string' && 
        isNaN(Number(input))
    );
    return is_string;
};

/**
 * assumes input is encoded JSON of an array
 * @param {String} input 
 * @returns {Array | Boolean} array if array, else null
 */
export function toArray(input: any): Array<string> | null {
    let keywords;
    if (typeof input === 'string') {
        try {
            keywords = JSON.parse(decodeURIComponent(input));
            if (!Array.isArray(keywords)) {
                return null;
            }
            return keywords;
        } catch (err) {
            return null;
        }
    }
    return null;
}

/**
 * returns number representation of input
 * @param {any} input 
 * @returns {number} number
 */
export function toNumber(input: any): Number | null {
    try{
        const num: Number = Number(input);
        return num;
    } catch{
        return null;
    }
}