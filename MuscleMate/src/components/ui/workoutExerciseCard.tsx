import React from "react"
import { Minus } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WorkoutExerciseCardProps {
    cardTitle: string;
    cardContent: string;
    cardDescription: string;
    reps: number;
    sets: number;
    uid: string;
    handleDeleteExerciseWorkout: (e: React.MouseEvent<HTMLButtonElement>, uid: string) => void;
}

export const WorkoutExerciseCard: React.FC<WorkoutExerciseCardProps> = ({
    cardTitle,
    cardContent,
    cardDescription,
    reps,
    sets,
    uid,
    handleDeleteExerciseWorkout
}) => {
    const handleBeforeDelete = async (e: React.MouseEvent<HTMLButtonElement>,)  => {
        handleDeleteExerciseWorkout(e, uid);
    }
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
                {reps}/{sets}
                    <Button variant="link" size="icon" onClick={handleBeforeDelete}>
                        <Minus className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
    );
};

export default WorkoutExerciseCard;