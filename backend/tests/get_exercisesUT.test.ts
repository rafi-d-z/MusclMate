import activate_db from "../server/db"
import { Client } from "pg";
import { get_exercises } from "../server/dbBI";

describe("get_exercises unit tests", () => {
    let client: Client;

    beforeAll(async () => {
        try{
            client = activate_db();
        } catch (err){
            console.error(err.stack);
        }
    });
    afterAll(async () => {
        await client.end();
    });


    test("should get all exercises with a given name", async () => {
        const exercise_name = "calf raises";
        const result = await get_exercises(client, exercise_name);

        // Assert
        expect(client.query).toHaveBeenCalledWith(expect.anything(), [exercise_name]);
        expect(result).toEqual({
            rows: [{ uid: 1, name: "Bench Press", target: "Chest", n_reps: 10, n_sets: 3, arr_keywords: ["chest", "strength"], weight: 100 }],
            rowCount: 1
        });

    })
})