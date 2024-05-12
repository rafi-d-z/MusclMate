import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
/* import './App.css' */
import axios from "axios";
import exercise from "../DAO/exercise";
import TopBar from "./components/ui/topBar";

function MainMenu() {
  const [selectedCard, setSelectedCard] = useState<exercise>({
    uid: "",
    exercise_name: "",
    exercise_target: "",
    image_url: "",
    n_reps: 0,
    n_sets: 0,
    weight: 0,
    difficulity: "",
    creator: "",
  });

  const [selectedCardData, setSelectedCardData] = useState<exercise[]>([]);

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
      <TopBar />
      
      <Tabs defaultValue="" className="w-[1200px]">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: '' })}>Trending</TabsTrigger>
          <TabsTrigger value="arms" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'arms' })}>Arms</TabsTrigger>
          <TabsTrigger value="legs" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'legs' })}>Legs</TabsTrigger>
          <TabsTrigger value="chest" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'chest' })}>Chest</TabsTrigger>
          <TabsTrigger value="back" onClick={() => setSelectedCard({ ...selectedCard, exercise_target: 'back' })}>Back</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCard.exercise_target} className="grid grid-cols-5 gap-10">
          {(selectedCard.exercise_target === "" ? selectedCardData
            : selectedCardData.filter(data => data.exercise_target === selectedCard.exercise_target)).map((data, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{data.exercise_name}</CardTitle>
                  <CardDescription>{data.exercise_target}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={data.image_url}></img>
                </CardContent>
                <CardFooter>
                  {data.n_reps}/{data.n_sets}
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default MainMenu;