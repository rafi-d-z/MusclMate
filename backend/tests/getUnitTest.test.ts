import request from "supertest";
import create_app from "../server/app";
import express from 'express';
import { Client } from "pg";

describe('Server Actions', () => {
    let appClient: Array<any>;
    let app: express.Application;
    let client: Client;

    beforeAll(async () => {
        try {
            appClient = await create_app();
            app = appClient[0];
            client = appClient[1];
        } catch (error) {
            console.error('Failed to start the server:', error);
        }
    });

    describe('Get /get', () => {
        test("should return information given proper input", async () => {
            await request(app).get(`/get_exercise`).send({
                uid: "33628bab-142e-49cd-b752-30d5dfd8f093"
            }).expect(200);
        });
    });
});