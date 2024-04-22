import { Client } from "pg";

export async function get(client: Client, column_name: string, get_items: string, db_name: string): Promise<Array<any> | undefined>{
    const sql: string = `SELECT ${column_name} FROM ${db_name} WHERE ${column_name} LIKE $1 ORDER BY uid ASC`; 
    const values = [`%${get_items}%`];

    try{
        const res = await client.query(sql, values);
        return res.rows;
    } catch(err) {
        console.error("Problem fetching\n", err);
        return undefined;
    }
}

export async function create_exercise(client: Client, item_name: string, target: string, reps: Number, sets: Number, keywords: string[], weight: Number): Promise<Boolean>{
    const sql: string = `INSERT INTO public.exercises (uid, exercise_name, exercise_target, n_reps, n_sets,` +
                        ` arr_keywords, weight) VALUES (uuid_generate_v4(), $1, $2,` +
                        ` $3, $4, $5, $6)`;
    const values: string[] = [item_name, target, reps.toString(), sets.toString(), keywords.toString(), weight.toString()]

    try{
        await client.query(sql, values);
        return true;
    } catch(err) {
        console.error("Problem creating new exercise\n", err);
        return false;
    }
}

export async function delete_from(client: Client, table_name: String, uid: String){
    const sql: string = `DELETE FROM public.${table_name} WHERE uid = $1`;
    const values = [uid];

    try{
        await client.query(sql, values);
        return true;
    } catch(err){
        console.error("Problem creating new exercise\n", err);
        return false;
    }
}

/**
 * edit a row in exercise with given value
 * new_value must be the in the same structure as what was returned from get()
 * @param client client instance
 * @param new_value object representing all updated values
 * @param 
 */
export async function edit_exercise(client: Client, uid: String, new_value: Object){
    const sql: string = `UPDATE? public.exercises (uid, exercise_name, exercise_target, 
                        n_reps, n_sets, arr_keywords, weight) VALUES $1 WHERE uid = $2` ;
    const values = [uid, new_value];

    try{
        await client.query(sql, values);
        return true;
    } catch(err){
        console.error("Problem creating new exercise\n", err);
        return false;
    }

}