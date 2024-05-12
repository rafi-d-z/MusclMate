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
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import config from "../auth/firebase.config"
function User(){
    // get current user
    const [uid, setUID] = useState<string>('notSystem');
    useEffect(() => {
        const authState = getAuth(config.app);
        onAuthStateChanged(authState, user => {
        setUID(user?.uid || 'not logged in');
        console.log(uid)
        });
    })

    // get user information via user api (includes exercise and workouts)
    return (
        <>
            <TopBar />
            {/* user information
                user workouts
                user exercises */}
        </>
    );
}

export default User;