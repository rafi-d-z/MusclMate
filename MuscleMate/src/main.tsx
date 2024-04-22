import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes';
import './index.css'
import { RouterProvider } from "react-router-dom";


// main routes - can contain nested routes
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={Routes} />
  </React.StrictMode>,
)
