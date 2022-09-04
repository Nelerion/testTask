import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Reg from './pages/reg/reg';
import Auth from './pages/auth/auth';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TableUs from './pages/table/table';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/table" element={<TableUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
