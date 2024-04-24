import activate_db from "../server/db"
import { Client } from "pg";
import { create_workout, delete_workout } from "../server/dbBI";
import { workout } from "../server/DAO/workout";

let uid: string;

describe("create_workout unit tests", () => {
    let client: Client;

    beforeAll(async () => {
        try{
            client = await activate_db();
        } catch (err){
            console.error(err);
        }
    });


    test("should create a workout", async () => {
        const new_workout: workout = {
            uid: "any",
            workout_name: "unit_test",
            exercise_arr: ["5442fc3c-bcb0-4ba0-87a3-a05e3186b298", "6d481883-a599-44d5-9c45-8e4f57e6d917"],
            keywords: ["unit-test", "unit-test", "unit-test"],
        }
        const result: string | undefined = await create_workout(client, new_workout);
        
        if(result === undefined){
            throw new Error("result is undefined");
        }

        expect(typeof(result)).toStrictEqual("string");
        uid = result;
    });

    test("should delete workout", async () => {
        const workout_to_delete: workout = {
            uid: uid,
            workout_name: "unit_test",
            exercise_arr: ["5442fc3c-bcb0-4ba0-87a3-a05e3186b298", "6d481883-a599-44d5-9c45-8e4f57e6d917"],
            keywords: ["unit-test", "unit-test", "unit-test"],
        }
        const result: boolean | undefined = await delete_workout(client, workout_to_delete);

        expect(result).toStrictEqual(true);
    })
})