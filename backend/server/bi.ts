import { workout } from "./DAO/workout";

/**
 * returns if input is a string - not even a string representation of a number
 * @param {any} input
 * @returns {Boolean} is_string
 */
export function isString(input: any): Boolean {
  const regex = /^[^\w\s]+$/;
  const is_string: Boolean =
    typeof input === "string" && regex.test(input) === false;
  return is_string;
}

/**
 * checks to see if the input is an array or not
 * @param {any} input
 * @returns {boolean}
 */
export function isArray(input: any): boolean {
  if (typeof input !== "object") {
    return false;
  }
  return true;
}

/**
 * returns number representation of input
 * @param {any} input
 * @returns {number} number
 */
export function toNumber(input: any): Number {
  try {
    const num: Number = Number(input);
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
  const empty_workout_query: workout = {
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
  workout_query.uid = query.uid;
  workout_query.workout_name = query.workout_name;
  workout_query.exercise_arr = query.exercise_arr;
  workout_query.keywords = query.keywords;

  return workout_query;
}
