import supertest from "supertest"
import {app} from "../index"
import { describe, it } from "node:test";

describe('Database Actions', () => {
    describe('Get Exercises', () => {
        const keywords = ['calves'];
        const keywordsString = encodeURIComponent(JSON.stringify(keywords));
        
        it("should return correct output on get_exercise", async () => {
            await supertest(app).get(`/get_exercise?target=abs&keywords=${keywordsString}`).expect(200);        
        });
    });
});