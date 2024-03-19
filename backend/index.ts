import express from 'express';
import client from './db.config';
import dotenv from 'dotenv';
import { Client } from 'pg';
dotenv.config();

// postgres aws db
async function activate_db() {
    console.log("Connecting to Database ...");
    try {
      await client.connect();
      console.log("Database connected");
      return client;
    } catch (err: any) {
      console.error('Database connection error', err.stack);
    } 
    // finally {
    //     await client.end();
    // }
}
let client_instance: Client | undefined;
(async () => {
  client_instance = await activate_db();
})();

// doc: https://expressjs.com/en/4x/api.html
const app: express.Application = express();
const port: number = 3000;

app.get('/', (_req, _res) => {
	_res.status(200).send("TypeScript With Express");
});

app.get('/get_exercise', async (_req, _res) => {
  // checking to see if input is valid or nah
  const query = _req.query;
  const target_is_string: Boolean = (
    typeof query.target === 'string' && 
    query.target.trim() !== '' &&
    isNaN(Number(query.target))
  );
  let keywords;
  let keywords_is_array: Boolean = false;
  if (typeof query.keywords === 'string') {
    try {
      keywords = JSON.parse(decodeURIComponent(query.keywords));
      keywords_is_array = Array.isArray(keywords);
    } catch (err) {
      _res.status(404).send('Failed to parse keywords');
      return null;
    }
  }

  if (target_is_string && keywords_is_array) {
    // query the database
    if(client_instance !== undefined) {
      try{
        const query_str: string = `SELECT * FROM public.exercises WHERE exercise_target = '${query.target}'`;
        let keywords_str: string = keywords.length>0 ? 'AND (' : '';

        if(keywords.length > 0) {
          for (let i = 0; i < keywords.length; i++) {
            keywords_str += `'${keywords[i]}' = ANY(arr_keywords)`;
            if (i < keywords.length - 1) {
              keywords_str += ' OR ';
            }
          }
          keywords_str += ');';
        }
        const res = await client_instance.query(`${query_str} ${keywords_str}`);

        _res.status(200).send(res.rows);
        return;
      } catch (err) {
        _res.status(404).send("Failed to query database");
        return null;
      }
    } else{
      _res.status(404).send("Database not connected");
      return null;
    }

    _res.status(200).send("Proper Query Recieved");
  } else if (target_is_string){
    _res.status(404).send("Invalid Input\n`keywords` not an array!");
    return null;
  } else if (keywords_is_array){
    _res.status(404).send("Invalid Input\n`target` not a string!");
    return null;
  } else {
    _res.status(404).send('Invalid input\nExpected `target` as string and `keywords` as array!');
    return null;
  }
});

app.post('/create_exercise', (_req, _res) => {
  _res.send("user's data");
});

app.post('/edit_exercise', (_req, _res) => {
  _res.send("user's data");
});

// Server setup
app.listen(port, () => {
	console.log(`Server up at: http://localhost:${port}/`);
});

export { app };