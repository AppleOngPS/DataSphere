// export default ProfilePage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  const handleSubscriptionChange = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/subscribe`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscribe: !formData.subscribe }), // Toggle the subscription
        }
      );
      if (response.ok) {
        alert("Subscription status updated!");
        setFormData((prev) => ({
          ...prev,
          subscribe: !prev.subscribe,
        }));
      } else {
        alert("Error updating subscription status.");
      }
    } catch (error) {
      console.error("Error updating subscription status:", error);
    }
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
    navigate("/login");
  };

  const Sidebar = () => (
    <div className="sidebar">
      <ul>
        <li>
          <i class="fa fa-cog"></i> Overview
        </li>
        <li>
          <i class="fa fa-user"></i> Membership
        </li>
      </ul>
    </div>
  );

  return (
    <div className="profile-container">
      <Sidebar />
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
            onChange={handleSubscriptionChange}
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
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
}

export default ProfilePage;
