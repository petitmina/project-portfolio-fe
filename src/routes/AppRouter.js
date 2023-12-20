import React from 'react';
import { Route, Routes } from 'react-router';
import Register from '../page/Register';
import Login from '../page/Login';
import AllProduct from '../page/AllProduct';
import ProductDetail from '../page/ProductDetail';
import CartPage from '../page/CartPage';
import PaymentPage from '../page/PaymentPage';
import AdminPage from '../page/admin/AdminPage';

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<AllProduct/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path='/admin' element={<AdminPage />} />
    </Routes>
  )
}

export default AppRouter
