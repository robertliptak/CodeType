import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Registration from "./pages/registration";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Link to="/registration">Registration</Link>
        <br />
        <Link to="/login">Login</Link>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/registration" Component={Registration} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
