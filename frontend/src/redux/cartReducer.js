export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartProducts: state.cartProducts.map((product) => {
          var temp = Object.assign({}, product);
          if (temp.id_product === action.payload.id_product) {
            temp.quantity = temp.quantity + action.payload.quantity;
          }
          return temp;
        }),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (product) => product.id_product !== action.payload
        ),
      };
    case "RESET_CART":
      return {
        ...state,
        cartProducts: [],
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        googleUser: action.payload.googleUser ? true : false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
