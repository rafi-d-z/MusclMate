import React from "react"
import { Minus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkoutExerciseCard } from "@/components/ui/workoutExerciseCard"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddExerciseToWorkout from "@/components/ui/addExerciseToWorkout"
import "@/css/exerciseTable.css"
import axios from 'axios';
import workout from "@/DAO/workout"

interface WorkoutComponentProps {
    workoutTitle: any;
    exerciseArray: Array<any>;
    data: any;
    avaliableExercises: any[];
    setExerciseArray: React.Dispatch<React.SetStateAction<any[]>>;
}

export const WorkoutComponent: React.FC<WorkoutComponentProps> = ({
    workoutTitle,
    exerciseArray,
    data,
    avaliableExercises,
    setExerciseArray
}) => {
    const handleDeleteWorkout = async (e: React.MouseEvent<HTMLButtonElement>, workout_obj: workout ) => {
        e.preventDefault();
    
        axios.delete( "https://api-muscleman.com/delete_workout",{
          data: workout_obj,
          })
          .catch((res) => {
            console.error("Error connecting to server,", res);
          });
    };
    
    const handleDeleteExerciseWorkout = async (e: React.MouseEvent<HTMLButtonElement>, exerciseToRemoveUID: string) => {
        e.preventDefault();
        console.log("array", exerciseArray)
        setExerciseArray(exerciseArray.filter((exercise) => exercise.uid !== exerciseToRemoveUID))
        console.log("array", exerciseArray)
        // console.log("Workout Object: ", workout_obj);
        // axios.post("https://api-muscleman.com/edit_workout", {
        //     data: workout_obj})
        //     .then(function (response) {
        //         console.log("Data: ", response);
        //     })
        //     .catch((res) => {
        //         console.error("Error connecting to server,", res.response.data);
        //     });

    }



    return (
        <div className="flex flex-col items-center justify-between p-6 lg:px-8">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Dialog>
                    <DialogTrigger>
                        <Button variant="link" size="icon">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>View Exercise</DialogTitle>
                            <DialogDescription>
                                The table shows all the exercises in this workout
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
                                </TableRow>
                            </TableHeader>
                            <TableBody className="TableBody">
                                {exerciseArray.map((exercise, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{exercise.exercise_name}</TableCell>
                                        <TableCell>{exercise.n_sets}</TableCell>
                                        <TableCell>{exercise.n_reps}</TableCell>
                                        <TableCell>{exercise.weight}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                </Dialog>
                <> {workoutTitle} </>
                <Button variant="link" size="icon" onClick={(e) => handleDeleteWorkout(e, data)}>
                    <Minus className="h-4 w-4" />
                </Button>
            </div>
            <div>
                {exerciseArray.map((exercise, index) => (
                    <WorkoutExerciseCard key={index}
                        cardTitle={exercise.exercise_name}
                        cardContent={exercise.image_url}
                        cardDescription={exercise.exercise_target}
                        reps={exercise.n_reps}
                        sets={exercise.n_sets}
                        uid={exercise.uid}
                        handleDeleteExerciseWorkout={handleDeleteExerciseWorkout}
                    />
                    ))}
            </div>
            <AddExerciseToWorkout
            avaliableExercises = {avaliableExercises}
            data={data}
            />
        </div>
    )
}

export default WorkoutComponent;