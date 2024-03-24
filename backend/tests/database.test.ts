import request from "supertest"
import {app} from "../server/app"
import { describe, it } from "node:test";

describe('Database Actions', () => {
    describe('Get Exercises', () => {
        const keywords = ['calves'];
        const keywordsString = encodeURIComponent(JSON.stringify(keywords));
        
        test("should return correct output on get_exercise", async () => {
            await request(app).get(`/get_exercise?target=abs&keywords=${keywordsString}`).expect(200);        
        });
    });
});