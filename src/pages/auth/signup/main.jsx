// src/pages/auth/signup/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import Nav from "@/components/Nav.jsx";
import AuthSignupPage from "@/components/auth/AuthSignupPage.jsx";
import "@/index.css";

function App() {
  return (
    <>
      <Nav />
      <AuthSignupPage />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
