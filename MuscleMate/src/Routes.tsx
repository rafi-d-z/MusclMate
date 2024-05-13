import { createBrowserRouter, Navigate } from "react-router-dom";
import MainMenu from "@/App";
import Workout from "@/workout";
import Auth from "@/Login";
import User from "@/User";
import config from "./auth/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { ReactNode } from 'react';
import Exercise from "./Exercise";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const auth = getAuth(config.app);
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return isLoggedIn;
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children; 
};

const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
        <MainMenu />
    ),
  },
  {
    path: "/workout",
    element: (
      <ProtectedRoute>
        <Workout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/exercise",
    element: (
      <ProtectedRoute>
        <Exercise />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    )
  },
  {
    path: "/login",
    element: <Auth />,  
  },
]);

export default Routes;
