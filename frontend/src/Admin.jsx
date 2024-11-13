import React, { useState } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg"; // Adjust the path based on your project structure

const Admin = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="content-area">{/* Main content goes here */}</div>
    </div>
  );
};

const Sidebar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src={adminProfilePic}
          alt="Admin Profile"
          className="profile-image"
        />{" "}
        {/* Replaced placeholder with actual image */}
        <p className="profile-name">Name</p>
      </div>
      <nav className="nav-buttons">
        <button className="nav-button">Dashboard</button>
        <button className="nav-button">Manage Programmes</button>
      </nav>
    </div>
  );
};

export default Admin;
