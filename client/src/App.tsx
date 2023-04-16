import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" Component={Login} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
