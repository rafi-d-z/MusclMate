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

function User(){
    const [userInfo, setUserInfo] = useState([]);
    const [uid, setUID] = useState<string | undefined>("");

    useEffect(() => {
        const authState = getAuth(config.app);
        onAuthStateChanged(authState, user => {
            if (user) {
                console.log(user.uid)
                setUID(user.uid);

                if(uid !== undefined){
                axios({
                    method: 'get',
                    url: 'https://api-muscleman.com/get_user',
                    params: {
                        uid: uid
                    }
                })
                .then(function (response) {
                    console.log(response.data)
                })
            }
            }
        });
    }, []);    
        // get user information via user api (includes exercise and workouts)
    return (
        <>
            <TopBar />
            {/* user information
                user workouts
                user exercises */}
            <div>
                <h1>Your Exercises</h1>
                <ul>
                    {/* {userInfo.map((exercise: { name: string; }) => (
                        <li>{exercise.name}</li>
                    ))} */}
                </ul>
            </div>
        </>
    );
}

export default User;