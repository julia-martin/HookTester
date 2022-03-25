import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import InspectPage from "./components/InspectPage";
import './App.css';
import * as waypost from 'waypost-sdk-react';

const { Config, WaypostProvider } = waypost;
const config = new Config('6195d913-6d2f-45ca-a965-a982af89def4', "http://provider.waypost-io.net");

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
