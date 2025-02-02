import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import Footer from "./Footer.jsx";

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

        // Send user login data to Google Analytics
        gtag('event', 'user_login', {
          'userName': data.userName,
          'userAge': data.age,
          'userInterest': data.interest,
        });

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchData();
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
            className={`sidebar-item ${activeSection === "profile" ? "active" : ""}`}
            onClick={() => setActiveSection("profile")}
          >
            <i className="fa fa-cog"></i> Overview
          </li>
          <li
            className={`sidebar-item ${activeSection === "membership" ? "active" : ""}`}
            onClick={() => setActiveSection("membership")}
          >
            <i className="fa fa-user"></i> Membership
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <div className="content">
        {activeSection === "profile" ? (
          <>
            <h2>User Settings</h2>
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
          </>
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

      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
}

export default ProfilePage;
