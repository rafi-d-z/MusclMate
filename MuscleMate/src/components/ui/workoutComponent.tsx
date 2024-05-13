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

interface WorkoutComponentProps {
    workoutTitle: any;
    exerciseArray: Array<any>;
    handleDeleteWorkout: (e: React.MouseEvent<HTMLButtonElement>, data: any) => void;
    data: any;
    avaliableExercises: any[];
}

export const WorkoutComponent: React.FC<WorkoutComponentProps> = ({
    workoutTitle,
    exerciseArray,
    handleDeleteWorkout,
    data,
    avaliableExercises
}) => {
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
                        cardTitle={exercise.name}
                        cardContent={exercise.image_url}
                        cardDescription={exercise.exercise_target}
                    />))}
            </div>
            <AddExerciseToWorkout
            avaliableExercises = {avaliableExercises}/>
        </div>
    )
}

export default WorkoutComponent;