interface exercise {
    uid: string,
    exercise_name: string,
    exercise_target: string,
    image_url: string,
    n_reps: number,
    n_sets: number,
    weight: number,
    arr_keywords?: Array<string>,
    description?: string,
    difficulty?: string
}

export default exercise