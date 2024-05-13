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