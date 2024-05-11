import React from "react"
import { Pencil, Minus } from "lucide-react"
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
    cardTitle: string;
    cardContent: string;
    cardDescription: string;
    workoutTitle: string;
    listOfExercise: Array<any>;
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
    cardTitle,
    cardContent,
    cardDescription,
    workoutTitle,
    listOfExercise,
    
}) => {
    return (
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
                                <h1>{workoutTitle}</h1>
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
                cardTitle={cardTitle}
                cardContent={cardContent}
                cardDescription={cardDescription}
            />
        </div>
    )
}

export default WorkoutComponent;