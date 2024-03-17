import supertest from "supertest"
import {app} from "../index"

describe('Server Compiles', () => {
    describe('Get /', () => {
        it("should return 200", async () => {
            await supertest(app).get('/').expect(200);
        });
    });
});