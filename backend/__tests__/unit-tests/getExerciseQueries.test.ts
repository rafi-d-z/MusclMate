import { getExerciseQueries } from "@/bi";
import exercise from "@/DAO/exercise";

describe("getExerciseQueries unit tests", () => {
  describe("should return on correct input", () => {
    test("all exercise query fields present", () => {
      const exercise: exercise = {
        uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
        exercise_name: "unit_test-EDITED",
        exercise_target: "unit-test",
        image_url: "unit-test",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: [
          "test",
          "test"
        ],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("only uid provided", () => {
      const exercise: exercise = {
        uid: "fbd91776-5202-4737-ab90-ac5077b67f8d",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: [],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("only exercise_name provided", () => {
      const exercise: exercise = {
        uid: "",
        exercise_name: "hamburger",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: [],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("only exercise_target", () => {
      const exercise: exercise = {
        uid: "",
        exercise_name: "",
        exercise_target: "hamburger",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: [],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("only image-url", () => {
      const exercise: exercise = {
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "hamburger",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: [],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("only n_reps", () => {
      const exercise: exercise = {
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 50,
        n_sets: 0,
        weight: 0,
        arr_keywords: [],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("only n_sets", () => {
      const exercise: exercise = {
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 50,
        weight: 0,
        arr_keywords: [],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("only weight", () => {
      const exercise: exercise = {
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 50,
        arr_keywords: [],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("only arr_keywords", () => {
      const exercise: exercise = {
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: ["i", "have", "something"],
        difficulty: '',
        description: ''
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual(exercise);
    });

    test("not arr_keywords", () => {
      const exercise: any = {
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
      };

      const result: exercise = getExerciseQueries(exercise);
      expect(result).toStrictEqual({
        uid: "",
        exercise_name: "",
        exercise_target: "",
        image_url: "",
        n_reps: 0,
        n_sets: 0,
        weight: 0,
        arr_keywords: [],
        difficulty: '',
        description: ''
      });
    });
  });

  describe("should throw error on incorrect input", () => {
    test("no input", () => {
      const query = {};
      expect(() => getExerciseQueries(query)).toThrow();
    });

    test("invalid workout body", () => {
      const workout: any = {
        uid: 123,
        workout_name: 123,
        exercise_arr: 123,
        keywords: 123,
      };

      expect(() => getExerciseQueries(workout)).toThrow();
    });
  });
});
