import request from "supertest";
import create_app from "../server/app";
import express from 'express';

describe('Server Actions', () => {
    let app: express.Application;
    let uid: number | null = null;

    beforeAll(async () => {
        try {
            app = await create_app();
        } catch (error) {
            console.error('Failed to start the server:', error);
        }
    }, 100000);

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
        test("should return invalid keywords is not an array", async () => {
            await request(app).get('/get_exercise').send({
                target: 'abs',
                keywords: 'notAnArray'
            }).expect(404);
        });
        test("should return invalid target is not a string", async () => {
            await request(app).get('/get_exercise').send({
                target: 123,
                keywords: encodeURIComponent(JSON.stringify(['value1', 'value2']))
            }).expect(404);
        });
        // test("should return proper keywords is an array", async () => {
        //     await request(app).get(`/get_exercise?target=abs&keywords=${keywordsString}`).expect(200);        
        // });
    });
});