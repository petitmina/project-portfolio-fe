import React from "react";
import { Route, Routes } from "react-router";
import Register from "../page/Register";
import Login from "../page/Login";
import AllProduct from "../page/AllProduct";
import ProductDetail from "../page/ProductDetail";
import CartPage from "../page/CartPage";
import PaymentPage from "../page/PaymentPage";
import Admin from "../page/admin/Admin";
import AdminRegisterPage from "../page/admin/AdminRegister";
import AdminProduct from "../page/admin/AdminProduct";
import PrivateRouter from "./PrivateRouter";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AllProduct />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route element={<PrivateRouter permissionLevel='customer' />} >
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>
      <Route element={<PrivateRouter permissionLevel='admin' />} >
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/admin/product" element={<AdminProduct />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
