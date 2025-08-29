import React from "react";
import { createRoot } from "react-dom/client";
import Nav from "@/components/Nav.jsx";
import AuthRecoverPage from "@/components/auth/AuthRecoverPage.jsx";
import "@/index.css";

createRoot(document.getElementById("root")).render(<><Nav/><AuthRecoverPage/></>);
