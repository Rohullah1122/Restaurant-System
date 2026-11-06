// Starting point of the app
import React from "react"; // React library
import ReactDOM from "react-dom/client"; // puts React on the web page
import { BrowserRouter } from "react-router-dom"; // turns on page routing
import App from "./App.jsx"; // our main component
import "./index.css"; // our styles

// find the root div and show the App inside it
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* BrowserRouter lets us use different pages (routes) */}
    <App />
  </BrowserRouter>
);
