import request from "supertest";
import create_app from "../server/app";
import express from 'express';
import { Client } from "pg";

describe('Server Actions', () => {
    let appClient: Array<any>;
    let app: express.Application;
    let client: Client;
    let uid: number | null = null;

    beforeAll(async () => {
        try {
            appClient = await create_app();
            app = appClient[0];
            client = appClient[1];
        } catch (error) {
            console.error('Failed to start the server:', error);
        }
    });
    
    afterAll(async () => {
        await client.end();
    })

    describe('Get /', () => {
        test("should return 200", async () => {
            await request(app).get('/').expect(200);
        });
    });

    describe('Post /create_exercise', () => {
        test('valid input in exercises table', async () => {
            await request(app).post('/create_exercise').send({
                name: 'test',
                target: 'abs',
                reps: 10,
                sets: 3,
                keywords: ['value1', 'value2'],
                weight: 10
            }).expect(200).then(res => {
                uid = res.body.uid;
            });
        });
        test('invalid input', async () => {
            await request(app).post('/create_exercise').send({
                name: 'ur mom',
                target: 'abs',
                reps: 10,
                sets: 3,
                keywords: encodeURIComponent(JSON.stringify('notAnArray')),
                weight: "poo poo"
            }).expect(404);
        });
    });

    describe('Post /delete', () => {
        test('delete valid uid from exercises table', async () => {
            await request(app).post('/delete').send({
                db_name: 'exercises',
                uid: uid
            }).expect(200);
        })
    });
    
    describe('Get /get_exercise', () => {        
        // these test inputs are depricated
        // test("should return invalid keywords is not an array", async () => {
        //     await request(app).get('/get_exercise').send({
        //         target: 'abs',
        //         keywords: 'notAnArray'
        //     }).expect(404);
        // });
        // test("should return invalid target is not a string", async () => {
        //     await request(app).get('/get_exercise').send({
        //         target: 123,
        //         keywords: ['value1', 'value2']
        //     }).expect(404);
        // });
        test("should return invalid uid is not a string", async () => {
            await request(app).get('/get_exercise').send({
                uid: 123
            }).expect(404);
        })
        test("should return information given proper input", async () => {
            await request(app).get(`/get_exercise`).send({
                uid: "33628bab-142e-49cd-b752-30d5dfd8f093"
            }).expect(200);
        });
    });
});