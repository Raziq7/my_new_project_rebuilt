import React from "react";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./screen/Home";
import AddProduct from "./screen/AddProduct";
import SideNav from "./components/SideNav/SideNav";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./screen/Dashboard";
import Smple from "./screen/Smple";

function App() {
  return (
    <div>
      <Routers>
        <Navbar />
        <Flex alignItems="center">
          <SideNav />
          <Routes>
            <Route path="/signup" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/addProduct" element={<AddProduct />} />

            <Route path="/home" element={<Home />} />

            <Route path="/" element={<Dashboard />} />
            <Route path="/sample" element={<Smple />} />
          </Routes>
        </Flex>
      </Routers>
    </div>
  );
}

export default App;
