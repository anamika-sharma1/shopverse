import "./PayButton.scss";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const PayButton = ({ cartItems }) => {
  const handleCheckout = () => {
    console.log(cartItems);
    axios
      .post(`${BASE_URL}/makePayment/createCheckoutSession`, {
        cartItems: cartItems,
        userId: 123456789,
      })
      .then((response) => {
        console.log("res");
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>CHECKOUT</button>
    </>
  );
};

export default PayButton;
