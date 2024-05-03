import React, { useState } from "react"
import { Plus, Minus, Check, ChevronsUpDown, Pencil } from "lucide-react"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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

interface WorkoutExerciseCardProps {
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
}

export const WorkoutExerciseCard: React.FC<WorkoutExerciseCardProps> = ({
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
}) => {
    return (
            <Card className="w-[200px] m-4">
                <CardHeader>
                    <CardTitle>Exercise 1</CardTitle>
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
    );
};

export default WorkoutExerciseCard;