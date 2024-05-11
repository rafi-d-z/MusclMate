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
import { workout } from './DAO/workout'
import config from "../auth/firebase.config"
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Workout() {
    const [selectedWorkout, setSelectedWorkout] = useState<workout>();
    const [selectedWorkoutData, setSelectedWorkoutData] = useState<workout[]>([]);
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
                        exercise_arr: selectedWorkout.exercise_arr,
                        keywords: selectedWorkout.keywords,
                    },
                }).then(function (response) {
                    setSelectedWorkoutData(response.data);
                    console.log("Data:", response.data);
                }).catch((error) => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
            }
        };

        fetchData();
    }, [selectedWorkout]);



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
    const [isPopoverOpen, setIsPopoverOpen] = useState(true);
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
                            workoutTitle={"workoutTitle"}
                            listOfExercise={listOfExercise}
                        />
                        <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button variant="link" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                                {selectedWorkoutData.map((data, index) => (
                                    <h1 key={index}>{data.workout_name}</h1>
                                ))}
                                <Button variant="link" size="icon">
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </div>
                            <Card className="w-[200px] m-4">
                                <CardHeader>
                                    <CardTitle>Exercise 1</CardTitle>
                                    <CardDescription>Trends For You</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="link" size="icon">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card><Card className="w-[200px] m-4">
                                <CardHeader>
                                    <CardTitle>Exercise 2</CardTitle>
                                    <CardDescription>Trends For You</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="link" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        {isPopoverOpen && (
                                            <PopoverContent className="w-80">
                                                <div className="grid gap-4">
                                                    <div className="space-y-2">
                                                        <h4 className="font-medium leading-none">Create Exercise</h4>
                                                        <p className="text-sm text-muted-foreground">Add exercise details here</p>
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label htmlFor="exerciseName">Name: </Label>
                                                            <Input id="exerciseName" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} className="col-span-2 h-8" />
                                                        </div>
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label htmlFor="targetMuscles">Target Muscles:</Label>
                                                            <Select>
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Arms" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="light">Arms</SelectItem>
                                                                    <SelectItem value="dark">Legs</SelectItem>
                                                                    <SelectItem value="system">Chest</SelectItem>
                                                                    <SelectItem value="part">Back</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label htmlFor="reps">Reps:</Label>
                                                            <Input id="reps" value={reps} onChange={handleRepsChange} className="col-span-2 h-8" />
                                                        </div>
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label htmlFor="sets">Sets:</Label>
                                                            <Input id="sets" value={sets} onChange={handleSetsChange} className="col-span-2 h-8" />
                                                        </div>
                                                        <div className="grid grid-cols-3 items-center gap-4">
                                                            <Label htmlFor="weight">Weight:</Label>
                                                            <Input id="weight" value={weight} onChange={handleWeightChange} className="col-span-2 h-8" />
                                                        </div>
                                                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                                                        <Button onClick={handleAddNewExercise}>Submit</Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        )}

                                    </Popover>
                                    <Button variant="link" size="icon">
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Workout
