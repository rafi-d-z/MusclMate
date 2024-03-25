import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';
import cors from 'cors';
import {toArray, isString, toNumber} from './bi';
import activate_db from './db';
import { error } from 'console';
dotenv.config();

async function create_app(): Promise<express.Application>{
    let client_instance: Client | undefined;
    // try{
    //     client_instance = await activate_db(); // will be undefined if IP blocked
    // } catch{
    //     console.error('Failed to connect to database');
    //     client_instance = undefined;
    // }

    // doc: https://expressjs.com/en/4x/api.html
    const app: express.Application = express();
    app.use(express.json()); 
    app.use(cors({
        origin: 'http://localhost:5173'
    }));

    app.get('/', (_req, _res) => {
        _res.status(200).send("TypeScript With Express");
        console.log("request recieved");
    });

    /**
     * Get exercise by target and keywords
     * Parameters: target (str), keywords (array)
     */
    app.get('/get_exercise', async (_req, _res) => {
        // checking to see if input is valid or nah
        const query = _req.body;
        const target_is_string: Boolean = isString(query.target);
        const keywords: any = toArray(query.keywords);
        const keywords_is_array = Array.isArray(keywords);

        if (!target_is_string && keywords_is_array){
            _res.status(404).send("Invalid Input\n`keywords` not an array!");
            return null;
        } else if (target_is_string && !keywords_is_array){
            _res.status(404).send("Invalid Input\n`target` not a string!");
            return null;
        } else if (!target_is_string && !keywords_is_array) {
            _res.status(404).send('Invalid input\nExpected `target` as an alphanumeric string and `keywords` as array!');
            return null;
        }
        try{ 
            let query_str: string = `SELECT * FROM public.exercises WHERE exercise_target = $1`;
            let params = [query.target];

            if(keywords.length > 0) {
            let keywords_str: string = 'AND (';
            for (let i = 2; i < keywords.length + 2; i++) {
                keywords_str += `$${i} = ANY(arr_keywords)`;
                if (i < keywords.length + 1) {
                keywords_str += ' OR ';
                }
                params.push(keywords[i]);
            }

            keywords_str += ')';
            query_str += ' ' + keywords_str;
            }
            if (client_instance !== undefined){
            const res = await client_instance.query(query_str, params);
            _res.status(200).send(res.rows);
            return;
            } else{
            _res.status(500).send("Database is currently unavaliable at the moment, please try again later.");
            return;
            }
        } catch (err) {
            _res.status(500).send("Failed to query database");
            return null;
        }
    });

    /**
     * Create an exercise
     * Parameters: name (str), target (str), reps (int), sets (int), keywords (array)
     */
    app.post('/create_exercise', (_req, _res) => {
        const query = _req.body;
        const name: string | undefined = isString(query.name) ? String(query.name) : undefined;
        const target: string | undefined = isString(query.target) ? String(query.target) : undefined;
        const reps: Number | null = toNumber(query.reps);
        const sets: Number | null = toNumber(query.sets);
        const keywords: string[] | null = toArray(query.keywords);

        if(name === undefined || target === undefined || reps === null || sets === null || keywords === null){
            let error_message = "";
            error_message += name === undefined ? ", name is not a string" : "";
            error_message += target === undefined ? ", target is not a string" : "";
            error_message += reps === null ? ", reps is not a number" : "";
            error_message += sets === null ? ", sets is not a number" : "";
            error_message += keywords === null ? ", keywords is not an array" : "";
            _res.status(404).send("Invalid Input" + error_message+ "!");
        } else {
            _res.send("user's data");
        }
    });

    app.post('/edit_exercise', (_req, _res) => {
        _res.send("user's data");
    });
    return app;
}
export default create_app;