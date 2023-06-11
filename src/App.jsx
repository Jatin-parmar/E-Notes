import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Buttons from "./components/Buttons";
import Home from "./components/Home";
import Notes from "./components/Note";

function App() {
  return (
      <Router>
        <Buttons />
      </Router>
  );
}

export default App;
