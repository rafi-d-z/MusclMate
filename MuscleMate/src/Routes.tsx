import { createBrowserRouter } from "react-router-dom";
import MainMenu from "./App";
import Workout from "./workout";
import Login from "./Login";
import Exercise from "./Exercise";
  
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
    },
    {
      path: "/exercise",
      element: <Exercise />
    }
  ]);
  
  export default Routes