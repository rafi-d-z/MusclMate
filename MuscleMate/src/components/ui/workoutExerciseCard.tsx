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

    cardTitle: any;
    cardContent: any;
    cardDescription: any;
}

export const WorkoutExerciseCard: React.FC<WorkoutExerciseCardProps> = ({
    cardTitle,
    cardContent,
    cardDescription,

}) => {
    return (

            <Card className="w-[200px] m-4">
                <CardHeader>
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardDescription>{cardDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <img src={cardContent}></img>
                </CardContent>
                <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="link" size="icon">
                        <Minus className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
    );
};

export default WorkoutExerciseCard;