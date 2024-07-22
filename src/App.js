import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CreateWill from "./components/CreateWill";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-will" element={<CreateWill />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard currentUser={currentUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
