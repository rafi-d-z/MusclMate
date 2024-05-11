import activate_db from "@/db"
import { Client } from "pg";
import { get_exercises } from "@/dbBI";
import exercise from "@/DAO/exercise";

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
            image_url: 'https://i1.sndcdn.com/avatars-000894638827-qr5jsd-t240x240.jpg',
            n_reps: 4,
            n_sets: 15,
            arr_keywords: [ 'calves', 'lower legs', 'hypertrophy' ],
            weight: 160,
            description: "minecraft",
            difficulity: "low",
            creator: "system"
        })
    })
})