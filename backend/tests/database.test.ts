import request from "supertest";
import create_app from "../server/app";
import express from 'express';

describe('Database Actions', () => {
  let app: express.Application;
  let uid: string;
  
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
        keywords: encodeURIComponent(JSON.stringify(['calves'])) // what would happen if i didn't do this?
      }).expect(200);
    });
  });

  describe('Create Exercise', () => {
    test("create via paramaterized query", async () => {(
      await request(app).post('/create_exercise').send({
        name: 'test',
        target: 'test',
        reps: 10,
        sets: 3,
        keywords: encodeURIComponent(JSON.stringify(['test', 'test'])),
        weight: 160
      }).expect(200)
    )})

    test("delete via parameterized query", async () => {(
      await request(app).post('/delete').send({
        db_name: "exercises",
        uid: '4fdaa2ae-8016-417c-9718-6bc474f0387c'
      }).expect(200)
    )})
  })
});