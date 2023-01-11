import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "@propelauth/react-test";
import { BaseElements } from "@propelauth/base-elements";
import "@propelauth/base-elements/dist/default.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <AuthProvider authUrl={process.env.REACT_APP_PA_AUTH_URL || ""} elements={BaseElements}>
    <App />
  </AuthProvider>
);
