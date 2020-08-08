import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.output.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App className="bg-gray-50" />
  </React.StrictMode>,
  document.getElementById("root")
);
