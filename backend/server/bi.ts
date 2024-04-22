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
 * checks to see if the input is an array or not
 * @param {any} input 
 * @returns {boolean}
 */
export function isArray(input: any): boolean {
    if (typeof input === 'string') {
        return false;
    }
    return true;
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