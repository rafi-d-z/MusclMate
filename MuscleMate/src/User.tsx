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
import { Card } from "./components/ui/card";
import exercise from "DAO/exercise";

function User(){
    const [userExercises, setUserExercises] = useState<Array<any> | undefined>(undefined);
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
                })
            }
        });
    }, []); 
    console.log(userExercises)

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
                userExercises.map((exercise: exercise) => {
                    return (
                        <div key={exercise.uid}>
                            <Card className='w-[210px]'>
                                <div key="exercise-content">
                                    <h2>{exercise.exercise_name}</h2>
                                    <p>{exercise.exercise_target}</p>
                                </div>
                            </Card>
                        </div>
                    )
                })
                }
            </div>
        </>
    );
}

export default User;