import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';
import cors from 'cors';
import { isArray, isString, toNumber, getWorkoutQueries } from './bi';
import activate_db from './db';
import fs from 'fs';
dotenv.config();
import { create_exercise, delete_from, get_exercise_by_uid, get_workouts } from './dbBI';
import { workout } from './DAO/workout';

async function create_app(): Promise<Array<any>>{
  let client_instance: Client | undefined;
  try{
    client_instance = await activate_db();
    client_instance = await activate_db(); // will be undefined if IP blocked
  } catch{
    console.error('Failed to connect to database');
    client_instance = undefined;
    console.error('Failed to connect to database');
    client_instance = undefined;
  }

  // doc: https://expressjs.com/en/4x/api.html
  const app: express.Application = express();
  app.use(cors({
    origin: ['https://muscl-mate.vercel.app', 'http://localhost:5173']
  }));
  app.use(express.json()); 


  app.get('/', (_req, _res) => {
    _res.status(200).send("TypeScript With Express");
  });

  app.get('/get_exercise', async (_req, _res) => {
    // checking to see if input is valid or nah
    const query: any = _req.body;
    const uid: string | null = isString(query.uid) ? String(query.uid) : null;

    if(uid === null){
      let error_message = "";
      error_message += uid === null ? ", uid is not a string" : "";
      _res.status(404).send("Invalid Input" + error_message+ "!");
    } else if (client_instance != undefined){
      try{ 
        const res = get_exercise_by_uid(client_instance, query.uid);
        if(res !== undefined){
          _res.status(200).send(res);
        } else {
          _res.status(500).send("Failed to query database");
        }
      } catch(err){
        console.error(err);
        _res.status(500).send("Failed to query database");
      }
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
    const isKeywords: boolean = isArray(query.keywords);
    const weight: Number | null = toNumber(query.weight);

    if(name === undefined || target === undefined || reps === null || sets === null || isKeywords === false || weight === null){
      let error_message = "";
      error_message += name === undefined ? ", name is not a string" : "";
      error_message += target === undefined ? ", target is not a string" : "";
      error_message += reps === null ? ", reps is not a number" : "";
      error_message += sets === null ? ", sets is not a number" : "";
      error_message += isKeywords === false ? ", keywords is not an array" : "";
      _res.status(404).send("Invalid Input" + error_message+ "!");
    } else if (client_instance != undefined){
      const res = await create_exercise(client_instance, name, target, reps, sets, query.keywords, weight);
      if(res !== null){
        _res.status(200).send({"uid": res});
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

  app.get('/get_mock_exercise', (_req, _res) => {
    const fake_data: string = fs.readFileSync("mock_data.json", 'utf-8');
    const data: { [key: string]: any } = JSON.parse(fake_data);
    const query = _req.query;

    const type: string | undefined = isString(query.type) ? String(query.type) : undefined;
    
    if(type != undefined){
      let new_data: any[] = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const subObject = data[key];
          
          for (const subKey in subObject) {
            if (subObject.hasOwnProperty(subKey) && subKey === "type" && subObject[subKey] === type) {
              new_data.push(subObject);
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



  app.get("/get_workouts", async (_req, _res) => {
    const query = _req.body;
    let workoutQuery: workout = {
      uid: "",
      workout_name: "",
      exercise_arr: [],
      keywords: []
    };

    try{
      workoutQuery = getWorkoutQueries(query);
    } catch(err){
      _res.status(400).send(err);
    }
    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }
    try{
      res = await get_workouts(client_instance, workoutQuery);
      _res.send(res).status(200);
    } catch(err){
      console.error(err);
      _res.send(undefined).status(400);
    }
  });

  return [app, client_instance];
}
export default create_app;