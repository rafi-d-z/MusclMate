import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { NewExerciseCard } from "./components/ui/newExerciseCard"
import { Menubar } from "./components/ui/menubar"
import muscleLogo from './assets/MuscleLogo.png'
import axios from 'axios';
import './App.css'
<<<<<<< HEAD
import { exercise } from "DAO/exercise"


function Exercise() {
  const [selectedCard, setSelectedCard] = useState<exercise>( {
=======
//import {exercise} from "DAO/exercise"


interface CardData {
  name: string,
  uid: number,
  type: string,
  reps: number
  sets: number,
  url: string
}


function Exercise() {
  const [selectedCard, setSelectedCard] = useState( {
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521
          uid: "",
          exercise_name: "",
          exercise_target: "",
          image_url: "",
          n_reps: 0,
          n_sets: 0,
          weight: 0,
          arr_keywords: []
  });
<<<<<<< HEAD
  const [selectedCardData, setSelectedCardData] = useState<exercise[]>([]);
=======
  const [selectedCardData, setSelectedCardData] = useState<CardData[]>([]);
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521

  useEffect(() => {
    const fetchData = async () => {
      console.log("Type:", selectedCard);

      axios({
        method: "get",
<<<<<<< HEAD
        url: "https://api-muscleman.com/get_exercises",
=======
        url: "https://api-muscleman.com/get_mock_exercise",
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521
        params: {
          uid: selectedCard.uid,
          exercise_name: selectedCard.exercise_name,
          exercise_target: selectedCard.exercise_target,
          image_url: selectedCard.image_url,
          n_reps: selectedCard.n_reps,
          n_sets: selectedCard.n_sets,
          weight: selectedCard.weight,
          arr_keywords: selectedCard.arr_keywords
        },
      })
        .then(function (response) {
          setSelectedCardData(response.data);
<<<<<<< HEAD
          console.log("Data: ", response.data)
=======
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521
        })
        .catch((res) => {
          console.error("Error connecting to server,", res);
        });
    };

    fetchData();
  }, [selectedCard]);

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      console.log("Type:", selectedCard);

      axios({
        method: "post",
        url: "https://api-muscleman.com/create_exercise",
        params: {
          uid: selectedCard.uid,
          exercise_name: selectedCard.exercise_name,
          exercise_target: selectedCard.exercise_target,
          image_url: selectedCard.image_url,
          n_reps: selectedCard.n_reps,
          n_sets: selectedCard.n_sets,
          weight: selectedCard.weight
        },
      })
        .then(function (response) {
          setSelectedCardData(response.data);
          console.log("Data: ", response.data)
        })
        .catch((res) => {
          console.error("Error connecting to server,", res);
        });
    };
=======
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521

    fetchData();
  }, [selectedCard]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Type:", selectedCard);

<<<<<<< HEAD
      axios({
        method: "delete",
        url: "https://api-muscleman.com/delete_exercise",
        params: {
          uid: selectedCard.uid,
          exercise_name: selectedCard.exercise_name,
          exercise_target: selectedCard.exercise_target,
          image_url: selectedCard.image_url,
          n_reps: selectedCard.n_reps,
          n_sets: selectedCard.n_sets,
          weight: selectedCard.weight
        },
      })
        .then(function (response) {
          setSelectedCardData(response.data);
          console.log("Data: ", response.data)
        })
        .catch((res) => {
          console.error("Error connecting to server,", res);
        });
    };
=======
  const [exerciseName, setExerciseName] = useState('data.name');
  const [reps, setReps] = useState('data.reps');
  const [sets, setSets] = useState('data.sets');
  const [weight, setWeight] = useState('none');
  const [, setIsPopoverOpen] = useState(false);
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521

    fetchData();
  }, [selectedCard]);

