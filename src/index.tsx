import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./lib/state/AuthProvider";
import { CircularLogo } from "./custom/CircularLogo";
import BaseElements from "./lib/elements/_base";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const customElements = {
  ...BaseElements,
  Logo: CircularLogo,
};

root.render(
  <AuthProvider authUrl={"auth.com"} elements={customElements}>
    <App />
  </AuthProvider>
);
