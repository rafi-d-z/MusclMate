import { Client } from "pg";
import exercise from "./DAO/exercise";
import workout from "./DAO/workout";

/* Exercise Functions -- old (have no unit tests) */
export async function get_exercise_by_uid(
  client: Client,
  uid: string,
): Promise<Array<any> | undefined> {
  const sql: string = "SELECT * FROM public.exercises WHERE uid = $1;";
  const values = [uid];

  const query = {
    name: "fetch-exercise-uid",
    text: sql,
    values: values,
  };

  try {
    const res = await client.query(query);
    return res.rows;
  } catch (err) {
    console.error("Problem fetching\n", err);
    return undefined;
  }
}

export async function get_exercises(
  client: Client,
  exerciseQuery: exercise
): Promise<Array<Object> | undefined> {
  let conditions: Array<string> = [];
  let values: Array<any> = [];
  let index = 1;

  if (exerciseQuery.exercise_name != "") {
    conditions.push(`exercise_name = $${index++}`);
    values.push(exerciseQuery.exercise_name);
  }
  if (exerciseQuery.exercise_target != "") {
    conditions.push(`exercise_target = $${index++}`);
    values.push(exerciseQuery.exercise_target);
  }
  if (exerciseQuery.image_url != "") {
    conditions.push(`image_url = $${index++}`);
    values.push(exerciseQuery.image_url);
  }
  if (exerciseQuery.n_reps > 0) {
    conditions.push(`n_reps = $${index++}`);
    values.push(exerciseQuery.n_reps);
  }
  if (exerciseQuery.n_sets > 0) {
    conditions.push(`n_sets = $${index++}`);
    values.push(exerciseQuery.n_sets);
  }
  if (exerciseQuery.arr_keywords != undefined && exerciseQuery.arr_keywords.length > 0) {
    conditions.push(`arr_keywords = $${index++}`);
    values.push(exerciseQuery.arr_keywords);
  }
  if (exerciseQuery.weight > 0) {
    conditions.push(`weight = $${index++}`);
    values.push(exerciseQuery.weight);
  }
  

  const sql_string = "SELECT * FROM public.exercises" + 
                      (conditions.length > 0 ? ` WHERE ${conditions.join(" OR ")}` : "");
  const query = {
    text: sql_string,
    values: values,
  };

  const res = await query_db(client, query);
  return res;
}

export async function create_exercise(
  client: Client,
  exercise: exercise
  ): Promise<string | null> {
  const sql: string =
    `INSERT INTO public.exercises (uid, exercise_name, exercise_target, n_reps, n_sets,` +
    ` arr_keywords, weight, image_url, description, difficulity, creator) VALUES (uuid_generate_v4(), $1, $2,` +
    ` $3, $4, $5, $6, $7, $8, $9, $10) RETURNING uid`;
  const values = [
    exercise.exercise_name,
    exercise.exercise_target,
    exercise.n_reps,
    exercise.n_sets,
    [],
    exercise.weight,
    exercise.image_url,
    exercise.description,
    exercise.difficulity,
    exercise.creator
  ];

  const query = {
    text: sql,
    values: values
  }

  const result = await query_db(client, query);
  return result[0].uid;
}

export async function delete_exercise(
  client: Client,
  exercise: exercise
) {
  const sql: string = `DELETE FROM public.exercises WHERE uid = $1`;
  const values = [exercise.uid];

  const query = {
    text: sql,
    values: values
  }

  try{
    const res = await query_db(client, query);
    return res;
  } catch(err: any){
    return err.toString();
  }
}

export async function edit_exercise(
  client: Client,
  exercise: any
  ) {
  const sql: string = `UPDATE public.exercises SET exercise_name = $2, exercise_target = $3, n_reps = $4, n_sets = $5, ` +
                      `arr_keywords = $6, weight = $7, image_url = $8, difficulity = $9, description = $10 WHERE uid` +
                      ` = $1 RETURNING uid;`;
  const values = [exercise.uid, exercise.exercise_name, exercise.exercise_target, exercise.n_reps, exercise.n_sets, [], 
                  exercise.weight, exercise.image_url, exercise.difficulity, exercise.description];

  const query = {
    text: sql,
    values: values
  }

  try{
    const res = await query_db(client, query);
    return res;
  } catch (err: any) {
    return err.toString();
  }
}

