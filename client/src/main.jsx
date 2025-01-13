import React from "react";
import ReactDOM from "react-dom/client"; // Correct for React 18
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AIProvider } from "./context/AIContext";
import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
	<AuthProvider>
      <AIProvider>
        <App />
      </AIProvider>
	</AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
