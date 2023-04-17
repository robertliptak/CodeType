import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
