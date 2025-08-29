// src/pages/auth/login/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import Nav from "@/components/Nav.jsx";
import LoginPage from "@/components/auth/LoginPage.jsx";
import "@/index.css";
import "@/styles/brand.css";

function App(){
  return (
    <>
      <Nav />
      <LoginPage />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
