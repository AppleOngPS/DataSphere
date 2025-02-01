import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import Footer from "./Footer.jsx";
import { format, addHours } from "date-fns";  // ✅ Import date-fns for formatting


// ✅ Format Date to Singapore Time (GMT+8)
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return format(addHours(new Date(dateString), 8), "dd MMM yyyy"); // e.g., "02 Feb 2026"
};


function ProfilePage() {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    contactNumber: "",
    preferredLunch: "",
    subscribe: false, // Subscription status
    age: "",
    interest: "",
  });
  const [membership, setMembership] = useState(null); // Stores membership details
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState("profile"); // Default to Profile Page

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Retrieve userID from localStorage

    // Fetch user data from the server using userId
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/details`
        );
        const data = await response.json();
        setFormData({
          email: data.email || "",
          userName: data.userName || "",
          contactNumber: data.contactNumber || "",
          preferredLunch: data.preferredLunch || "",
          subscribe: data.subscribe || false, // Default to false if not provided
          age: data.age || "",
          interest: data.interest || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchMembership = async () => {
      try {
        const response = await fetch(`http://localhost:3000/memberships/${userId}`);
        if (!response.ok) throw new Error("Membership not found"); // Handles 404 case

        const membershipData = await response.json();

        console.log("📌 Membership Data:", membershipData); // ✅ Log membership data
        setMembership(membershipData); // Save the membership details
      } catch (error) {
        console.log("No active membership for this user.");
        setMembership(null); // If no membership, set to null
      }
    };

    if (userId) {
      fetchData();
      fetchMembership();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      const { subscribe, ...profileData } = formData; // Exclude subscription from the payload
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
        setEditMode(false);
      } else {
        alert("Error updating profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.reload();
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar1">
        <ul>
          <li
            className={`sidebar-item ${
              activeSection === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <i className="fa fa-cog"></i> Overview
          </li>
          <li
            className={`sidebar-item ${
              activeSection === "membership" ? "active" : ""
            }`}
            onClick={() => setActiveSection("membership")}
          >
            <i className="fa fa-user"></i> Membership
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <div className="content">
        {activeSection === "profile" ? (
          <div className="white-box">
            <h1>User Settings</h1>
            <form onSubmit={handleSubmit} className="profile-form">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={true} // Email is always uneditable
              />

              <label>Username</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                disabled={!editMode}
              />

              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                disabled={!editMode}
              />

              <label>Preferred Lunch</label>
              <select
                name="preferredLunch"
                value={formData.preferredLunch}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="">-- None --</option>
                <option value="Fish">Fish</option>
                <option value="Chicken">Chicken</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegan">Non-Vegan</option>
              </select>

              <label>Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!editMode}
              />

              <label>Interest</label>
              <input
                type="text"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                disabled={!editMode}
              />

              <label>
                <input
                  type="checkbox"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                />
                Subscribe to newsletter
              </label>

              <button
                type="button"
                onClick={() => setEditMode((prev) => !prev)}
                className="edit-button"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
              {editMode && (
                <button type="submit" className="save-button">
                  Save
                </button>
              )}
            </form>
          </div>
        ) : (
          <>
            <h1>Membership</h1>
            <div className="plan-details">
              <h2>Plan Details</h2>
              <div className="plan-card">
                {membership.isActive ? (
                  <>
                    <h3>Complimentary Plan (1 Year)</h3>
                    <p>Access to our resources and member rates for all programmes</p>
                  </>
                ) : (
                  <>
                    <h3>No membership currently.</h3>
                    <p>Buy a full-price programme to access our resources and member rates for all programmes.</p>
                  </>
                )}
              </div>
            </div>
            <div className="validity-details">
              <h2>Validity</h2>
              <div className="validity-card">
                <h3>Valid Till</h3>
                <p>{membership ? formatDate(membership.ValidityEnd) : "-"}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
}

export default ProfilePage;
