import React from "react";
import Sidebar from "./Sidebar";
import "./HomePage.css";

function HomePage({ currentUser, signOut }) {
  return (
    <div className="home">
      <div className="home-container">
        <Sidebar currentUser={currentUser} signOut={signOut} />
        <div className="home-bg"></div>
      </div>
    </div>
  );
}

export default HomePage;
