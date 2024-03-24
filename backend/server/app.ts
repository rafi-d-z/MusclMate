import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';
import cors from 'cors';
import {toArray, isString} from './bi';
import activate_db from './db';
dotenv.config();

let client_instance: Client | undefined;
// (async () => {
//   client_instance = await activate_db();
// })();

// doc: https://expressjs.com/en/4x/api.html
const app: express.Application = express();

app.use(cors({
  origin: 'http://localhost:5173/'
}));

app.get('/', (_req, _res) => {
    _res.status(200).send("TypeScript With Express");
    console.log("request recieved");
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
  _res.send("user's data");
});

app.post('/edit_exercise', (_req, _res) => {
  _res.send("user's data");
});

export { app, activate_db };