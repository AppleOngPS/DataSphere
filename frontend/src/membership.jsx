import React from "react";
import "./membership.css";

const Membership = () => {
  return (
    <div className="membership-container">
      <div className="sidebar">
        <h3>Overview</h3>
        <h3 className="active">Membership</h3>
      </div>
      <div className="membership-content">
        <h1>Membership</h1>
        <div className="membership-details">
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
      <footer>
        <p>60 Paya Lebar Road, #07-45 Paya Lebar Square, Singapore 409051</p>
        <p>
          Copyright © 2024 MindSphere Singapore Pte. Ltd. All rights reserved.
        </p>
        <div className="social-icons">
          <i className="icon facebook">Facebook</i>
          <i className="icon twitter">Twitter</i>
          <i className="icon instagram">Instagram</i>
        </div>
      </footer>
    </div>
  );
};

export default Membership;
