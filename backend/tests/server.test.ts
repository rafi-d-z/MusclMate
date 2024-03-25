import request from "supertest";
import create_app from "../server/app";
import express from 'express';

describe('Server Actions', () => {
  let app: express.Application;

    beforeAll(async () => {
        try {
            app = await create_app();
        } catch (error) {
            console.error('Failed to start the server:', error);
        }
    });

    describe('Get /', () => {
        test("should return 200", async () => {
            await request(app).get('/').expect(200);
        });
    });
    describe('Get Exercises', () => {
        const keywords = ['value1', 'value2'];
        const keywordsString = encodeURIComponent(JSON.stringify(keywords));
        
        test("should return invalid keywords is not an array", async () => {
            await request(app).get('/get_exercise?target=abs&keywords=notAnArray').expect(404);
        });
        test("should return invalid target is not a string", async () => {
            await request(app).get(`/get_exercise?target=123&keywords=${keywordsString}`).expect(404);
        });
        // test("should return proper keywords is an array", async () => {
        //     await request(app).get(`/get_exercise?target=abs&keywords=${keywordsString}`).expect(200);        
        // });
    });
});