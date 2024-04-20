import {
    createBrowserRouter,
  } from "react-router-dom";
  import MainMenu from "./App";
  import Workout from "./workout";
  import Login from "./Login";
  
  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainMenu />
    },
    {
      path: "/Workout",
      element: <Workout />
    },
      {
      path: "/login",
      element: <Login />
    }
  ]);
  
  export default Routes
