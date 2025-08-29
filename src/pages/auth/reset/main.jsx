import React from "react";
import { createRoot } from "react-dom/client";
import Nav from "@/components/Nav.jsx";
import ResetPage from "@/components/auth/ResetPage.jsx";
import "@/index.css";
import "@/styles/brand.css";

function App(){ return (<><Nav/><ResetPage/></>); }
createRoot(document.getElementById("root")).render(<App />);
