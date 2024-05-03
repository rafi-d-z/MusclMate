import React from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkoutExerciseCard } from "@/components/ui/workoutExerciseCard"

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
}) => {
    return (
        <div className="flex flex-col items-center justify-between p-6 lg:px-8">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="link" size="icon">
                    <Plus className="h-4 w-4" />
                </Button>
                <h1>Workout 2</h1>
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
            />
        </div>
    )
}

export default WorkoutComponent;