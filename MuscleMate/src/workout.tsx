import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import './App.css'
import muscleLogo from './assets/MuscleLogo.png'
import { Menubar } from "@/components/ui/menubar"
import { CreateWorkoutCard } from "./components/ui/createWorkoutCard"
import { WorkoutComponent } from "./components/ui/workoutComponent"
import workout from "./DAO/workout"
import axios from "axios"
import config from "./auth/firebase.config"
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Workout() {
    const selectedWorkout: workout = {
        uid: "",
        workout_name: "",
        exercise_arr: [],
        difficulity: "",
        description: "",
        creator: "",
    };

    const [uid, setUID] = useState('notSystem');
    const [selectedWorkoutData, setSelectedWorkoutData] = useState<workout[]>([]);
    const [workoutName, setWorkoutName] = useState('');
    const [exerciseArr, setExerciseArr] = useState<string[]>([]);
    const [exercises, setExercises] = useState([]);
    const [difficulity, setDifficulty] = useState(''); 


    // fetch all exercises & adding to exercises
    useEffect(() => {
        const exercise = {
            uid: '',
            exercise_name: '',
            exercise_target: '',
            image_url: '',
            n_reps: 0,
            n_sets: 0,
            weight: 0,
            description: '',
            difficulity: '',
            creator: ''
        }
        axios.get("https://api-muscleman.com/get_exercises", {
            params: exercise
        }).then((response) => {
            setExercises(response.data);
            console.log(response.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        const auth = getAuth(config.app);
        onAuthStateChanged(auth, user => {
            setUID(user?.uid || 'notSystem');
        })
    });

    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: 'get',
                url: 'https://api-muscleman.com/get_workouts',
                params: {
                    uid: selectedWorkout.uid,
                    workout_name: selectedWorkout.workout_name,
                    exercise_arr: JSON.stringify(selectedWorkout.exercise_arr),
                    keywords: JSON.stringify(selectedWorkout.keywords),
                    difficulity: selectedWorkout.difficulity,
                    description: selectedWorkout.description,
                    creator: selectedWorkout.creator,
                },
            }).then(function (response) {
                setSelectedWorkoutData(response.data);
                console.log("Data:", response.data);
            }).catch((error) => {
                // Handle error
                console.error('Error fetching data:', error.response.data);
            });
        }
        fetchData();
    }, []);

    const handleCheckboxChange = (exercise_uid: string) => {
        setExerciseArr([...exerciseArr, exercise_uid]);
    };
    
    // adds new workout to the database
    const handleAddNewWorkout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // eslint-disable-next-line prefer-const
        let workoutToAdd: workout = {
            uid: "",
            workout_name: workoutName,
            exercise_arr: exerciseArr,
            difficulity: difficulity, // TODO: add functionality to add this
            creator: uid
        }

        axios.post("https://api-muscleman.com/create_workout", workoutToAdd)
            .then(function (response) {
                console.log(exerciseArr);
                workoutToAdd.uid = response.data.uid;
                setSelectedWorkoutData([workoutToAdd, ...selectedWorkoutData]);
                console.log(workoutToAdd);
                console.log("Data: ", response);
            })
            .catch((res) => {
                console.error("Error connecting to server,", res.response.data);
            });
    };

    return (
        <>
            {/* top bar components */}
            <div className="flex items-center justify-between p-8 lg:px-8">
                <img src={muscleLogo} width={200} height={200} />
                <div className="mt-5 flex lg:ml-4 gap-20">
                    <Input placeholder="Search" className="w-[200px] " />
                    <Menubar />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '360px' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '800px' }}>
                        <div className="flex flex-cobl items-start justify-between p-6 lg:px-8">
                            <CreateWorkoutCard
                                avaliableExercises={exercises}
                                workoutName={workoutName}
                                setWorkoutName={setWorkoutName}
                                handleAddNewWorkout={handleAddNewWorkout}
                                handleCheckboxChange={handleCheckboxChange}
                                setDifficulty={setDifficulty}
                            />
                        </div>
                        {selectedWorkoutData.map((data) => (
                            <WorkoutComponent
                                workoutTitle={data.workout_name}
                                exerciseArray={data.exercise_arr}
                                data={data}
                                avaliableExercises={exercises}
                            />))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Workout;