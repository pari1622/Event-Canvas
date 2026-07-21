import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

import ScrollToTop from "./components/ScrollToTop";
import QuoteBag from "./pages/QuoteBag";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AddCategory from "./pages/admin/AddCategory";
import AdminQuotes from "./pages/admin/AdminQuotes";
import Quotes from "./pages/Quotes";
import GenerateQuote from "./pages/admin/GenerateQuote";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quotebag"
          element={
            <ProtectedRoute>
              <QuoteBag />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Admin */}

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/products" element={<AdminProducts />} />

        <Route path="/admin/products/add" element={<AddProduct />} />

        <Route path="/admin/products/edit/:id" element={<EditProduct />} />

        <Route path="/admin/categories" element={<AdminCategories />} />

        <Route path="/admin/categories/add" element={<AddCategory />} />

        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route
          path="/quotes"
          element={
            <ProtectedRoute>
              <Quotes />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/quotes" element={<AdminQuotes />} />

        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders/:id/quote" element={<GenerateQuote />} />
      </Routes>
    </BrowserRouter>
  );
}
/*
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} /> 
        */

export default App;
