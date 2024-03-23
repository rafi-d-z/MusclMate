import supertest from "supertest"
import {app, server} from "../index"
import { describe, it } from "node:test";

beforeAll(done => {
    server.listen(3000, async () => {
        done();
    });
});

afterAll(done => {
    server.close(async () => {
        done();
    });
});

describe('Server Works', () => {
    describe('Get /', () => {
        it("should return 200", async () => {
            await supertest(app).get('/').expect(200);
        });
    });
    describe('Get Exercises', () => {
        const keywords = ['value1', 'value2'];
        const keywordsString = encodeURIComponent(JSON.stringify(keywords));
        
        it("should return invalid keywords is not an array", async () => {
            await supertest(app).get('/get_exercise?target=abs&keywords=notAnArray').expect(404);
        });
        it("should return invalid target is not a string", async () => {
            await supertest(app).get(`/get_exercise?target=123&keywords=${keywordsString}`).expect(404);
        });
        it("should return proper keywords is an array", async () => {
            await supertest(app).get(`/get_exercise?target=abs&keywords=${keywordsString}`).expect(200);        
        });
    });
});