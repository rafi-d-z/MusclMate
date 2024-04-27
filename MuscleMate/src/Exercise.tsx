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
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"
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
  
    return (
      <>
      {/* top bar components */}
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
            {selectedCardData.map((data, index) => (
                <Card key={index}>
                    <CardHeader>
                    <CardTitle>{data.name}</CardTitle>
                  <CardDescription>{data.type}</CardDescription>
                    <Popover>
      <PopoverTrigger asChild>
      <button className="absolute top-0 left-0 mt-2 ml-2">Edit</button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
              </CardHeader>
                    <CardContent>
                      <img src={data.url}></img>
                    </CardContent>
                    <CardFooter>
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