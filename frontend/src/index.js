import React from "react";
import ReactDOM from "react-dom/client";
import ContextProvider from "./redux/ContextProvider";
// import { persistor, store } from "./redux/store";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}> */}
    <ContextProvider>
      <App />
    </ContextProvider>
    {/* </PersistGate> */}
    {/* </Provider> */}
  </React.StrictMode>
);
