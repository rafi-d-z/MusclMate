import { workout } from './DAO/workout';
import { exercise } from './DAO/exercise';

/**
 * returns if input is a string - not even a string representation of a number
 * @param {any} input 
 * @returns {Boolean} is_string
 */
export function isString(input: any): Boolean{
    const regex = /^[^\w\s]+$/;
    const is_string: Boolean = (
        typeof(input) === 'string' && 
        regex.test(input) === false
    );
    return is_string;
};

/**
 * checks to see if the input is an array or not
 * @param {any} input 
 * @returns {boolean}
 */
export function isArray(input: any): boolean {
    if (typeof input !== 'object') {
        return false;
    }
    return true;
}

export function isNumber(input: any): boolean {
    return typeof input === 'number';
  }

/**
 * returns number representation of input
 * @param {any} input 
 * @returns {number} number
 */
export function toNumber(input: any): Number {
    try{
        const num: Number = Number(input);
        return num;
    } catch{
        throw new Error("Input is not a number")
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
    const empty_workout_query: workout = {
        uid: "",
        workout_name: "",
        exercise_arr: [],
        keywords: []
    };


    // if the workout body does not contain the fields (as incomplete body) - throw error
    if(query.uid === undefined || query.workout_name === undefined || query.exercise_arr === undefined || query.keywords === undefined){
        throw new Error("Malformed input! Workout subobject either missing or incomplete");
    } else if(!isString(query.uid)){
        throw new Error("The 'uid' property of the query object is not a string")
    } else if(!isString(query.workout_name)){
        throw new Error("The 'workout_name' property of the query object is not a string")
    } else if(!isArray(query.exercise_arr)){
        throw new Error("The 'exercise_arr' property of the query object is not an array")
    } else if(!isArray(query.keywords)){
        throw new Error("The 'keywords' property of the query object is not an array")
    }

    // save new data if not empty
    workout_query.uid = query.uid;
    workout_query.workout_name = query.workout_name;
    workout_query.exercise_arr = query.exercise_arr;
    workout_query.keywords = query.keywords;

    if(JSON.stringify(workout_query) === JSON.stringify(empty_workout_query)){
        throw new Error("No workout object found in query")
    }

    return workout_query;
}

export function getExerciseQueries(query: any): exercise {
    let exercise_query: exercise = {
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: []
    };

    const empty_exercise_query: exercise = {
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: []
    };
    // if the exercise body does not contain the fields (as incomplete body) - throw error
    if(
        query.uid === undefined ||
        query.exercise_name === undefined ||
        query.exercise_target === undefined ||
        query.image_url === undefined ||
        query.n_reps === undefined ||
        query.n_sets === undefined ||
        query.weight === undefined ||
        query.arr_keywords === undefined){
        throw new Error("Malformed input! Exercise subobject either missing or incomplete");
    } else if(!isString(query.uid)){
        throw new Error("The 'uid' property of the query object is not a string")
    } else if(!isString(query.exercise_name)){
        throw new Error("The 'exercise_name' property of the query object is not a string")
    } else if(!isString(query.exercise_target)){
        throw new Error("The 'exercise_target' property of the query object is not a string")
    } else if(!isString(query.image_url)){
        throw new Error("The 'image_url' property of the query object is not a string")
    } else if(!isNumber(query.n_reps)){
        throw new Error("The 'n_reps' property of the query object is not a number")
    } else if(!isNumber(query.n_sets)){
        throw new Error("The 'n_sets' property of the query object is not a number")
    } else if(!isNumber(query.weight)){
        throw new Error("The 'weight' property of the query object is not a number")
    } else if(!isArray(query.arr_keywords)){
        throw new Error("The 'arr_keywords' property of the query object is not an array")
    }
    
    // save new data if not empty
    exercise_query.uid = query.uid;
    exercise_query.exercise_name = query.exercise_name;
    exercise_query.exercise_target = query.exercise_target;
    exercise_query.image_url = query.image_url;
    exercise_query.n_reps = query.n_reps;
    exercise_query.n_sets = query.n_sets;
    exercise_query.weight = query.weight;
    exercise_query.arr_keywords = query.arr_keywords;

    if(JSON.stringify(exercise_query) === JSON.stringify(empty_exercise_query)){
        throw new Error("No exercise object found in query")}

    return exercise_query;
}