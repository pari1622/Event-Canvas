import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("CLIENT_ID =", CLIENT_ID);

if (!CLIENT_ID) {
  throw new Error("VITE_GOOGLE_CLIENT_ID is missing");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
