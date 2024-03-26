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
    }, 100000);

  describe('Get Exercises', () => {
    test("should return correct output on get_exercise", async () => {
      await request(app).get('/get_exercise').send({
        target: 'abs',
        keywords: encodeURIComponent(JSON.stringify(['calves']))
      }).expect(200);
    });
  });

  describe('Create Exercise', () => {
    test("testing paramaterized query", async () => {(
      await request(app).post('/create_exercise').send({
        name: 'test',
        target: 'test',
        reps: 10,
        sets: 3,
        keywords: encodeURIComponent(JSON.stringify(['test', 'test'])),
        weight: 160
      }).expect(200)
    )})
  })
});