import React from "react";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./screen/Home";
import AddProduct from "./screen/AddProduct";

function App() {
  return (
    <div>
      <Routers>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/addProduct" element={<AddProduct />} />

          <Route path="/home" element={<Home />} />
        </Routes>
      </Routers>
    </div>
  );
}

export default App;
