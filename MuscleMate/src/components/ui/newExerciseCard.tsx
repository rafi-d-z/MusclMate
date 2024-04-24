import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "./label";
import { Input } from "./input";


export const NewExerciseCard: React.FC = () => {

  const [exerciseName, setExerciseName] = useState('Pull ups');
  const [reps, setReps] = useState('12');
  const [sets, setSets] = useState('3');
  const [weight, setWeight] = useState('none');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    setReps(value);
  };

  const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    setSets(value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value + ' lbs';
    setWeight(value);
  };

  const handleAddNewExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

 
    const exercise = {
      name: exerciseName,
      reps: reps,
      sets: sets,
      weight: weight
    };

    console.log('New Exercise:', exercise);
    setIsPopoverOpen(false);

  };

  const handleCancel = () => {

    setExerciseName('Pull ups');
    setReps('3');
    setSets('12');
    setWeight('none');

    setIsPopoverOpen(false);
  };

  return (
    <Card className="w-[210px]">
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <button style={{ width: '170px', height: '190px', fontSize: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setIsPopoverOpen(true)}>+</button>
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
      </CardContent>
    </Card>
  );
};

export default NewExerciseCard;
