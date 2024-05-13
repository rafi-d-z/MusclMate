/*
Plans for this Page:
1. User will be able to see their profile information
2. User will be able to see their owned workouts
3. User will be able to see their owned exercises

If Possible:
User edit their profile information
User edit their workouts
User edit their exercises
*/
import TopBar from "@/components/ui/topBar";
import { SetStateAction, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import config from "../auth/firebase.config"
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import exercise from "DAO/exercise";

function User(){
    const [userExercises, setUserExercises] = useState<Array<any> | undefined>(undefined);
    const [userWorkouts, setUserWorkouts] = useState<Array<any> | undefined>(undefined);
    const [uid, setUID] = useState<string | undefined>("");
    

    useEffect(() => {
        const authState = getAuth(config.app);
        onAuthStateChanged(authState, user => {
            if (user) {
                console.log(user.uid)
                setUID(user.uid);
    
                axios({
                    method: 'get',
                    url: 'https://api-muscleman.com/get_user',
                    params: {
                        uid: user.uid
                    }
                })
                .then(function (response) {
                    console.log(response.data)
                    setUserExercises(response.data[0].exercises)
                    setUserWorkouts(response.data[0].workouts)
                })
            }
        });
    }, []); 
    console.log(userExercises)
    console.log(userWorkouts)

    // get user information via user api (includes exercise and workouts)
    return (
        <>
            <TopBar />
            {/* user information
                user workouts
                user exercises */}
            <div key="exercises">
                <h1>Your Exercises</h1>
                {userExercises && userExercises.length > 0 && 
                    <div className="flex flex-row space-x-4 overflow-x-auto">
                        {userExercises.map((exercise: exercise) => {
                            return (
                                <div key={exercise.uid} className="w-52">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{exercise.exercise_name}</CardTitle>
                                            <CardDescription>{exercise.exercise_target}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={exercise.image_url}></img>
                                        </CardContent>
                                        <CardFooter>
                                            Reps: {exercise.n_reps} / Sets: {exercise.n_sets} / Weight: {exercise.weight}
                                        </CardFooter>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>

            <div key="workouts">
                <h1>Your Workouts</h1>
                {userWorkouts && userWorkouts.length > 0 &&
                    <div className="flex flex-wrap space-x-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Workout Name</CardTitle>
                                <CardDescription>Workout Description</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    
                }
            </div>
        </>
    )
}

export default User;