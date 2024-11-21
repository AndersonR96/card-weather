import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/index.";
import "./index.css";
import { ThemeProvider } from "./app/context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
