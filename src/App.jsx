import React from "react";
import "./style/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Homebody from "./components/homepage/Homebody";
import Signup from "./components/auth/Signup";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={[<Navbar key={1} />, <Homebody key={2} />]}
          />
          <Route
            exact
            path="/signup"
            element={[<Navbar key={1} />, <Signup key={2} />]}
          />
        </Routes>
      </Router>
    </>
  );
}
