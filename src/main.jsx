import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/index.";
import "./index.css";
import { ThemeProvider } from "./app/context/ThemeContext";
import { FavoritesProvider } from "./app/context/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
