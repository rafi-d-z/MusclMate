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
  import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
  
  interface CardData{
    name: string,
    uid: number,
    type: string,
    reps: number
    sets: number,
    url:string
  }
    
  function Exercise() {
    const [selectedCard, setSelectedCard] = useState("");
    const [selectedCardData, setSelectedCardData] = useState<CardData[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        console.log("Type:", selectedCard)
        axios({
          method: 'get',
          url: 'https://api-muscleman.com/get_mock_exercise',
          params: {
            type: selectedCard
          }
        }).then(function (response) {
          setSelectedCardData(response.data);
        });
      };
      fetchData();
    }, [selectedCard]);
  

    const [exerciseName, setExerciseName] = useState('data.name');
    const [reps, setReps] = useState('data.reps');
    const [sets, setSets] = useState('data.sets');
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
      <>
        <div className="flex items-center justify-between p-8 lg:px-8">
          <img src={muscleLogo} width={200} height={200}/>
          <div className="mt-5 flex lg:ml-4 gap-20">
            <Input placeholder="Search" className="w-[200px] "/>
            <Menubar/>
          </div>
        </div>
  
        <Tabs defaultValue={selectedCard} className="w-[1200px]">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="" onClick={() => setSelectedCard('')}>Trending</TabsTrigger>
            <TabsTrigger value="arms" onClick={() => setSelectedCard('arms')}>Arms</TabsTrigger>
            <TabsTrigger value="legs" onClick={() => setSelectedCard('legs')}>Legs</TabsTrigger>
            <TabsTrigger value="chest" onClick={() => setSelectedCard('chest')}>Chest</TabsTrigger>
            <TabsTrigger value="back" onClick={() => setSelectedCard('back')}>Back</TabsTrigger>        
          </TabsList>

          <TabsContent value={selectedCard} className="grid grid-cols-5 gap-10">
          <NewExerciseCard/>
          {Array.isArray(selectedCardData) && selectedCardData.map((data, index) => (
            <Card key={index}>
                <CardHeader>
                  <CardTitle>{data.name}</CardTitle>
                  <CardDescription>{data.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={data.url}></img>
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
                          <p className="text-sm text-muted-foreground">Add exercise details here</p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="exerciseName">Name: </Label>
                            <Input id="exerciseName" value={data.name} onChange={(e) => setExerciseName(e.target.value)} className="col-span-2 h-8" />

                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="targetMuscles">Target Muscles:</Label>
                            <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder= {data.type} />
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
                  <Input id="reps" value={data.reps} onChange={handleRepsChange} className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="sets">Sets:</Label>
                  <Input id="sets" value={data.sets} onChange={handleSetsChange} className="col-span-2 h-8" />
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
                  {data.reps}/{data.sets}
                </CardFooter>

            </Card>
          ))}
        </TabsContent>

      </Tabs>
    </>
  )
}
  
export default Exercise