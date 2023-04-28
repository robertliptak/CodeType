import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Registration from "./pages/registration";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/registration" Component={Registration} />
      </Routes>
    </Router>
  );
};

export default App;
