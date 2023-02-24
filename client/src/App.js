//import './App.css';
import ToDoApp from './to-do';
import React from 'react';
import { BrowserRouter,Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ToDoApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
