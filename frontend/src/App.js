import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Ticket from "./components/Ticket";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> //Home page for all tickets
        <Route path="/ticket/:id" element={<Ticket />} /> //Single ticket info
        page
      </Routes>
    </BrowserRouter>
  );
};

export default App;