<<<<<<< HEAD
  const [exerciseName, setExerciseName] = useState('data.name');
  const [reps, setReps] = useState('data.reps');
  const [sets, setSets] = useState('data.sets');
  const [weight, setWeight] = useState('none');
  const [, setIsPopoverOpen] = useState(false);


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
=======
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

>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521

  const handleAddNewExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

<<<<<<< HEAD
  const handleAddNewExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

=======
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521

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


  const handleDeleteCard = (index: number) => {
    const updatedData = [...selectedCardData];
    updatedData.splice(index, 1);
    setSelectedCardData(updatedData);
  };
<<<<<<< HEAD


=======


>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521
  return (
    <>
      <div className="flex items-center justify-between p-8 lg:px-8">
        <img src={muscleLogo} width={200} height={200} />
        <div className="mt-5 flex lg:ml-4 gap-20">
          <Input placeholder="Search" className="w-[200px] " />
          <Menubar />
        </div>
      </div>

<<<<<<< HEAD
      <Tabs defaultValue="" className="w-[1200px]">
=======
      <Tabs defaultValue={selectedCard.exercise_target} className="w-[1200px]">
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: '' })}>Trending</TabsTrigger>
          <TabsTrigger value="arms" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'arms' })}>Arms</TabsTrigger>
          <TabsTrigger value="legs" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'legs' })}>Legs</TabsTrigger>
          <TabsTrigger value="chest" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'chest' })}>Chest</TabsTrigger>
          <TabsTrigger value="back" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'back' })}>Back</TabsTrigger>
        </TabsList>
<<<<<<< HEAD
=======
      
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521

        <TabsContent value={selectedCard.exercise_target} className="grid grid-cols-5 gap-10">
          <NewExerciseCard />
          {(selectedCard.exercise_target === "" ? selectedCardData // If "Trending" tab is selected, render all cards
<<<<<<< HEAD
            : selectedCardData.filter(data => data.exercise_target === selectedCard.exercise_target)) // Otherwise, filter the data based on the selected exercise target
          .map((data, index) => (
=======
            : selectedCardData.filter(data => data.type === selectedCard.exercise_target)) // Otherwise, filter the data based on the selected exercise target
            .map((data, index) => (
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521
            <Card key={index}>
              <CardHeader>
                <div className="relative">
                  <button
                    className="absolute top-0 right-0 -mt-3 -mr-4 text-black focus:outline-none"
                    onClick={() => handleDeleteCard(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} className="w-6 h-5" />
                  </button>
                </div>
<<<<<<< HEAD
                <CardTitle>{data.exercise_name}</CardTitle>
                <CardDescription>{data.exercise_target}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={data.image_url}></img>
=======
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>{data.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={data.url}></img>
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521
              </CardContent>
              <CardFooter className="relative">
                <div className="absolute bottom-0 right-0 mb-2 mr-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FontAwesomeIcon icon={faPencilAlt} className="w-6 h-6 text-black" />
                    </PopoverTrigger>

                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Edit Exercise</h4>
                          <p className="text-sm text-muted-foreground">Edit exercise details here</p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="exerciseName">Name: </Label>
                            <Input id="exerciseName" defaultValue={data.name} onChange={(e) => setExerciseName(e.target.value)} className="col-span-2 h-8" />

                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="targetMuscles">Target Muscles:</Label>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={data.type} />
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
                            <Input id="reps" defaultValue={data.reps} onChange={handleRepsChange} className="col-span-2 h-8" />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="sets">Sets:</Label>
                            <Input id="sets" defaultValue={data.sets} onChange={handleSetsChange} className="col-span-2 h-8" />
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

                  </Popover>
                </div>
<<<<<<< HEAD
                {data.n_reps}/{data.n_sets}
=======
                {data.reps}/{data.sets}
>>>>>>> 96325ca416ced551c1a4d41a8f42ccba397e5521
              </CardFooter>

            </Card>
          ))}
        </TabsContent>

      </Tabs>
    </>
  )
}

export default Exercise