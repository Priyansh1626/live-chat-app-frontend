import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import ChatPage from "../src/pages/ChatPage";
import Signup from "../src/components/auth/Signup";
import Login from "../src/components/auth/Login";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/chats" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  );
}
