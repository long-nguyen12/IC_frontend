import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/auth";
import router from "./router";
import { App } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
