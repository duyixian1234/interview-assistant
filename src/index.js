import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";

import Aegis from "aegis-web-sdk";

new Aegis({
  id: "bR4EqI6RxQqJabr9y4",
  reportApiSpeed: true,
  reportAssetSpeed: true,
  spa: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(sendToVercelAnalytics);
