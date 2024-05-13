import React from "react"
import { Pencil, Minus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkoutExerciseCard } from "@/components/ui/workoutExerciseCard"
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
import { NewExerciseCard } from "@/components/ui/newExerciseCard"

interface WorkoutComponentProps {
    isPopoverOpen: boolean;
    exerciseName: string;
    setExerciseName: (value: any) => void;
    reps: string;
    sets: string;
    weight: string;
    handleWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRepsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCancel: () => void;
    handleAddNewExercise: (e: React.MouseEvent<HTMLButtonElement>) => void;
    workoutTitle: any;
    listOfExercise: Array<any>;
    exerciseArray: Array<any>;
    handleDeleteWorkout: (e: React.MouseEvent<HTMLButtonElement>, data: any) => void;
    data: any;
}

export const WorkoutComponent: React.FC<WorkoutComponentProps> = ({
    isPopoverOpen,
    exerciseName,
    setExerciseName,
    reps,
    sets,
    weight,
    handleWeightChange,
    handleRepsChange,
    handleSetsChange,
    handleCancel,
    handleAddNewExercise,
    workoutTitle,
    exerciseArray,
    handleDeleteWorkout,
    data
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
                            <TableBody>
                                {exerciseArray.map((exercise, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{exercise.name}</TableCell>
                                        <TableCell>{exercise.n_sets}</TableCell>
                                        <TableCell>{exercise.n_reps}</TableCell>
                                        <TableCell>{exercise.weight}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Table footer</TableCell>
                                    <TableCell>table footer</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <DialogFooter className="flex justify-between">
                            <DialogClose>
                                <Button variant="outline">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
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
                        cardTitle={exercise.name}
                        cardContent={exercise.image_url}
                        cardDescription={exercise.exercise_target}
                    />))}
            </div>
        </div>
    )
}

export default WorkoutComponent;