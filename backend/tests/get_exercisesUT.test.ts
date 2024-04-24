import activate_db from "../server/db"
import { Client } from "pg";
import { get_exercises } from "../server/dbBI";

describe("get_exercises unit tests", () => {
    let client: Client;

    beforeAll(async () => {
        try{
            client = await activate_db();
        } catch (err){
            console.error(err);
        }
    });
    afterAll(async () => {
        await client.end();
    });


    test("should get all exercises with a given name", async () => {
        const exercise_name = "calf raises";
        const result: Array<object> | undefined = await get_exercises(client, exercise_name);

        if(result === undefined){
            return;
        }

        expect(result[0]).toStrictEqual({
            uid: '22d65463-8176-4b0d-ba70-40ab5124cbda',
            exercise_name: 'calf raises',
            exercise_target: 'calves',
            n_reps: 4,
            n_sets: 15,
            arr_keywords: [ 'calves', 'lower legs', 'hypertrophy' ],
            weight: 160
        })
    })
})