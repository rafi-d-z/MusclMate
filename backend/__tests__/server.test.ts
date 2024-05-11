import request from "supertest";
import create_app from "@/app";
import express from "express";
import workout from "@/DAO/workout";
import exercise from "@/DAO/exercise";

describe("Server Actions", () => {
  let appClient: Array<any>;
  let app: express.Application;
  let toDeleteExerciseUids: Array<string> = [];
  let toDeleteWorkoutUids: Array<string> = [];

  beforeAll(async () => {
    try {
      appClient = await create_app();
      app = appClient[0];
    } catch (error) {
      console.error('Failed to start the server:', error);
    }
  });
  
  describe('Get /', () => {
    test("should return 200", async () => {
      await request(app).get('/').expect(200);
    });
  });

  describe("Get /get_exercise", () => {
    // these test inputs are depricated
    describe("valid requests", () => {
      test("should return all exercises on empty body", async () => {
        const query: any = {
          uid: '',
          exercise_name: '',
          exercise_target: '',
          image_url: '',
          n_reps: 0,
          n_sets: 0,
          weight: 0,
          arr_keywords: JSON.stringify([]),
        }

        await request(app).get('/get_exercises').query(query).expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        }).catch(()=>{
          console.error("Error in get_exercises empty body")
        })
      });

      test("should return information given proper input", async () => {
        const query: any = {
          uid: '33628bab-142e-49cd-b752-30d5dfd8f093',
          exercise_name: '',
          exercise_target: '',
          image_url: '',
          n_reps: 0,
          n_sets: 0,
          weight: 0,
          arr_keywords: JSON.stringify([]),
        }

        await request(app).get(`/get_exercises`).query(query).expect(200);
      });
    });

    describe("invalid requests", () => {
      test("should return invalid n_reps is not a number", async () => {
        const query: any = {
          uid: '',
          exercise_name: '',
          exercise_target: '',
          image_url: '',
          n_reps: "not a number",
          n_sets: 0,
          weight: 0,
          arr_keywords: JSON.stringify([]),
        }

        await request(app).get("/get_exercises").query(query).expect(400);
      });

      test("should return invalid n_sets is not a number", async () => {
        const query: any = {
          uid: '',
          exercise_name: '',
          exercise_target: '',
          image_url: '',
          n_reps: 0,
          n_sets: "not a number",
          weight: 0,
          arr_keywords: JSON.stringify([]),
        }

        await request(app).get("/get_exercises").query(query).expect(400);
      });

      test("should return invalid weight is not a number", async () => {
        const query: any = {
          uid: '',
          exercise_name: '',
          exercise_target: '',
          image_url: '',
          n_reps: 0,
          n_sets: 0,
          weight: "not a number",
          arr_keywords: JSON.stringify([]),
        }

        await request(app).get("/get_exercises").query(query).expect(400);
      });

      test("should return invalid arr_keywords is not an array", async () => {
        const query: any = {
          uid: '',
          exercise_name: '',
          exercise_target: '',
          image_url: '',
          n_reps: 0,
          n_sets: 0,
          weight: 0,
          arr_keywords: "not an array",
        }

        await request(app).get("/get_exercises").query(query).expect(400);
      });
    });
  });

  describe("Post /create_exercise", () => {
    test('valid input in exercises table', async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          "uid": "",
          "exercise_name": "hip thurst",
          "exercise_target": "legs",
          "n_reps": 10,
          "n_sets": 3,
          "arr_keywords": [
              "legs",
              "quads",
              "glutes",
              "strength"
          ],
          "weight": 185,
          "image_url": ""
         })
         .expect(200)
         .then((res) => {
           toDeleteExerciseUids.push(res.body.uid);
         });
    })

    test('valid input in exercises table without exercise name', async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          "uid": "",
          "exercise_name": "",
          "exercise_target": "legs",
          "n_reps": 10,
          "n_sets": 3,
          "arr_keywords": [
              "legs",
              "quads",
              "glutes",
              "strength"
          ],
          "weight": 185,
          "image_url": ""
         })
         .expect(200)
         .then((res) => {
           toDeleteExerciseUids.push(res.body.uid);
         });
    })

    test('valid input in exercises table without exercise target', async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          "uid": "",
          "exercise_name": "hip thurst",
          "exercise_target": "",
          "n_reps": 10,
          "n_sets": 3,
          "arr_keywords": [
              "legs",
              "quads",
              "glutes",
              "strength"
          ],
          "weight": 185,
          "image_url": ""
         })
         .expect(200)
         .then((res) => {
           toDeleteExerciseUids.push(res.body.uid);
         });
    })

    test('valid input in exercises table without keywords', async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          "uid": "",
          "exercise_name": "hip thurst",
          "exercise_target": "legs",
          "n_reps": 10,
          "n_sets": 3,
          "arr_keywords": [],
          "weight": 185,
          "image_url": ""
         })
         .expect(200)
         .then((res) => {
           toDeleteExerciseUids.push(res.body.uid);
         });
    })


    test("invalid input", async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          "uid": "",
          "exercise_name": "hip thurst",
          "exercise_target": "legs",
          "n_reps": 10,
          "n_sets": 3,
          "arr_keywords": encodeURIComponent(JSON.stringify("notAnArray")),
          "weight": 185,
          "image_url": ""
        })
        .expect(400);
    });

    test("invalid input with numbers", async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          "uid": "",
          "exercise_name": "hip thurst",
          "exercise_target": "legs",
          "n_reps": 'kendrick lamar',
          "n_sets": 'k.dot',
          "arr_keywords": [],
          "weight": 'kung fu kenny',
          "image_url": ""
        })
        .expect(400);
    });

    test("invalid input for not strings", async () => {
      await request(app)
        .post("/create_exercise")
        .send({
          "uid": "",
          "exercise_name": 69,
          "exercise_target": 69,
          "n_reps": 10,
          "n_sets": 3,
          "arr_keywords": [],
          "weight": 185,
          "image_url": ""
        })
        .expect(400);
    });
  });

  describe("Post /edit_exercise", () => {
    describe("invalid input", () => {
      test("edit valid uid from exercises table", async () => {
        const exercise: exercise = {
          uid: "0459d6ee-ff82-4c00-bb9f-28d5b0c2e4c5",
          exercise_name: "hip thrust",
          exercise_target: "legs",
          image_url: "",
          n_reps: 10,
          n_sets: 3,
          weight: 185,
          arr_keywords: [
            "legs",
            "quads",
            "glutes",
            "strength",
          ],
        }

        await request(app)
          .post("/edit_exercise")
          .send(exercise)
          .expect((res) => {
            expect(typeof(res.body[0].uid)).toStrictEqual("string");
          });
      });

      test("edit valid uid from exercises table without exercise name", async () => {
        const exercise: exercise = {
          uid: "0459d6ee-ff82-4c00-bb9f-28d5b0c2e4c5",
          exercise_name: "",
          exercise_target: "legs",
          image_url: "",
          n_reps: 10,
          n_sets: 3,
          weight: 185,
          arr_keywords: [
            "legs",
            "quads",
            "glutes",
            "strength",
          ],
        }

        await request(app)
          .post("/edit_exercise")
          .send(exercise)
          .expect((res) => {
            expect(typeof(res.body[0].uid)).toStrictEqual("string");
          });
      });

      test("edit valid uid from exercises table without exercise target", async () => {
        const exercise: exercise = {
          uid: "33628bab-142e-49cd-b752-30d5dfd8f093",
          exercise_name: "hip thrust",
          exercise_target: "",
          image_url: "",
          n_reps: 10,
          n_sets: 3,
          weight: 185,
          arr_keywords: [
            "legs",
            "quads",
            "glutes",
            "strength",
          ],
        }
        
        await request(app)
          .post("/edit_exercise")
          .send(exercise)
          .expect((res) => {
            expect(typeof(res.body[0].uid)).toStrictEqual("string");
          });
      });

      test("edit valid uid from exercises table without keywords", async () => {
        const exercise: exercise = {
          uid: "33628bab-142e-49cd-b752-30d5dfd8f093",
          exercise_name: "hip thrust",
          exercise_target: "legs",
          image_url: "",
          n_reps: 10,
          n_sets: 3,
          weight: 185,
          arr_keywords: [],
        }

        await request(app)
          .post("/edit_exercise")
          .send(exercise)
          .expect((res) => {
            expect(typeof(res.body[0].uid)).toStrictEqual("string");
          });
      });
    });

    describe("invalid input", () => {
      test("missing fields", async () => {
        const exercise: any = {
          uid: "0459d6ee-ff82-4c00-bb9f-28d5b0c2e4c5",
          exercise_name: "hip thrust",
          exercise_target: "legs",
          n_reps: 10,
          n_sets: 3,
          weight: 185,
          arr_keywords: [
            "legs",
            "quads",
            "glutes",
            "strength",
          ],
        }
        
        await request(app)
          .post("/edit_exercise")
          .send(exercise)
          .expect(400);
      });

      test("invalid UID", async () => {
        const exercise : exercise = {
          uid: "",
          exercise_name: "",
          exercise_target: "legs",
          image_url: "",
          n_reps: 10,
          n_sets: 3,
          weight: 185,
          arr_keywords: [
            "legs",
            "quads",
            "glutes",
            "strength",
          ],
        }

        await request(app)
          .post("/edit_exercise")
          .send(exercise)
          .expect(200);
      });
    });
  });

  describe("Delete /delete_exercise", () => {
    describe("valid input", () => {
      test("delete valid uid from exercises table", async () => {
        toDeleteExerciseUids.forEach(async (uid) => {
          const exercise: any = {
            uid: uid,
            exercise_name: "",
            exercise_target: "",
            image_url: "",
            n_reps: 0,
            n_sets: 0,
            weight: 0,
            arr_keywords: JSON.stringify([]),
          }

          await request(app)
            .delete("/delete_exercise")
            .send(exercise)
            .expect(200).catch((err) => {
              console.error("Error in delete_exercise delete valid uid from exercises table", err.toString());
            });
        });
      });

      describe("invalid input", () => {
        test("missing fields", async () => {
          const exercise: any = {
            uid: "",
            exercise_name: "",
            exercise_target: "",
            n_reps: 0,
            n_sets: 0,
            weight: 0,
            arr_keywords: JSON.stringify([]),
          }

          await request(app)
            .delete("/delete_exercise")
            .send(exercise)
            .expect(400);
        });
      });
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

        await request(app).get(`/get_workouts`).query(workout).expect(200).catch((err) => {
          console.error("Error in get_workouts entire workout body inputted", err.toString());
        });
      });

      test("only uid provided", async (): Promise<void> => {
        const workout: object = {
          uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
          workout_name: "",
          exercise_arr: JSON.stringify([]),
          keywords: JSON.stringify([]),
        };

        const response = await request(app).get(`/get_workouts`).query(workout);        
        expect(response.statusCode).toBe(200);
      });

      test("only workout_name provided", async (): Promise<void> => {
        const workout: object = {
          uid: "",
          workout_name: "unit_test",
          exercise_arr: JSON.stringify([]),
          keywords: JSON.stringify([]),
        };4 

        await request(app)
          .get("/get_workouts")
          .query(workout)
          .expect(200)
          .then((res) => {
            expect(typeof res.body).toBe("object");
          });
      });

      test("empty workout body provided", async (): Promise<void> => {
        const workout: object = {
          uid: "",
          workout_name: "",
          exercise_arr: JSON.stringify([]),
          keywords: JSON.stringify([]),
        };

        await request(app)
          .get("/get_workouts")
          .query(workout)
          .expect(200)
          .then((res: any) => {
            expect(typeof res.body).toBe("object");
          });
      });
    });

    describe("should return 400 given improper input", () => {
      test("no input", async (): Promise<void> => {
        await request(app).get("/get_workouts").query({}).expect(400);
      });

      test("invalid input", async (): Promise<void> => {
        await request(app)
          .get("/get_workouts")
          .query({
            uid: 123,
            workout_name: 123,
            exercise_arr: 123,
            keywords: 123,
          })
          .expect(400);
      });
    });
  });

  describe("Post /create_workout", () => {
    describe("should return information given proper input", () => {
      test("entire workout body inputted", async (): Promise<void> => {
        await request(app)
        .post("/create_workout")
        .send({
          uid: "",
          workout_name: "gluteus maximizer",
          exercise_arr: [
            "6d481883-a599-44d5-9c45-8e4f57e6d917",
            "33628bab-142e-49cd-b752-30d5dfd8f093",
            "33628bab-142e-49cd-b752-30d5dfd8f093",
          ],
          keywords: ["glutes"]
        })
        .expect(200)
        .then((res) => {
          toDeleteWorkoutUids.push(res.body.uid);
        });
    });

    test("exercise arr empty", async (): Promise<void> => {
      await request(app)
      .post("/create_workout")
      .send({
        uid: "",
        workout_name: "pecs like zoro",
        exercise_arr: [],
        keywords: ["chest", "pecs", "hypertrophy"]
      })
      .expect(200)
      .then((res) => {
        toDeleteWorkoutUids.push(res.body.uid);
      });
  });
  test("workout name empty", async (): Promise<void> => {
    await request(app)
    .post("/create_workout")
    .send({
      uid: "",
      workout_name: "",
      exercise_arr: ["7e2726af-b5bd-4242-a7d8-b396d4842270"],
      keywords: ["back", "lats", "explosiveness"]
    })
    .expect(200)
    .then((res) => {
      toDeleteWorkoutUids.push(res.body.uid);
    });
  });

  test("keywords empty", async (): Promise<void> => {
    await request(app)
    .post("/create_workout")
    .send({
      uid: "",
      workout_name: "gluteus maximizer 2",
      exercise_arr: [
        "6d481883-a599-44d5-9c45-8e4f57e6d917",
        "33628bab-142e-49cd-b752-30d5dfd8f093",
        "33628bab-142e-49cd-b752-30d5dfd8f093",
      ],
      keywords: []
    })
    .expect(200)
    .then((res) => {
      toDeleteWorkoutUids.push(res.body.uid);
    });
});
  });

  describe("should return 400 given improper input", () => {
    test("no input", async (): Promise<void> => {
      await request(app).post("/create_workout").send({}).expect(400);
    });

    test("invalid input", async (): Promise<void> => {
      await request(app)
        .post("/create_workout")
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
