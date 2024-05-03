import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import config from "../auth/firebase.config";

const AuthGuard = () => {
		const [ loggedIn, setLoggedIn ] = useState(false);

		const auth = getAuth(config.app);
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				setLoggedIn(true);
			}
    });
    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthGuard
