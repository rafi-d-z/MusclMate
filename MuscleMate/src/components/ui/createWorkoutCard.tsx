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

interface CreateWorkoutCardProps {
    workoutName: string;
    setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
    handleAddNewWorkout: (e: React.MouseEvent<HTMLButtonElement>) => any;
    avaliableExercises: string[];

}

export const CreateWorkoutCard: React.FC<CreateWorkoutCardProps> = (
    { workoutName, avaliableExercises, setWorkoutName, handleAddNewWorkout}

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

                        {/* drop down menu of exercises */}
                        {}

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