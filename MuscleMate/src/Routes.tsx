import {
    createBrowserRouter,
  } from "react-router-dom";
  import MainMenu from "./App";
  import Workout from "./workout";
  
  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainMenu />
    },
    {
      path: "/Workout",
      element: <Workout />
    }
  ]);
  
  export default Routes