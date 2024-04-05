import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';
import cors from 'cors';
import {toArray, isString, toNumber} from './bi';
import activate_db from './db';
import {create_exercise, delete_from, get} from './dbBI';
dotenv.config();

async function create_app(): Promise<express.Application>{
    let client_instance: Client | undefined;
    try{
        client_instance = await activate_db(); // will be undefined if IP blocked
    } catch{
        console.error('Failed to connect to database');
        client_instance = undefined;
    }

    // doc: https://expressjs.com/en/4x/api.html
    const app: express.Application = express();
    app.use(express.json()); 
    app.use(cors({
        origin: 'http://localhost:5173'
    }));

    app.get('/', (_req, _res) => {
        _res.status(200).send("THE SERVER FUCKING WORKS AHAHAHAHAAHH FUCK YEAH");
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
    app.post('/create_exercise', async (_req, _res) => {
        const query = _req.body;
        const name: string | undefined = isString(query.name) ? String(query.name) : undefined;
        const target: string | undefined = isString(query.target) ? String(query.target) : undefined;
        const reps: Number | null = toNumber(query.reps);
        const sets: Number | null = toNumber(query.sets);
        const keywords: string[] | null = toArray(query.keywords);
        const weight: Number | null = toNumber(query.weight);

        if(name === undefined || target === undefined || reps === null || sets === null || keywords === null || weight === null){
            let error_message = "";
            error_message += name === undefined ? ", name is not a string" : "";
            error_message += target === undefined ? ", target is not a string" : "";
            error_message += reps === null ? ", reps is not a number" : "";
            error_message += sets === null ? ", sets is not a number" : "";
            error_message += keywords === null ? ", keywords is not an array" : "";
            _res.status(404).send("Invalid Input" + error_message+ "!");
        } else if (client_instance != undefined){
            const res = await create_exercise(client_instance, name, target, reps, sets, keywords, weight);
            if(res !== false){
                _res.status(200).send(res);
                return;
            }
        } else{_res.status(404).send(false);}
        return;
    });

    app.post('/delete', async (_req, _res) => {
        const query = _req.body;
        const db_name: String | null = isString(query.db_name) ? String(query.db_name) : null;
        const uid: String | null = isString(query.uid) ? String(query.uid) : null;

        if (db_name === null || uid === null){
            let error_message = "";
            error_message += db_name === undefined ? ", db_name is not a string" : "";
            error_message += uid === undefined ? ", uid is not a number" : "";
            _res.status(400).send("Invalid Input" + error_message+ "!");
            return;
        } 

        if(client_instance !== undefined){
            try {
                const res: Boolean = await delete_from(client_instance, db_name, uid);
                if(res){
                    _res.status(200).send({ success: true });
                } else {
                    _res.status(500).send({ success: false });
                }
            } catch(err) {
                console.error(err);
                _res.status(500).send({ success: false });
            }
            return;
        } 

        _res.status(404).send({ success: false });
    });

    app.post('/edit_exercise', (_req, _res) => {
        const e_name = _req.body.exercise_name;
        const e_target = _req.body.exercise_target;
        const n_reps = _req.body.n_reps;
        const n_sets = _req.body.n_sets;
        const keywords = _req.body.arr_keywords;
        const lbs = _req.body.weight;
      
        if(client_instance !== undefined){
          try{
            const query_str: string = `INSERT INTO public.exercises (uid, exercise_name, exercise_target, n_reps, n_sets, arr_keywords, weight) VALUES 
            (gen_random_uuid(), ${e_name}, ${e_target}, ${n_reps}, ${n_sets}, ${keywords}, ${lbs}`;
      
            client_instance.query(query_str);
      
            _res.status(200);
            return;
          }
          catch(err){
            _res.status(404).send('Failed to query database');
      
            return null;
          }
        }else{
          _res.status(404).send('Database not connected');
        }
    });
  
    return app;
}
export default create_app;