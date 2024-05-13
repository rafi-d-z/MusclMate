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
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
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
import workout from "@/DAO/workout"

interface CreateWorkoutCardProps {
    workoutName: string;
    setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
    handleAddNewWorkout: (e: React.MouseEvent<HTMLButtonElement>) => any;
    avaliableExercises: exercise[];
    handleCheckboxChange: (e, exercise_uid: string) => any;

}

export const CreateWorkoutCard: React.FC<CreateWorkoutCardProps> = (
    { workoutName, avaliableExercises, setWorkoutName, handleAddNewWorkout, handleCheckboxChange }

) => {

    return (
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
                                <TableRow >
                                        <TableCell className="font-medium">{exercise.exercise_name}</TableCell>
                                        <TableCell>{exercise.exercise_target}</TableCell>
                                        <TableCell>{exercise.n_reps}</TableCell>
                                        <TableCell>{exercise.n_sets}</TableCell>
                                        <TableCell>{exercise.weight}</TableCell>
                                        <TableCell className="text-right"><Checkbox onClick={(e) => handleCheckboxChange(e, exercise.uid)} /></TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="Name" placeholder="Name" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
                            <Button type="submit" onClick={handleAddNewWorkout}>Submit</Button>
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
    );
}
export default CreateWorkoutCard;