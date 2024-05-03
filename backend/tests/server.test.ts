import request from "supertest";
import create_app from "../server/app";
import express from "express";
import { Client } from "pg";
import { workout } from "../server/DAO/workout";
import { isString } from "../server/bi";

describe("Server Actions", () => {
  let appClient: Array<any>;
  let app: express.Application;
  let client: Client;
  let uid: number | null = null;

  beforeAll(async () => {
    try {
      appClient = await create_app();
      app = appClient[0];
    } catch (error) {
      console.error("Failed to start the server:", error);
    }
  });

  describe("Get /", () => {
    test("should return 200", async () => {
      await request(app).get("/").expect(200);
    });
  });

  describe("Post /create_exercise", () => {
    test("valid input in exercises table", async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          name: "test",
          target: "abs",
          reps: 10,
          sets: 3,
          keywords: ["value1", "value2"],
          weight: 10,
        })
        .expect(200)
        .then((res) => {
          uid = res.body.uid;
        });
    });
    test("invalid input", async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          name: "ur mom",
          target: "abs",
          reps: 10,
          sets: 3,
          keywords: encodeURIComponent(JSON.stringify("notAnArray")),
          weight: "poo poo",
        })
        .expect(404);
    });
  });

  describe("Post /delete", () => {
    test("delete valid uid from exercises table", async () => {
      await request(app)
        .post("/delete")
        .send({
          db_name: "exercises",
          uid: uid,
        })
        .expect(200);
    });
  });

  describe("Get /get_exercise", () => {
    // these test inputs are depricated
    // test("should return invalid keywords is not an array", async () => {
    //     await request(app).get('/get_exercise').send({
    //         target: 'abs',
    //         keywords: 'notAnArray'
    //     }).expect(404);
    // });
    // test("should return invalid target is not a string", async () => {
    //     await request(app).get('/get_exercise').send({
    //         target: 123,
    //         keywords: ['value1', 'value2']
    //     }).expect(404);
    // });
    test("should return invalid uid is not a string", async () => {
      await request(app)
        .get("/get_exercise")
        .send({
          uid: 123,
        })
        .expect(404);
    });
    test("should return information given proper input", async () => {
      await request(app)
        .get(`/get_exercise`)
        .send({
          uid: "33628bab-142e-49cd-b752-30d5dfd8f093",
        })
        .expect(200);
    });
  });

  describe("Get /get_workouts", () => {
    describe("should return information given proper input", () => {
      test("entire workout body inputted", async (): Promise<void> => {
        const workout: workout = {
          uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
          workout_name: "unit_test-EDITED",
          exercise_arr: [
            "5442fc3c-bcb0-4ba0-87a3-a05e3186b298",
            "6d481883-a599-44d5-9c45-8e4f57e6d917",
          ],
          keywords: ["unit-test", "unit-test", "unit-test", "edited-unit-test"],
        };

        await request(app).get(`/get_workouts`).send(workout).expect(200);
      });

      test("only uid provided", async (): Promise<void> => {
        const workout: workout = {
          uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
          workout_name: "",
          exercise_arr: [],
          keywords: [],
        };

        await request(app).get("/get_workouts").send(workout).expect(200);
      });

      test("only workout_name provided", async (): Promise<void> => {
        const workout: workout = {
          uid: "",
          workout_name: "unit_test",
          exercise_arr: [],
          keywords: [],
        };

        await request(app)
          .get("/get_workouts")
          .send(workout)
          .expect(200)
          .then((res) => {
            expect(typeof res.body).toBe("object");
          });
      });

      test("empty workout body provided", async (): Promise<void> => {
        const workout: workout = {
          uid: "",
          workout_name: "",
          exercise_arr: [],
          keywords: [],
        };

        await request(app)
          .get("/get_workouts")
          .send(workout)
          .expect(200)
          .then((res: any) => {
            expect(typeof res.body).toBe("object");
          });
      });
    });

    describe("should return 400 given improper input", () => {
      test("no input", async (): Promise<void> => {
        await request(app).get("/get_workouts").send({}).expect(400);
      });

      test("invalid input", async (): Promise<void> => {
        await request(app)
          .get("/get_workouts")
          .send({
            uid: 123,
            workout_name: 123,
            exercise_arr: 123,
            keywords: 123,
          })
          .expect(400);
      });
    });
  });
});
