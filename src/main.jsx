import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import ToastProvider from "./Components/ui/Toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <ToastProvider />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
