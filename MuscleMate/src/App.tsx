import { z } from "zod"
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"


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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import './App.css'
import muscleLogo from './assets/MuscleLogo.png'
import { MenuBar } from "./components/ui/menuBar"
import axios from 'axios';

interface CardData{
  name: string,
  uid: number,
  type: string,
  reps: number
  sets: number,
  url:string
}

function MainMenu() {

  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCardData, setSelectedCardData] = useState<CardData[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        console.log("Type:", selectedCard)
        axios({
          method: 'get',
          url: 'http://18.188.202.206:3000/get_mock_exercise',
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
          <MenuBar/>
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
          {selectedCardData.map((data, index) => (
              <Card key={index}>
                  <CardHeader>
                      <CardTitle>{data.name}</CardTitle>
                      <CardDescription>{data.type}</CardDescription>
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

export default MainMenu