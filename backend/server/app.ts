import express from "express";
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import { Client } from "pg";
import cors from "cors";
import { isArray, isString, toNumber, getWorkoutQueries, getExerciseQueries, getUserQueries } from "./bi";
import activate_db from "./db";
import fs from "fs";
import exercise from './DAO/exercise';
import workout from "./DAO/workout";
import {
  create_exercise,
  delete_exercise,
  edit_exercise,
  get_exercises,
  get_workouts,
  create_workout,
  edit_workout,
  delete_workout,
  get_user
} from "./dbBI";

dotenv.config();

async function create_app(): Promise<Array<any>>{
  let client_instance: Client | undefined;
  try{
    client_instance = await activate_db();
  } catch{
    console.error('Failed to connect to database');
    client_instance = undefined;
  }

  // doc: https://expressjs.com/en/4x/api.html
  const app: express.Application = express();
  app.use(
    cors({
      origin: ["https://muscl-mate-26j1.vercel.app", "http://localhost:5173"],
    }),
  );
  app.use(express.json());

  app.use((_err: Error, _req: Request, _res: Response, _next: NextFunction) => {
    // console.error(_err.stack);
    _res.status(500).send('Server Error: ' + _err.stack);
  });

  app.use(express.json({ limit: '10mb' })); 
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  app.use((_err: Error, _req: Request, _res: Response, _next: NextFunction) => {
    // console.error(_err.stack);
    _res.status(500).send('Server Error: ' + _err.stack);
  });

  app.get('/', (_req, _res) => {
    _res.status(200).send("TypeScript With Express");
  });

  app.get('/get_exercises', async (_req, _res) => {
    const query = _req.query;
    let exerciseQuery: exercise = {
      uid: "",
      exercise_name: "",
      exercise_target: "",
      image_url: "",
      n_reps: 0,
      n_sets: 0,
      weight: 0,
      arr_keywords: []
    }

    try{
      exerciseQuery = await getExerciseQueries(query);
    }catch(err: any){
      // console.error("error", err.toString());
      _res.status(400).end(err.toString());
      return;
    }

    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }

    try{
      res = await get_exercises(client_instance, exerciseQuery);
      _res.send(res).status(200);
      return;
    }catch(err: any){
      _res.send(err.toString()).status(400);
      return;
    }
  })

  app.post('/create_exercise', async (_req, _res) => {
    const query = _req.body;
    let exerciseQuery: exercise = {
      uid: "",
      exercise_name: "",
      exercise_target: "",
      image_url: "",
      n_reps: 0,
      n_sets: 0,
      weight: 0,
      arr_keywords: [],
      description: "",
      difficulity: "",
      creator: ""
    }

    try{
      exerciseQuery = await getExerciseQueries(query);
    }catch(err: any){
      _res.status(400).send(err.toString());
      return;
    }

    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }

    try{
      res = await create_exercise(client_instance, exerciseQuery);
      _res.send(res).status(200);
    }catch(err: any){
       
      _res.send(err.toString()).status(400);
      return;
    }
  })

  app.delete("/delete_exercise", async (_req, _res) => {
    const query = _req.body;
    let exerciseQuery: exercise = {
      uid: "",
      exercise_name: "",
      exercise_target: "",
      image_url: "",
      n_reps: 0,
      n_sets: 0,
      weight: 0,
      arr_keywords: [],
      description: "",
      difficulity: "",
      creator: ""
    }

    try{
      exerciseQuery = await getExerciseQueries(query);
    }catch(err: any){
      _res.status(400).send(err.toString());
      return;
    }

    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }

    try{
      res = await delete_exercise(client_instance, exerciseQuery);
      _res.send(res).status(200);
    }catch(err: any){
      _res.send(err.toString()).status(400);
      return;
    }
  });

  app.post('/edit_exercise', async (_req, _res) => {
    const query = _req.body;
    let exerciseQuery: exercise = {
      uid: "",
      exercise_name: "",
      exercise_target: "",
      image_url: "",
      n_reps: 0,
      n_sets: 0,
      weight: 0,
      arr_keywords: []
    }

    try{
      exerciseQuery = await getExerciseQueries(query);
    }catch(err: any){
      _res.status(400).send(err.toString());
      return;
    }

    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }

    try{
      res = await edit_exercise(client_instance, exerciseQuery);
      _res.send(res).status(200);
    }catch(err: any){
      _res.send(err.toString()).status(400);
      return;
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

  //* workout routes *//
  app.get("/get_workouts", async (_req, _res) => {
    const query = _req.query;
    let workoutQuery: workout = {
      uid: "",
      workout_name: "",
      exercise_arr: [],
      keywords: []
    };

    try{
      workoutQuery = getWorkoutQueries(query);
    } catch(err: any){
      _res.status(400).send(err.toString());
      return;
    }
    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }

    try{
      res = await get_workouts(client_instance, workoutQuery);
      _res.send(res).status(200);
    } catch(err: any){
      _res.send(err.toString()).status(400);
      return;
    }
  });

  app.post("/create_workout", async (_req, _res) => {
    const query = _req.body;
    let workoutQuery: workout = {
      uid: "",
      workout_name: "",
      exercise_arr: [],
      keywords: []
    };

    try{
      workoutQuery = getWorkoutQueries(query);
    } catch(err: any){
      _res.status(400).send(err.toString());
      return;
    }
    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }
    try{
      res = await create_workout(client_instance, workoutQuery);
      _res.send(res).status(200);
    } catch(err: any){
      _res.send(err.toString()).status(400);
      return;
    }
  });

  app.post("/edit_workout", async (_req, _res) => {
    const query = _req.body;
    let workoutQuery: workout = {
      uid: "",
      workout_name: "",
      exercise_arr: [],
      keywords: []
    };

    try{
      workoutQuery = getWorkoutQueries(query);
    } catch(err: any){
      _res.status(400).send(err.toString());
      return;
    }
    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }
    try{
      res = await edit_workout(client_instance, workoutQuery);
      _res.send(res).status(200);
    } catch(err: any){
       
      _res.send(err.toString()).status(400);
      return;
    }
  });

  app.delete("/delete_workout", async (_req, _res) => {
    const query = _req.body;
    let workoutQuery: workout = {
      uid: "",
      workout_name: "",
      exercise_arr: [],
      keywords: []
    };

    try{
      workoutQuery = getWorkoutQueries(query);
    } catch(err: any){
      _res.status(400).send(err.toString());
      return;
    }
    let res;

    if(client_instance === undefined){
      _res.send("Database not connected").status(500);
      throw new Error("Database not connected");
    }
    try{
      res = await delete_workout(client_instance, workoutQuery);
      _res.send(res).status(200);
    } catch(err: any){
       
      _res.send(err.toString()).status(400);
      return;
    }
  });

  app.get("/get_user", (_req, _res) => {
    // get uid from params
    let uid: string;

    try{
      uid = getUserQueries(_req.query);
    } catch (err: any) {
      _res.send(err.toString()).status(400);
      return;
    }

    if (client_instance === undefined){
      _res.send("Database not connected").status(500);
      return;
    }

    // fetch user information from api
    try {
      const user = get_user(client_instance, uid);
      _res.send(user).status(200);
    } catch(err: any){
      _res.send(err.toString()).status(400);
      return;
    }
  });

  app.post("/create_user", (_req, _res) => {
  
  });



  return [app, client_instance];
}
export default create_app;