/* Workout Functions - passes all unit tests */
export async function get_workouts(client: Client, search_criteria: workout): Promise<Array<workout>>{
  let conditions: Array<string> = [];
  let values_workout: Array<any> = [];
  let index = 1;
  let allowOthers = true;

  if (search_criteria.uid != "") {
    conditions.push(`uid = $${index++}`);
    values_workout.push(search_criteria.uid);
    allowOthers = false;
  }
  if (search_criteria.workout_name != "" && allowOthers) {
    conditions.push(`workout_name = $${index++}`);
    values_workout.push(search_criteria.workout_name);
  }
  if (search_criteria.exercise_arr.length > 0 && allowOthers) {
  conditions.push(`exercise_arr = $${index++}`);
  values_workout.push(search_criteria.exercise_arr);
  }
  if (search_criteria.keywords.length > 0 && allowOthers) {
    conditions.push(`keywords = $${index++}`);
    values_workout.push(search_criteria.keywords);
  }
  
  const sql_workout: string =
    "SELECT * FROM public.workout_plans" +
    (conditions.length > 0 ? ` WHERE ${conditions.join(" OR ")}` : "") + " ORDER BY uid ASC;";

  const query_workout = {
    text: sql_workout,
    values: values_workout,
  };

  const workout_without_exercises = await query_db(client, query_workout);


  // get all exercises for each workout
  const sql_exercises: string = "SELECT * FROM public.exercises WHERE uid = ANY($1)";

  const workoutsWithExercises:Array<workout> = await Promise.all(workout_without_exercises.map(async (workout: workout) => {
    const query_exercises = {
      text: sql_exercises,
      values: [workout.exercise_arr],
    };

    const exercises = await query_db(client, query_exercises);
    workout.exercise_arr = exercises;
    return workout;
  }));

  return workoutsWithExercises;
}

export async function create_workout(client: Client, new_workout: workout): Promise<string | undefined>{
  const sql: string = `INSERT INTO public.workout_plans (uid, exercise_arr, keywords, workout_name)` +
                      ` VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING uid`;
  const values = [new_workout.exercise_arr, new_workout.keywords, new_workout.workout_name]
  const query = {
    name: "create-workout",
    text: sql,
    values: values
  }

  const result = await query_db(client, query);
  return result[0].uid;
}

export async function edit_workout(client: Client, updated_workout: workout): Promise<string | undefined> {
  const sql: string = `UPDATE public.workout_plans SET exercise_arr = $2, keywords = $3, workout_name = $4 WHERE uid = $1 RETURNING uid;`;
  const values = [updated_workout.uid, updated_workout.exercise_arr, updated_workout.keywords, updated_workout.workout_name];
  const query = {
    name: "updated-workout",
    text: sql,
    values: values
  };

  const result = await query_db(client, query);
  return result[0].uid;
}

export async function delete_workout(client: Client, workout_to_delete: workout): Promise<boolean | undefined>{
  const sql: string = `DELETE FROM public.workout_plans WHERE uid = $1;`;
  const values = [workout_to_delete.uid];
  const query = {
    name: "delete-workout",
    text: sql,
    values: values
  };

  try{
    const _ = await query_db(client, query);
    return true;
  } catch(err:any){
    console.error("Problem deleting workout\n", err.stack);
    return undefined;
  }

}

async function query_db(client: Client, query: any): Promise<Array<any>>{
  try {
    console.log("Performing Query:", query)

    const result = await client.query(query);
    const res = result.rows; 
    return res;
  } catch (err: any) {
    console.error("Problem querying database\n", err.toString());
    throw new Error(`Problem querying database, possible malformed input. Tried to perform ${query.text, query.values}`);
  }
}
