import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import InspectPage from "./components/InspectPage";
import './App.css';
import * as waypost from 'waypost-sdk-react';

const { Config, WaypostProvider } = waypost;
const config = new Config('359c3d18-b92d-4183-98ed-b3d0a4f295f7', "http://localhost:5050");

export const UserContext = createContext();

function App() {
  const [ userId, setUserId ] = useState(localStorage.getItem("hooktester-userId") || '');

  return (
    <WaypostProvider config={config}>
      <UserContext.Provider value={{ userId, setUserId }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage setUserId={setUserId} />} />
            <Route path="/inspect/:url" element={<InspectPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </WaypostProvider>
  );
}

export default App;
