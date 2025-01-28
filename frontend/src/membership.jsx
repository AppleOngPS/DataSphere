import React, { useState } from "react";
import Footer from "./Footer"; // Import the Footer component
import ProfilePage from "./ProfilePage"; // Import Profile Page
import "./membership.css";

const Membership = () => {
  const [activeSection, setActiveSection] = useState("membership"); // Default to Membership Page

  return (
    <div className="membership-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h3
          className={`sidebar-item ${
            activeSection === "profile" ? "active" : ""
          }`}
          onClick={() => setActiveSection("profile")}
        >
          Overview
        </h3>
        <h3
          className={`sidebar-item ${
            activeSection === "membership" ? "active" : ""
          }`}
          onClick={() => setActiveSection("membership")}
        >
          Membership
        </h3>
      </div>

      {/* Content Section */}
      <div className="content">
        {activeSection === "profile" ? (
          <ProfilePage />
        ) : (
          <>
            <h1>Membership</h1>
            <div className="plan-details">
              <h2>Plan Details</h2>
              <div className="plan-card">
                <h3>Complimentary Plan (1 Year)</h3>
                <p>
                  Access to our resources and member rates for all programmes
                </p>
              </div>
            </div>
            <div className="validity-details">
              <h2>Validity</h2>
              <div className="validity-card">
                <h3>Valid Till</h3>
                <p>19 February 2026</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Membership;
