import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk publishable key to the .env.local file");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
 
  </React.StrictMode>
);
