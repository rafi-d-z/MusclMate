import activate_db from "@/db"
import { Client } from "pg";
import { get_workouts } from "@/dbBI";
import workout from "@/DAO/workout";

describe("get_workout unit tests", () => {
    let client: Client;

    beforeAll(async () => {
        try{
            client = await activate_db();
        } catch (err){
            console.error(err);
        }
    });

    test("should return a workout", async () => {
        const new_workout: workout = {
            uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
            workout_name: "unit_test-EDITED",
            exercise_arr: ["5442fc3c-bcb0-4ba0-87a3-a05e3186b298", "6d481883-a599-44d5-9c45-8e4f57e6d917"],
            keywords: ["unit-test", "unit-test", "unit-test", "edited-unit-test"],
        }

        const result: Array<workout> = await get_workouts(client, new_workout);
        expect(result.length).toStrictEqual(1);
    })
})