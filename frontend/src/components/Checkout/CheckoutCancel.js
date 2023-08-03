import React from "react";
import "./Checkout.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const CheckoutCancel = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="checkout">
        <h2>Payment Not Successful</h2>
        <CancelIcon style={{ color: "red", fontSize: 40 }} />
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutCancel;
