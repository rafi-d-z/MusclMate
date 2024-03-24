import request from "supertest";
import create_app from "../server/app";
import express from 'express';

describe('Database Actions', () => {
  let app: express.Application;

    beforeAll(async () => {
        try {
            app = await create_app();
        } catch (error) {
            console.error('Failed to start the server:', error);
        }
    });

  describe('Get Exercises', () => {
    const keywords = ['calves'];
    const keywordsString = encodeURIComponent(JSON.stringify(keywords));

    it("should return correct output on get_exercise", async () => {
      await request(app).get(`/get_exercise?target=abs&keywords=${keywordsString}`).expect(200);
    });
  });
});