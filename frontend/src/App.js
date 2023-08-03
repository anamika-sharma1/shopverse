import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import AddProduct from "./components/AddProduct/AddProduct";
import AddCategory from "./components/AddCategory/AddCategory";
import AddSubCategory from "./components/AddSubCategory/AddSubCategory";
import "./App.scss";
import CheckoutSuccess from "./components/Checkout/CheckoutSuccess";
import CheckoutCancel from "./components/Checkout/CheckoutCancel";
import SubCategories from "./pages/SubCategories/SubCategories";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { CartContext } from "./redux/ContextProvider";
import { Navigate } from "react-router-dom";
import Admin from "./components/Admin/Admin";

const App = () => {
  const { user } = useContext(CartContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Signup />} />
        <Route
          exact
          path="/product/:id"
          element={user ? <Product /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/products/:id"
          element={user ? <Products /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/subCategories/:id"
          element={user ? <SubCategories /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/addproduct"
          element={user ? <AddProduct /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/addcategory"
          element={user ? <AddCategory /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/addsubcategory"
          element={user ? <AddSubCategory /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/checkout-success"
          element={user ? <CheckoutSuccess /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/checkout-cancel"
          element={user ? <CheckoutCancel /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/admins"
          element={user ? <Admin /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
