<<<<<<< HEAD
"use client"
import React, { useState, useEffect } from "react"
import { Plus, Minus, Check, ChevronsUpDown, Pencil } from "lucide-react"
=======
"use client" // what's this for?
import React from "react"
import { Plus, Minus, Check, ChevronsUpDown } from "lucide-react"
>>>>>>> origin/main
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
<<<<<<< HEAD
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
import { workout } from "./DAO/workout"


function Workout() {
    const [selectedWorkout, setSelectedWorkout] = useState({
        uid: "",
        workout_name: "",
        exercise_arr: [],
        keywords: []
    });
    const [selectedWorkoutData, setSelectedWorkoutData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: 'get',
                url: 'https://api-muscleman.com/get_workouts',
                params: {
                    uid: JSON.stringify(selectedWorkout.uid),
                    workout_name: JSON.stringify(selectedWorkout.workout_name),
                    exercise_arr: JSON.stringify(selectedWorkout.exercise_arr),
                    keywords: JSON.stringify(selectedWorkout.keywords)
                }
            }).then((response) =>  {
                setSelectedWorkoutData(response.data);
                console.log(selectedWorkoutData)
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
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
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant="link" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Exercise</DialogTitle>
                                            <DialogDescription>
                                                Select existing exercise to edit or add new exercise.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Table>
                                            <TableCaption>The list of exercises in this workout</TableCaption>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px]">Exercise Name</TableHead>
                                                    <TableHead>Reps</TableHead>
                                                    <TableHead>Sets</TableHead>
                                                    <TableHead>Weight</TableHead>
                                                    <TableHead className="text-right">Edit</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {listOfExercise.map((listOfExercise) => (
                                                    <TableRow key={listOfExercise.name}>
                                                        <TableCell className="font-medium">{listOfExercise.name}</TableCell>
                                                        <TableCell>{listOfExercise.Sets}</TableCell>
                                                        <TableCell>{listOfExercise.Reps}</TableCell>
                                                        <TableCell>{listOfExercise.Weight}</TableCell>
                                                        <TableCell>
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Button variant="link" size="icon">
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan={4}>Table footer</TableCell>
                                                    <TableCell className="text-right">table footer</TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                        <Button type="submit">Submit</Button>
                                        <DialogFooter className="flex justify-between">
                                            <DialogClose>
                                                <Button variant="outline">
                                                    Close
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <h1>Workout 1</h1>
                                <Button variant="link" size="icon">
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </div>

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
                            />
                        <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button variant="link" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                                {selectedWorkoutData.length > 0 ? selectedWorkoutData.map((data, index) => (
                                    <h1 key={index}>{data.workout_name}</h1>
                                )) : <h1>No workout data</h1>}
                                <Button variant="link" size="icon">
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </div><Card className="w-[200px] m-4">
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

=======

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


function Workout() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    
    return (
    <>
    {/* top bar components */}
    <div className="flex items-center justify-between p-8 lg:px-8">
        <img src={muscleLogo} width={200} height={200}/>
        <div className="mt-5 flex lg:ml-4 gap-20">
            <Input placeholder="Search" className="w-[200px] "/>
            <Menubar />
        </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '360px' }}>
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '800px' }}>
                <div className="flex flex-col items-start justify-between p-6 lg:px-8">
                    <Card className="w-[200px] h-[600px] m-4 bg-gray-200">
                        <CardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CardTitle><h1>Create Workout</h1></CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Dialog>
                                <DialogTrigger><Button variant="ghost" size="icon">
                                    <Plus className="h-20 w-20" />
                                </Button></DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Input Workout Name</DialogTitle>
                                        <DialogDescription>
                                            Enter the name of the workout.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                        <Input type="Name" placeholder="Name" />
                                        <Button type="submit">Submit</Button>
                                    </div>
                                    <DialogFooter className="flex justify-between">
                                        <DialogClose>
                                            <Button variant="outline">
                                                Close
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Dialog >
                            <DialogTrigger >
                                <Button variant="link" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Choose Exercise</DialogTitle>
                                    <DialogDescription>
                                        Select the exercise you would like to add to the workout.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex w-full max-w-sm items-center space-x-2">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-[200px] justify-between"
                                            >
                                                {value
                                                    ? exercises.find((exercise) => exercise.value === value)?.label
                                                    : "Select exercise..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search exercise..." />
                                                <CommandList>
                                                    <CommandEmpty>No exercise found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {exercises.map((exercise) => (
                                                            <CommandItem
                                                                key={exercise.value}
                                                                value={exercise.value}
                                                                onSelect={(currentValue) => {
                                                                    setValue(currentValue === value ? "" : currentValue)
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        value === exercise.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {exercise.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <Button type="submit">Submit</Button>
                                </div>
                                <DialogFooter className="flex justify-between">
                                    <DialogClose>
                                        <Button variant="outline">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <h1>Workout 1   </h1>
                        <Button variant="link" size="icon">
                            <Minus className="h-4 w-4" />
                        </Button>
>>>>>>> origin/main
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
                    </Card>
                </div>
                <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="link" size="icon">
                            <Plus className="h-4 w-4" />
                        </Button>
                        <h1>Workout 2</h1>
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
                    </Card>
                </div>
                <div className="flex flex-col items-center justify-between p-6 lg:px-8">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="link" size="icon">
                            <Plus className="h-4 w-4" />
                        </Button>
                        <h1>Workout 3</h1>
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
                    </Card>
                    <Card className="w-[200px] m-4">
                        <CardHeader>
                            <CardTitle>Exercise 2</CardTitle>
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
                    </Card>
                </div>
<<<<<<< HEAD
            </div >
        </>
=======
            </div>
        </div>
    </div>
    </>
>>>>>>> origin/main
    )
}
export default Workout
