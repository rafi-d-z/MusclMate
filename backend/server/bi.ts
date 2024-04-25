import { workout } from './DAO/workout';

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

/**
 * takes query object - parses through for workout object and returns workout object
 * @param query must contain workout object
 * @returns workout object
 */
export function getWorkoutQueries(query: any): workout {
    let workout_query: workout = {
        uid: "",
        workout_name: "",
        exercise_arr: [],
        keywords: []
    };
    if(query.uid !== undefined){
        workout_query.uid = query.uid;
    } 
    if(query.workout_name !== undefined){
        workout_query.workout_name = query.workout_name;
    }
    if(query.exercise_arr !== undefined){
        workout_query.exercise_arr = query.exercise_arr;
    }
    if(query.keywords !== undefined){
        workout_query.keywords = query.keywords;
    }
    return workout_query;
}