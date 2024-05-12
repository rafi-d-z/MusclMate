"use client"
import React, { useState, useEffect } from "react"
import { Plus, Minus, Check, ChevronsUpDown, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import './App.css'
import muscleLogo from './assets/MuscleLogo.png'
import { Menubar } from "@/components/ui/menubar"
import { NewExerciseCard } from "./components/ui/newExerciseCard"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { WorkoutExerciseCard } from "@/components/ui/workoutExerciseCard"
import { CreateWorkoutCard } from "./components/ui/createWorkoutCard"
import { WorkoutComponent } from "./components/ui/workoutComponent"
import axios from "axios"
import workout from '../DAO/workout'
import exercise from '../DAO/exercise'
import config from "../auth/firebase.config"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Description } from "@radix-ui/react-dialog"

function Workout() {
    const [selectedWorkout, setSelectedWorkout] = useState<workout>({
        uid: "",
        workout_name: "",
        exercise_arr: [],
        keywords: [],
        difficulity: "",
        description: "",
        creator: "",

    });
    const [selectedWorkoutData, setSelectedWorkoutData] = useState<workout[]>([]);
    const [workoutName, setWorkoutName] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [exerciseArr, setExerciseArr] = useState([]);
    const [uid, setUID] = useState('notSystem');

    useEffect(() => {
        const auth = getAuth(config.app);
        onAuthStateChanged(auth, user => {
            setUID(user?.uid || 'notSystem');
        })
    });

    useEffect(() => {
        const fetchData = async () => {
            console.log("Type:", selectedWorkout)
            if (selectedWorkout) {
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
        };

        fetchData();
    }, [selectedWorkout]);

    const handleAddNewWorkout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let obj: workout = {
            uid: "",
            workout_name: workoutName,
            exercise_arr: exerciseArr,
            keywords: [],
        }


        axios.post("https://api-muscleman.com/create_workouts", {
            uid: "",
            workout_name: workoutName,
            exercise_arr: exerciseArr,
            arr_keywords: JSON.stringify([])
        })
            .then(function (response) {
                obj.uid = response.data.uid;
                selectedWorkoutData([obj, ...selectedWorkoutData]);
                console.log(obj);
                console.log("Data: ", response.data);
            })
            .catch((res) => {
                console.error("Error connecting to server,", res.response.data);
            });

        setIsPopoverOpen(false);
    };

    const handleDeleteWorkout = async (e: React.MouseEvent<HTMLButtonElement>, workout_obj: workout) => {
        e.preventDefault();
        console.log(workout_obj);

        axios.delete("https://api-muscleman.com/delete_workout", {
            data: {
                uid: workout_obj.uid,
                workout_name: workout_obj.workout_name,
                exercise_arr: workout_obj.exercise_arr,
                keywords: JSON.stringify(workout_obj.keywords)
            },
        }).then((response) => {
            // since obj delted in selectedCardData array, remove it from array
            setSelectedWorkoutData(selectedWorkoutData.filter((card) => card.uid !== workout_obj.uid));
            console.log("Response: ", response.data);
        })
            .catch((res) => {
                console.error("Error connecting to server,", res);
            });
    };




    const listOfExercise = [
        {
            name: "workout",
            Reps: "1",
            Weight: "1",
            Sets: "1",
        },
        {
            name: "exercise",
            Reps: "1",
            Weight: "1",
            Sets: "1",
        },
    ]

    const exercises = [
        {
            value: "pushup",
            label: "Pushup",
        },
        {
            value: "squat",
            label: "Sqaut",
        },
        {
            value: "deadlift",
            label: "Deadlift",
        },
    ]

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")


    const [exerciseName, setExerciseName] = useState('Pull ups');
    const [reps, setReps] = useState('12');
    const [sets, setSets] = useState('3');
    const [weight, setWeight] = useState('none');
    const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        setReps(value);
    };

    const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        setSets(value);
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value + ' lbs';
        setWeight(value);
    };

    const handleAddNewExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        const exercise = {
            name: exerciseName,
            reps: reps,
            sets: sets,
            weight: weight
        };

        console.log('New Exercise:', exercise);
        setIsPopoverOpen(false);

    };

    const handleCancel = () => {

        setExerciseName('Pull ups');
        setReps('3');
        setSets('12');
        setWeight('none');

        setIsPopoverOpen(false);
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
                        <div className="flex flex-col items-start justify-between p-6 lg:px-8">
                            <CreateWorkoutCard />
                        </div>
                        <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                            <WorkoutExerciseCard
                                isPopoverOpen={isPopoverOpen}
                                exerciseName={exerciseName}
                                setExerciseName={setExerciseName}
                                reps={reps}
                                sets={sets}
                                weight={weight}
                                handleWeightChange={handleWeightChange}
                                handleRepsChange={handleRepsChange}
                                handleSetsChange={handleSetsChange}
                                handleCancel={handleCancel}
                                handleAddNewExercise={handleAddNewExercise}
                                cardTitle={"asdfasf"}
                                cardContent={"cardContent"}
                                cardDescription={"cardDescription"}

                            />
                            <WorkoutExerciseCard
                                isPopoverOpen={isPopoverOpen}
                                exerciseName={exerciseName}
                                setExerciseName={setExerciseName}
                                reps={reps}
                                sets={sets}
                                weight={weight}
                                handleWeightChange={handleWeightChange}
                                handleRepsChange={handleRepsChange}
                                handleSetsChange={handleSetsChange}
                                handleCancel={handleCancel}
                                handleAddNewExercise={handleAddNewExercise}
                                cardTitle={"cardTitle"}
                                cardContent={"cardContent"}
                                cardDescription={"cardDescription"}

                            />
                        </div>
                        {selectedWorkoutData.map((data, index) => (
                            <WorkoutComponent
                                isPopoverOpen={isPopoverOpen}
                                exerciseName={exerciseName}
                                setExerciseName={setExerciseName}
                                reps={reps}
                                sets={sets}
                                weight={weight}
                                handleWeightChange={handleWeightChange}
                                handleRepsChange={handleRepsChange}
                                handleSetsChange={handleSetsChange}
                                handleCancel={handleCancel}
                                handleAddNewExercise={handleAddNewExercise}
                                cardTitle={"cardTitle"}
                                cardContent={"cardContent"}
                                cardDescription={"cardDescription"}
                                workoutTitle={<h1 key={index}>{data.workout_name}</h1>}
                                listOfExercise={listOfExercise}                          
                            />
                        ))}
                        {selectedWorkoutData.map((data, index) => (
                            <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <><Button variant="link" size="icon">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                        <h1 key={index}>{data.workout_name}</h1>
                                        <Button variant="link" size="icon" onClick={(e) => handleDeleteWorkout(e, data)}>
                                            <Minus className="h-4 w-4" />
                                        </Button></>
                                </div>
                                {data.exercise_arr.map((exercise, index) => (
                                    <Card className="w-[200px] m-4" key={index}>
                                        <CardHeader>
                                            <CardTitle>{exercise.exercise_name}</CardTitle>
                                            <CardDescription>{exercise.exercise_target}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={exercise.image_url}></img>
                                        </CardContent>
                                        <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {exercise.n_reps}/{exercise.n_sets}
                                        <Button variant="link" size="icon">
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>            
        </>
        )
    
}
        
        
export default Workout;
