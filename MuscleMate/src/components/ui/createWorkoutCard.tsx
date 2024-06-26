import React from "react"
import { Plus } from "lucide-react"
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
import exercise from "@/DAO/exercise";
import { Label } from "./label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

interface CreateWorkoutCardProps {
    workoutName: string;
    setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
    handleAddNewWorkout: (e: React.MouseEvent<HTMLButtonElement>) => void;
    avaliableExercises: exercise[];
    handleCheckboxChange: (exercise_uid: string) => void;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
}


export const CreateWorkoutCard: React.FC<CreateWorkoutCardProps> = (
    { workoutName, avaliableExercises, setWorkoutName, handleAddNewWorkout, handleCheckboxChange, setDifficulty}
) => {    

    return (
        <Card className="w-[200px] h-[600px] m-4 bg-gray-200">
            <CardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardTitle>Create Workout</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Dialog>
                    <DialogTrigger>
                        <Plus className="h-20 w-20" />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Workout</DialogTitle>
                            <DialogDescription>
                                Select the exercises you want to include in your workout and enter the name of the workout, then click submit.
                            </DialogDescription>
                        </DialogHeader>

                        <Table>
                            <TableCaption>A list of exercises to add</TableCaption>
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
                                        <TableCell className="text-right"><Checkbox onCheckedChange={() => handleCheckboxChange(exercise.uid)} /></TableCell>
                                </TableRow>
                                </div>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="targetMuscles">Difficulty:</Label>
                          <Select onValueChange={setDifficulty}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="low" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        

                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="Name" placeholder="Name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
                            <Button type="submit" onClick={handleAddNewWorkout}>Submit</Button>
                        </div>
                        <DialogFooter className="flex justify-between">
                            <DialogClose>
                                    Close
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    );
}
export default CreateWorkoutCard;