import React from "react";
import "./Checkout.scss";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const CheckoutSuccess = () => {
  return (
    <div className="app">
      <Navbar />

      <div className="checkout">
        <h2>Payment is Successful</h2>
        <div className="icon">
          <TaskAltIcon style={{ color: "green", fontSize: 40 }} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
