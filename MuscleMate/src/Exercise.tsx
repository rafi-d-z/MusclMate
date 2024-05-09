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
// import { NewExerciseCard } from "./components/ui/newExerciseCard"
import { Menubar } from "./components/ui/menubar"
import muscleLogo from './assets/MuscleLogo.png'
import axios from 'axios';
import './App.css'
import exercise from "DAO/exercise"


function Exercise() {
  const [selectedCard, setSelectedCard] = useState<exercise>({
    uid: "",
    exercise_name: "",
    exercise_target: "",
    image_url: "",
    n_reps: 0,
    n_sets: 0,
    weight: 0,
    arr_keywords: []
  });
  const [selectedCardData, setSelectedCardData] = useState<exercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Type:", selectedCard);

      axios({
        method: "get",
        url: "https://api-muscleman.com/get_exercises",
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
          console.log("Data: ", response.data)
        })
        .catch((res) => {
          console.error("Error connecting to server,", res);
        });
    };

    fetchData();
  }, [selectedCard]);

  const [exerciseName, setExerciseName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('none');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [exerciseTarget, setExerciseTarget] = useState('');
  const [image_url, setImageUrl] = useState('https://via.placeholder.com/150');


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
    setWeight(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImageUrl(value);
  }


  const handleAddNewExercise = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let obj: exercise = {
      uid: "",
      exercise_name: exerciseName,
      exercise_target: exerciseTarget,
      image_url: image_url,
      n_reps: parseInt(reps),
      n_sets: parseInt(sets),
      weight: parseInt(weight),
      arr_keywords: []
    }
    
    axios.post("https://api-muscleman.com/create_exercise", {
      uid: "",
      exercise_name: exerciseName,
      exercise_target: exerciseTarget,
      image_url: image_url,
      n_reps: reps,
      n_sets: sets,
      weight: weight,
      arr_keywords: JSON.stringify([])
    })
    .then(function (response) {
      obj.uid = response.data.uid;
      setSelectedCardData([obj, ...selectedCardData]);
    })
    .catch((res) => {
      console.error("Error connecting to server,", res.response.data);
    });

    setIsPopoverOpen(false);
  };


  const handleCancel = () => {

    setExerciseName('Pull ups');
    setReps('3');
    setSets('12');
    setWeight('none');

    setIsPopoverOpen(false);
  };


  const handleDeleteCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
        const exerciseList = selectedCardData.filter(data => data.uid !== response.data);
        setSelectedCardData(exerciseList);
        console.log("Data: ", response.data);
      })
      .catch((res) => {
        console.error("Error connecting to server,", res);
      });
  };


  return (
    <>
      <div className="flex items-center justify-between p-8 lg:px-8">
        <img src={muscleLogo} width={200} height={200} />
        <div className="mt-5 flex lg:ml-4 gap-20">
          <Input placeholder="Search" className="w-[200px] " />
          <Menubar />
        </div>
      </div>

      <Tabs defaultValue="" className="w-[1200px]">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: '' })}>Trending</TabsTrigger>
          <TabsTrigger value="arms" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'arms' })}>Arms</TabsTrigger>
          <TabsTrigger value="legs" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'legs' })}>Legs</TabsTrigger>
          <TabsTrigger value="chest" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'chest' })}>Chest</TabsTrigger>
          <TabsTrigger value="back" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'back' })}>Back</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCard.exercise_target} className="grid grid-cols-5 gap-10">
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
                          <Select onValueChange={setExerciseTarget}>
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
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="sets">Image URL:</Label>
                          <Input id="img_url" value={image_url} onChange={handleImageChange} className="col-span-2 h-8" />
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
          {(selectedCard.exercise_target === "" ? selectedCardData // If "Trending" tab is selected, render all cards
            : selectedCardData.filter(data => data.exercise_target === selectedCard.exercise_target)) // Otherwise, filter the data based on the selected exercise target
            .map((data, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="relative">
                    <button
                      className="absolute top-0 right-0 -mt-3 -mr-4 text-black focus:outline-none"
                      onClick={handleDeleteCard}
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-6 h-5" />
                    </button>
                  </div>
                  <CardTitle>{data.exercise_name}</CardTitle>
                  <CardDescription>{data.exercise_target}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={data.image_url}></img>
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
                              <Input id="exerciseName" defaultValue={data.exercise_name} onChange={(e) => setExerciseName(e.target.value)} className="col-span-2 h-8" />

                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="targetMuscles">Target Muscles:</Label>
                              <Select>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder={data.exercise_target} />
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
                              <Input id="reps" defaultValue={data.n_reps} onChange={handleRepsChange} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="sets">Sets:</Label>
                              <Input id="sets" defaultValue={data.n_sets} onChange={handleSetsChange} className="col-span-2 h-8" />
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
                  {data.n_reps}/{data.n_sets}
                </CardFooter>

              </Card>
            ))}
        </TabsContent>

      </Tabs>
    </>
  )
}

export default Exercise