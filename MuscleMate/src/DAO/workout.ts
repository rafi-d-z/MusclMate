interface workout {
    uid: string,
    workout_name: string,
    exercise_arr: Array<any>,
    keywords?: Array<string>,
    description?: string,
    difficulity?: string,
    creator?: string
}

export default workout;