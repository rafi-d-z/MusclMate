import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
/* import './App.css' */
import muscleLogo from "./assets/MuscleLogo.png";
import { Menubar } from "@/components/ui/menubar";
import axios from "axios";
import exercise from "../DAO/exercise";

interface CardData {
  name: string;
  uid: number;
  type: string;
  reps: number;
  sets: number;
  url: string;
}

function MainMenu() {
  const [selectedCard, setSelectedCard] = useState<exercise>({
    uid: "",
    exercise_name: "",
    exercise_target: "",
    image_url: "",
    n_reps: 0,
    n_sets: 0,
    weight: 0,
  });
  const [selectedCardData, setSelectedCardData] = useState<CardData[]>([]);

  // fetch all data
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
          console.log("Data:", response.data);
        })
        .catch((res) => {
          console.error("Error connecting to server,", res);
        });
    };

    fetchData();
  }, [selectedCard]);

  return (
    <>
      {/* top bar components */}
      <div className="flex items-center justify-between p-8 lg:px-8">
        <img src={muscleLogo} width={200} height={200} />
        <div className="mt-5 flex lg:ml-4 gap-20">
          <Input placeholder="Search" className="w-[200px] " />
          <Menubar />
        </div>
      </div>

      <Tabs defaultValue={selectedCard} className="w-[1200px]">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="" onClick={() => setSelectedCard("")}>
            Trending
          </TabsTrigger>
          <TabsTrigger value="arms" onClick={() => setSelectedCard("arms")}>
            Arms
          </TabsTrigger>
          <TabsTrigger value="legs" onClick={() => setSelectedCard("legs")}>
            Legs
          </TabsTrigger>
          <TabsTrigger value="chest" onClick={() => setSelectedCard("chest")}>
            Chest
          </TabsTrigger>
          <TabsTrigger value="back" onClick={() => setSelectedCard("back")}>
            Back
          </TabsTrigger>
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
  );
}

export default MainMenu;