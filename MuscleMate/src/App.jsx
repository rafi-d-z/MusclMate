import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState("data not called yet");

  async function callAPI() {
    try {
      const response = await axios.get('http://localhost:3000/');
      if (response.status === 200) {
        console.log(response)
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    callAPI().then(data => setData(data));
  }, []);

  async function onClick(){
    try{
      const response = await axios.get('http://localhost:3000/UI_Test');
      if (response.status === 200){
        console.log(response);
        return response.data;
      }
    }catch(error){
      console.error(error);
    }
  } 

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{data}</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={onClick()}>End-to-end test</button>
    </>
  )
}

export default App