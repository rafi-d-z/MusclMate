import workout from './DAO/workout';
import exercise from './DAO/exercise';

/**
 * returns if input is a string - not even a string representation of a number
 * @param {any} input
 * @returns {Boolean} is_string
 */
export function isString(input: any): Boolean {
    return typeof input === "string";
}

export function toString(input: any): string {
    input = decodeURIComponent(input)
    if (input === null || input === undefined) {
      throw new Error("Input is not valid");  // Handle null and undefined explicitly if needed
    } else if (input === "''" || input === '""'){
      return '';
    }
    return String(input);  // This converts any input to a string, even objects will be "[object Object]"
}

/**
 * checks to see if the input is an array or not
 * @param {any} input
 * @returns {boolean}
 */
export function isArray(input: any): boolean {
  let arr;
  if (Array.isArray(input)){
    return true;
  }
  if (typeof input !== 'object') {
    try{
      arr = JSON.parse(input);
      return isArray(arr);
    } catch {
      return false;
    }
  }

  return true;
}

export function toArray(input: any): string[] {
  if (input === "[]") return [];
  try{ 
    return JSON.parse(input);
  } catch {
    throw new Error("Input is not an array");
  }
}

export function isNumber(input: any): boolean {
  if (typeof input === 'number') {
    return true;
  }
  if (typeof input === 'string') {
    const num = toNumber(input);
    return typeof num === 'number' && !isNaN(num);
  }
  return false;
}

/**
 * returns number representation of input
 * @param {any} input
 * @returns {number} number
 */
export function toNumber(input: any): number {
  try {
    const num: number = Number(input);
    return num;
  } catch {
    throw new Error("Input is not a number");
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
    keywords: [],
  };

  // if the workout body does not contain the fields (as incomplete body) - throw error
  if (
    query.uid === undefined ||
    query.workout_name === undefined ||
    query.exercise_arr === undefined ||
    query.keywords === undefined
  ) {
    throw new Error(
      "Malformed input! Workout subobject either missing or incomplete",
    );
  } else if (!isString(query.uid)) {
    throw new Error("The 'uid' property of the query object is not a string");
  } else if (!isString(query.workout_name)) {
    throw new Error(
      "The 'workout_name' property of the query object is not a string",
    );
  } else if (!isArray(query.exercise_arr)) {
    throw new Error(
      "The 'exercise_arr' property of the query object is not an array",
    );
  } else if (!isArray(query.keywords)) {
    throw new Error(
      "The 'keywords' property of the query object is not an array",
    );
  }

  // save new data if not empty
  workout_query.uid = toString(query.uid);
  workout_query.workout_name = toString(query.workout_name);
  workout_query.exercise_arr = (query.exercise_arr);
  workout_query.keywords = (query.keywords);

  return workout_query;
}

export function getExerciseQueries(query: any): exercise {
  // console.log(query)
  console.log("decoded:", query)
  if(
    query.uid === undefined ||
    query.exercise_name === undefined ||
    query.exercise_target === undefined ||
    query.image_url === undefined ||
    query.n_reps === undefined ||
    query.n_sets === undefined ||
    // query.arr_keywords === undefined ||
    query.weight === undefined){
    console.log("undefined spotted", query)
    throw new Error(`Malformed input! Exercise object either missing or incomplete. Got ${query}`);
  } else if(!isString(query.uid)){
    throw new Error(`The 'uid' property of the query object is not a string. Got ${query.uid}`)
  } else if(!isString(query.exercise_name)){
    throw new Error(`The 'exercise_name' property of the query object is not a string. Got ${query.exercise_name}`)
  } else if(!isString(query.exercise_target)){
    throw new Error(`The 'exercise_target' property of the query object is not a string. Got ${query.exercise_target}`)
  } else if(!isString(query.image_url)){
    throw new Error(`The 'image_url' property of the query object is not a string. Got ${query.image_url}`)
  } else if(!isNumber(query.n_reps)){
    throw new Error(`The 'n_reps' property of the query object is not a number. Got ${query.n_reps}`)
  } else if(!isNumber(query.n_sets)){
    throw new Error(`The 'n_sets' property of the query object is not a number. Got ${query.n_sets}`)
  } else if(!isNumber(query.weight)){
    throw new Error(`The 'weight' property of the query object is not a number. Got ${query.weight}`)
  } else if(query.arr_keywords !== undefined && !isArray(query.arr_keywords) && toString(query.arr_keywords) !== ''){
    throw new Error(`The 'arr_keywords' property of the query object is not an array. Got ${query.arr_keywords}`);    
  } else if(query.arr_keywords === undefined){
    query.arr_keywords = [];
  }
      
  // save new data if not empty
  const exercise_query: exercise = {
    uid: toString(query.uid),
    exercise_name: toString(query.exercise_name),
    exercise_target: toString(query.exercise_target),
    image_url: toString(query.image_url),
    n_reps: toNumber(query.n_reps),
    n_sets: toNumber(query.n_sets),
    weight: toNumber(query.weight),
    arr_keywords: (query.arr_keywords),
    description: query.description ? query.description.toString() : '',
    difficulty: query.difficulty ? query.difficulty.toString() : ''  };
  // console.log(exercise_query)
  return exercise_query;
}