interface workout {
    uid: string,
    workout_name: string,
    exercise_arr: Array<string>,
    keywords: Array<string>,
    description?: string,
    difficulity?: string,
    creator?: string
}

export default workout;