import { getWorkoutQueries } from "../../server/bi";
import { workout } from "../../server/DAO/workout";

describe("getWorkoutQueries unit tests", () => {
  describe("should return on correct input", () => {
    test("all workout query fields present", () => {
      const workout: workout = {
        uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
        workout_name: "unit_test-EDITED",
        exercise_arr: [
          "5442fc3c-bcb0-4ba0-87a3-a05e3186b298",
          "6d481883-a599-44d5-9c45-8e4f57e6d917",
        ],
        keywords: ["unit-test", "unit-test", "unit-test", "edited-unit-test"],
      };

      const result: workout = getWorkoutQueries(workout);
      expect(result).toStrictEqual(workout);
    });

    test("only uid provided", () => {
      const workout: workout = {
        uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
        workout_name: "",
        exercise_arr: [],
        keywords: [],
      };

      const result: workout = getWorkoutQueries(workout);
      expect(result).toStrictEqual(workout);
    });

    test("only workout_name provided", () => {
      const workout: workout = {
        uid: "",
        workout_name: "unit_test",
        exercise_arr: [],
        keywords: [],
      };

      const result: workout = getWorkoutQueries(workout);
      expect(result).toStrictEqual(workout);
    });

    test("empty workout_query", () => {
      const workout: workout = {
        uid: "",
        workout_name: "",
        exercise_arr: [],
        keywords: [],
      };

      const result: workout = getWorkoutQueries(workout);
      expect(JSON.stringify(result)).toStrictEqual(JSON.stringify(workout));
    });
  });

  describe("should throw error on incorrect input", () => {
    test("no input", () => {
      const query = {};
      expect(() => getWorkoutQueries(query)).toThrow();
    });

    test("invalid workout body", () => {
      const workout: any = {
        uid: 123,
        workout_name: 123,
        exercise_arr: 123,
        keywords: 123,
      };

      expect(() => getWorkoutQueries(workout)).toThrow();
    });
  });
});
