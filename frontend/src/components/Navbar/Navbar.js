import React, { useContext, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import imgFlag from "../../images/indian_flag.png";
import Cart from "../Cart/Cart";
// import { KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { CartContext } from "../../redux/ContextProvider";
import { auth } from "../google-login/Google";
import { signOut } from "firebase/auth";
import image from "../../images/user-icon.png";
// import firebase from "firebase";

const Navbar = () => {
  const { cartProducts, user, googleUser } = useContext(CartContext);
  const [cart, setCart] = useState(false);
  const [logout, setLogout] = useState(false);
  // console.log(user.img);

  const handleLogout = async () => {
    if (googleUser === true) {
      try {
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
      sessionStorage.clear();
      window.location.href = "/";
    } else {
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item" style={{ border: "none" }}>
            <img className="flag" src={imgFlag} alt="Flag" />
          </div>
          <div className="item" style={{ border: "none" }}>
            <span>INR</span>
          </div>
          <div className="item special">
            <Link className="link" to="/products/1">
              Women
            </Link>
          </div>
          <div className="item special">
            <Link className="link" to="/products/2">
              Men
            </Link>
          </div>
          <div className="item special">
            <Link className="link" to="/products/3">
              Children
            </Link>
          </div>
        </div>
        <div className="center">
          <div className="item" style={{ border: "none" }}>
            <Link className="link" to="/">
              ShopVerse
            </Link>
          </div>
        </div>
        {user?.isAdmin === 1 ? (
          <div className="right">
            <div className="item special">
              <Link className="link" to="/admins">
                Admins
              </Link>
            </div>
            <div className="item special">
              <Link className="link" to="/addproduct">
                Stores
              </Link>
            </div>
            <div className="item special">
              <Link className="link" to="/addcategory">
                Categories
              </Link>
            </div>
            <div className="item special">
              <Link className="link" to="/addsubcategory">
                Subcategories
              </Link>
            </div>
            <div className="icons">
              <div
                className="cartIcon"
                onClick={() => {
                  setCart(!cart);
                }}
              >
                <ShoppingCartOutlinedIcon />
                <span>{cartProducts.length}</span>
              </div>
            </div>
            <div className="item logout-item" style={{ border: "none" }}>
              <img
                className="user-image"
                src={user?.img || image}
                alt="user"
                onClick={() => {
                  setLogout(!logout);
                }}
              />
              {logout && (
                <div className="logout" onClick={handleLogout}>
                  Logout
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="right">
            <div className="item special">
              <Link className="link" to="/">
                Homepage
              </Link>
            </div>
            <div className="item special">
              <Link className="link" to="/about">
                About
              </Link>
            </div>
            <div className="item special">
              <Link className="link" to="/contact">
                Contact
              </Link>
            </div>
            <div className="icons">
              <div
                className="cartIcon"
                onClick={() => {
                  setCart(!cart);
                }}
              >
                <ShoppingCartOutlinedIcon />
                <span>{cartProducts.length}</span>
              </div>
            </div>
            <div className="item logout-item" style={{ border: "none" }}>
              <img
                className="user-image"
                src={user?.img || image}
                alt="user"
                onClick={() => {
                  setLogout(!logout);
                }}
              />
              {logout && (
                <div className="logout" onClick={handleLogout}>
                  Logout
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {cart && <Cart />}
    </div>
  );
};

export default Navbar;
