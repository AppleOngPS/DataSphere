import React from "react";
import Footer from "./Footer"; // Import the Footer component
import "./membership.css";

const Membership = () => {
  return (
    <div className="membership-page">
      <div className="sidebar">
        <h3>Overview</h3>
        <h3 className="active">Membership</h3>
      </div>
      <div className="content">
        <h1>Membership</h1>
        <div className="plan-details">
          <h2>Plan Details</h2>
          <div className="plan-card">
            <h3>Complimentary Plan (1 Year)</h3>
            <p>Access to our resources and member rates for all programmes</p>
          </div>
        </div>
        <div className="validity-details">
          <h2>Validity</h2>
          <div className="validity-card">
            <h3>Valid Till</h3>
            <p>19 February 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
