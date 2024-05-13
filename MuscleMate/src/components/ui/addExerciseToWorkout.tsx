import React from "react"
import { Plus } from "lucide-react"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import "@/css/exerciseTable.css"
import axios from 'axios';
import exercise from "@/DAO/exercise"
import workout from "@/DAO/workout"

interface AddExerciseToWorkoutProps {
    avaliableExercises: exercise[];
    data: workout;
}

export const AddExerciseToWorkout: React.FC<AddExerciseToWorkoutProps> = (
    { avaliableExercises, data}
) => {
    const [exerciseArr, setExerciseArr] = React.useState<string[]>(data.exercise_arr.map((exercise: exercise) => exercise.uid));
    
    const handleCheckboxChange = (exercise_uid: string) => {
        setExerciseArr([...exerciseArr, exercise_uid]);
    };

    const handleAddNewExercise = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Workout UID: ", data.uid);

        axios.post("https://api-muscleman.com/edit_workout", {
            data: {
            uid: data.uid,
            workout_name: data.workout_name,
            exercise_arr: JSON.stringify(exerciseArr),
        },})
            .then(function (response) {
                console.log("Data: ", response);
            })
            .catch((res) => {
                console.error("Error connecting to server,", res.response.data);
            });

    }

    return (
        <Card className="w-[200px] m-4">
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Dialog>
                <DialogTrigger>
                    <Plus className="h-20 w-20" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select exercises to be added</DialogTitle>
                        <DialogDescription>
                            These are the avaliable exercises to be added to the workout.
                        </DialogDescription>
                    </DialogHeader>

                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader className="TableBody">
                            <TableRow>
                                <TableHead className="w-[100px]">Exercise Name</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>Reps</TableHead>
                                <TableHead>Sets</TableHead>
                                <TableHead className="text-right">Weight</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="TableBody">
                            {avaliableExercises.map((exercise) => (
                                <div key={exercise.uid}>
                                <TableRow >
                                    <TableCell className="font-medium">{exercise.exercise_name}</TableCell>
                                    <TableCell>{exercise.exercise_target}</TableCell>
                                    <TableCell>{exercise.n_reps}</TableCell>
                                    <TableCell>{exercise.n_sets}</TableCell>
                                    <TableCell>{exercise.weight}</TableCell>
                                    <TableCell className="text-right"><Checkbox onCheckedChange={() => handleCheckboxChange(exercise.uid)}/></TableCell>
                                </TableRow>
                                </div>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Button type="submit" onClick={handleAddNewExercise}>Submit</Button>
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

    )
}
export default AddExerciseToWorkout