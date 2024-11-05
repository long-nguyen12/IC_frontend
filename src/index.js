import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/auth";
import router from "./router";
import { Provider } from 'react-redux';
import store from './store';
import { App } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </AuthProvider>
    </Provider>,
  /* </React.StrictMode> */
);

reportWebVitals();
