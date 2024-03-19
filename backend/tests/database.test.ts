import supertest from "supertest"
import {app} from "../index"
import { describe, it } from "node:test";

describe('Database Actions', () => {
    describe('Get Exercises', () => {
        const keywords = ['calves'];
        const keywordsString = encodeURIComponent(JSON.stringify(keywords));
        
        it("should return proper keywords is an array", async () => {
            await supertest(app).get(`/get_exercise?target=abs&keywords=${keywordsString}`).expect(200);        
        });
    });
});