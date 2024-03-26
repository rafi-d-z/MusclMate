import { Client } from "pg";

export async function get(client: Client, column_name: string, get_items: string, db_name: string){
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

export async function create_exercise(client: Client, item_name: string, target: string, reps: Number, sets: Number, keywords: string[], weight: Number){
    const sql: string = `INSERT INTO public.exercises (uid, exercise_name, exercise_target, n_reps, n_sets,` +
                        ` arr_keywords, weight) VALUES (uuid_generate_v4(), $1, $2,` +
                        ` $3, $4, $5, $6)`;
    const values = [item_name, target, reps, sets, keywords, weight]

    try{
        const res = await client.query(sql, values);
        return true;
    } catch(err) {
        console.error("Problem creating new exercise\n", err);
        return false;
    }
}