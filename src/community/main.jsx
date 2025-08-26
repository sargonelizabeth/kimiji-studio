import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "../providers/AuthProvider.jsx";
import CommunityPage from "../pages/Community.jsx";
import NavCommunity from "../components/NavCommunity.jsx";
import "../index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <>
      <NavCommunity />
      <CommunityPage />
    </>
  </AuthProvider>
);
