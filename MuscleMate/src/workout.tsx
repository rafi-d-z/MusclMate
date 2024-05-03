"use client"
import React, { useState } from "react"
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

function Workout() {

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
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
                                <h1>Workout 1   </h1>
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default Workout
