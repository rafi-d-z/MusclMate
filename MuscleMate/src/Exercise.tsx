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
import config from "../auth/firebase.config"
import { getAuth, onAuthStateChanged } from "firebase/auth"

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
  const [exerciseName, setExerciseName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [exerciseTarget, setExerciseTarget] = useState('arms');
  const [image_url, setImageUrl] = useState('https://via.placeholder.com/150');
  const [exerciseNameEdit, setExerciseNameEdit] = useState('');
  const [repsEdit, setRepsEdit] = useState('');
  const [setsEdit, setSetsEdit] = useState('');
  const [weightEdit, setWeightEdit] = useState('');
  const [image_urlEdit, setImageUrlEdit] = useState('');
  const [exerciseTargetEdit, setExerciseTargetEdit] = useState('');
  const [uid, setUID] = useState('notSystem');

  useEffect(() => {
    const authState = getAuth(config.app);
    onAuthStateChanged(authState, user => {
      setUID(user?.uid || 'not logged in');
      console.log(uid)
    });
  })

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
    console.log("Weight: ",value);
    setWeight(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImageUrl(value);
  }

  const handleRepsChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    setRepsEdit(value);
  };


  const handleSetsChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    setSetsEdit(value);
  };


  const handleWeightChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    setWeightEdit(value);
  };

  const handleImageChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImageUrlEdit(value);
  }

  const onClickEdit = (e: React.MouseEvent<HTMLButtonElement>, exercise_card: exercise) => {
    e.preventDefault();
    console.log(exercise_card.exercise_name);

    setExerciseNameEdit(exercise_card.exercise_name);
    setExerciseTargetEdit(exercise_card.exercise_target);
    setRepsEdit(exercise_card.n_reps.toString());
    setSetsEdit(exercise_card.n_sets.toString());
    setWeightEdit(exercise_card.weight.toString());
    setImageUrlEdit(exercise_card.image_url);
  }

  const handleAddNewExercise = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // eslint-disable-next-line prefer-const
    let cardToAdd: exercise = {
      uid: "",
      exercise_name: exerciseName,
      exercise_target: exerciseTarget,
      image_url: image_url,
      n_reps: parseInt(reps),
      n_sets: parseInt(sets),
      weight: parseInt(weight),
      arr_keywords: [],
      description: '', // TODO: add functionality to add this
      difficulty: '', // TODO: add functionality to add this
      creator: uid
    }

    axios.post("https://api-muscleman.com/create_exercise", {
      uid: "",
      exercise_name: exerciseName,
      exercise_target: exerciseTarget,
      image_url: image_url,
      n_reps: reps,
      n_sets: sets,
      weight: weight,
      // add functionality to add desc, difficulity 
      creator: uid
    })
      .then(function (response) {
        cardToAdd.uid = response.data.uid;
        setSelectedCardData([cardToAdd, ...selectedCardData]);
        console.log(cardToAdd);
        console.log("Data: ", response.data);
      })
      .catch((res) => {
        console.error("Error connecting to server,", res.response.data);
      });

    setIsPopoverOpen(false);
  };

  const handleEditExercise = async (e: React.MouseEvent<HTMLButtonElement>, exercise_card: exercise) => {
    e.preventDefault();
    console.log(exercise_card);


    axios.post("https://api-muscleman.com/edit_exercise", {
      uid: exercise_card.uid,
      exercise_name: exerciseNameEdit,
      exercise_target: exerciseTargetEdit,
      image_url: image_urlEdit,
      n_reps: repsEdit,
      n_sets: setsEdit,
      weight: weightEdit,
      arr_keywords: JSON.stringify(exercise_card.arr_keywords)
    })
      .then(function (response) {
        const updatedData = { exercise_name: exerciseNameEdit, exercise_target: exerciseTargetEdit, n_reps: parseInt(repsEdit), n_sets: parseInt(setsEdit), weight: parseInt(weightEdit), image_url: image_urlEdit};
        setSelectedCardData(selectedCardData.map((data) => (data.uid === exercise_card.uid ? { ...data, ...updatedData } : data)));
        console.log("Data: ", response.data);
      })
      .catch((res) => {
        console.error("Error connecting to server,", res.response.data);
      });

    setIsPopoverOpen(false);
  };


  const handleDeleteCard = async (e: React.MouseEvent<HTMLButtonElement>, exercise_card: exercise) => {
    e.preventDefault();
    console.log(exercise_card);

    axios.delete("https://api-muscleman.com/delete_exercise", {
      data: {
        uid: exercise_card.uid,
        exercise_name: exercise_card.exercise_name,
        exercise_target: exercise_card.exercise_target,
        image_url: JSON.stringify(exercise_card.image_url),
        n_reps: exercise_card.n_reps,
        n_sets: exercise_card.n_sets,
        weight: exercise_card.weight,
        arr_keywords: JSON.stringify(exercise_card.arr_keywords)
      },
    }).then((response) => {
      // since obj delted in selectedCardData array, remove it from array
      setSelectedCardData(selectedCardData.filter((card) => card.uid !== exercise_card.uid));
      console.log("Response: ", response.data);
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
                              <SelectItem value="arms">Arms</SelectItem>
                              <SelectItem value="legs">Legs</SelectItem>
                              <SelectItem value="chest">Chest</SelectItem>
                              <SelectItem value="back">Back</SelectItem>
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
                          <Label htmlFor="img_url">Image URL:</Label>
                          <Input id="img_url" value={image_url} onChange={(e) => setImageUrl(e.target.value)} className="col-span-2 h-8" />
                        </div>

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
                      onClick={(e) => handleDeleteCard(e, data)}
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
                        <button onClick={(e) => onClickEdit(e, data)}>
                          <PopoverTrigger asChild >
                            <FontAwesomeIcon icon={faPencilAlt} className="w-6 h-6 text-black" />
                          </PopoverTrigger>
                        </button>

                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Edit Exercise</h4>
                            <p className="text-sm text-muted-foreground">Edit exercise details here</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="exerciseName">Name: </Label>
                              <Input id="exerciseName" value={exerciseNameEdit} onChange={(e) => setExerciseNameEdit(e.target.value)} className="col-span-2 h-8" />

                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="targetMuscles">Target Muscles:</Label>
                              <Select onValueChange={setExerciseTargetEdit}>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder={data.exercise_target} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="arms">Arms</SelectItem>
                                  <SelectItem value="legs">Legs</SelectItem>
                                  <SelectItem value="chest">Chest</SelectItem>
                                  <SelectItem value="back">Back</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="reps">Reps:</Label>
                              <Input id="reps" value={repsEdit} onChange={handleRepsChangeEdit} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="sets">Sets:</Label>
                              <Input id="sets" value={setsEdit} onChange={handleSetsChangeEdit} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="weight">Weight:</Label>
                              <Input id="weight" value={weightEdit} onChange={handleWeightChangeEdit} className="col-span-2 h-8" />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="img_url">Image URL:</Label>
                              <Input id="img_url" value={image_urlEdit} onChange={(e) => setImageUrlEdit(e.target.value)} className="col-span-2 h-8" />
                            </div>
                            <Button onClick={(e) => handleEditExercise(e, data)}>Submit</Button>


                          </div>
                        </div>
                      </PopoverContent>

                    </Popover>
                  </div>
                  Reps: {data.n_reps} / Sets: {data.n_sets} / Weight: {data.weight}
                </CardFooter>

              </Card>
            ))}
        </TabsContent>

      </Tabs>
    </>
  )
}

export default Exercise