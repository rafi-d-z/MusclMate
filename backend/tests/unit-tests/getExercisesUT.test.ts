import activate_db from "../../server/db"
import { Client } from "pg";
import { get_exercises } from "../../server/dbBI";
import { exercise } from "../../server/DAO/exercise";

describe("get_exercises unit tests", () => {
    let client: Client;

    beforeAll(async () => {
        try{
            client = await activate_db();
        } catch (err){
            console.error(err);
        }
    });

    test("should get all exercises with a given name", async () => {
        const exercise: exercise = {
            uid: '',
            exercise_name: "calf raises",
            exercise_target: "",
            image_url: '',
            n_reps: 0,
            n_sets: 0,
            arr_keywords: [],
            weight: 0
        }
        const result: Array<object> | undefined = await get_exercises(client, exercise);

        if(result === undefined){
            throw new Error("result is undefined");
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