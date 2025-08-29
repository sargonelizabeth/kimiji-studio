// src/pages/auth/signup/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import Nav from "@/components/Nav.jsx";
import AuthSignupPage from "@/components/auth/AuthSignupPage.jsx";
import "@/index.css";
import "@/styles/brand.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Nav ctaLabel="제작하기" ctaHref="/upload.html" />
    <AuthSignupPage />
  </React.StrictMode>
);
