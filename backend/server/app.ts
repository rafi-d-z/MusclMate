import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';
import cors from 'cors';
import {toArray, isString} from './bi';
import activate_db from './db';
import fs from 'fs';
dotenv.config();

async function create_app(): Promise<express.Application>{
    let client_instance: Client | undefined;
    client_instance = await activate_db();

    // doc: https://expressjs.com/en/4x/api.html
    const app: express.Application = express();

    app.use(cors({
    origin: 'http://localhost:5173'
    }));

    app.get('/', (_req, _res) => {
      _res.status(200).send("TypeScript With Express");
    });

    app.get('/get_exercise', async (_req, _res) => {
    // checking to see if input is valid or nah
    const query = _req.query;
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

    app.post('/create_exercise', (_req, _res) => {
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

    app.post('/edit_exercise', (_req, _res) => {
      const uid = _req.body.uid;
      const e_name = _req.body.exercise_name;
      const e_target = _req.body.exercise_target;
      const n_reps = _req.body.n_reps;
      const n_sets = _req.body.n_sets;
      const keywords = _req.body.arr_keywords;
      const lbs = _req.body.weight;
    
      if(client_instance !== undefined){
        try{
          const query_str: string = `UPDATE public.exercises 
          SET exercise_name = ${e_name}, exercise_target = ${e_target}, n_reps = ${n_reps}, n_sets = ${n_sets}, arr_keywords = ${keywords}, weight = ${lbs}
          WHERE uid = ${uid}`;
    
          client_instance.query(query_str);
    
          _res.status(200);
          return;
        }
    
        catch(err){
          _res.status(404).send('Failed to query database');
        }
      }else{
        _res.status(404).send('Database not connected');
      }
    });

    app.get('/get_mock_exercise', (_req, _res) => {
      const fake_data: string = fs.readFileSync("mock_data.json", 'utf-8');
      const data: { [key: string]: any } = JSON.parse(fake_data);
      const query = _req.query;

      const type: string | undefined = isString(query.type) ? String(query.type) : undefined;
      
      if(type != undefined){
        let new_data: { [key: string]: any } = {};

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
              const subObject = data[key];
              
              for (const subKey in subObject) {
                  if (subObject.hasOwnProperty(subKey) && subKey === "type" && subObject[subKey] === type) {
                    new_data[key] = subObject;
                  }
              }
          }
        }
        _res.send(new_data)
      }
      else{
        _res.send(data);
      }
    })

    return app;
}
export default create_app;