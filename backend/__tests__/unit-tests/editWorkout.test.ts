import activate_db from "@/db"
import { Client } from "pg";
import { edit_workout } from "@/dbBI";
import { workout } from "@/DAO/workout";

describe("create_workout unit tests", () => {
    let client: Client;

    beforeAll(async () => {
        try{
            client = await activate_db();
        } catch (err){
            console.error(err);
        }
    });


    test("should edit a workout", async () => {
        const new_workout: workout = {
            uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
            workout_name: "unit_test-EDITED",
            exercise_arr: ["5442fc3c-bcb0-4ba0-87a3-a05e3186b298", "6d481883-a599-44d5-9c45-8e4f57e6d917"],
            keywords: ["unit-test", "unit-test", "unit-test", "edited-unit-test"],
        }
        const result: string | undefined = await edit_workout(client, new_workout);
        
        if(result === undefined){
            throw new Error("result is undefined");
        }

        expect(result).toStrictEqual("fbd91776-5202-4737-ab90-ac5077b67f8d");
    })
})