import React from "react";
import "./App.css";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./screen/Home";
import AddProduct from "./screen/AddProduct";
import SideNav from "./components/SideNav/SideNav";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./screen/Dashboard";
// import Smple from "./screen/Smple";
import EditProductForm from "./screen/EditProductForm";
import UserManagment from "./screen/UserManagment";
import Category from "./components/Category";
import ParchaseStock from "./screen/ParchaseStock";
import SettingComponent from "./components/SettingComponent";
import Sample from "./screen/Sample";

function App() {
  return (
    <div>
      <Routers>
        <Navbar />
        <Flex alignItems="center">
          <SideNav />
          <Routes>
            <Route path="/StaffForm" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/addProduct" element={<AddProduct />} />

            <Route path="/home" element={<Home />} />

            <Route path="/" element={<Dashboard />} />

            <Route path="/categorymanagment" element={<Category />} />

            <Route path="/Setting" element={<SettingComponent />} />

            <Route path="/editProduct/:id" element={<EditProductForm />} />

            <Route path="/usermanagment" element={<UserManagment />} />

            <Route path="/purchaseStock" element={<ParchaseStock />} />

            <Route path="/sample" element={<Sample />} />
          </Routes>
        </Flex>
      </Routers>
    </div>
  );
}

export default App;
