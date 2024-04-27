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
                        {/* Popover content */}
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