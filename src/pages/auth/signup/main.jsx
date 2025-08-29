// src/pages/auth/signup/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import Nav from "@/components/Nav.jsx";
import AuthSignupPage from "@/components/auth/AuthSignupPage.jsx";
import "@/index.css";
import "@/styles/brand.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 로그인 상태를 상단에서 즉시 반영 */}
    <Nav ctaLabel="제작하기" ctaHref="/upload.html" />
    <AuthSignupPage />
  </React.StrictMode>
);
