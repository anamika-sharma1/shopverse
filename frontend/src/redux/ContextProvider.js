import { cartReducer } from "./cartReducer";
import { createContext, useReducer } from "react";
import { useEffect } from "react";

const initialState = {
  cartProducts: [],
  user: null,
  error: false,
  googleUser: false,
};

const getState = () => {
  const state = JSON.parse(sessionStorage.getItem("state"));
  if (state) {
    return state;
  } else {
    return initialState;
  }
};

export const CartContext = createContext();

const ContextProvider = ({ children }) => {
  let x = getState();
  const [state, dispatch] = useReducer(cartReducer, x);
  useEffect(() => {
    sessionStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        user: state.user,
        cartProducts: state.cartProducts,
        googleUser: state.googleUser,
        errors: state.error,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default ContextProvider;
