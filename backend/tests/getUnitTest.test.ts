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

    describe('Get /get', () => {
        test("should return information given proper input", async () => {
            await request(app).get(`/get_exercise`).send({
                uid: "33628bab-142e-49cd-b752-30d5dfd8f093"
            }).expect(200);
        });
    });
});