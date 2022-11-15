import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./@propelauth/react";
import { BaseElements } from "./@propelauth/base-elements";
import { MuiElements } from "./@propelauth/mui-adapter";
import { CircularLogo } from "./components/CircularLogo";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const customElements = {
  ...BaseElements,
  Logo: CircularLogo,
};

root.render(
  <AuthProvider authUrl={"auth.com"} elements={customElements}>
    <App />
  </AuthProvider>
);
