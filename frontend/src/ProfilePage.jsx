import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect
import "./ProfilePage.css";

function ProfilePage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    contactNumber: "",
    preferredLunch: "",
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const userId = localStorage.getItem("userID"); // Retrieve userID from localStorage

    // Fetch user data from the server using userId
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/details`
        );
        const data = await response.json();
        setFormData({
          email: data.email || "",
          username: data.userName || "",
          contactNumber: data.contactNumber || "",
          preferredLunch: data.preferredLunch || "",
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userID");
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Profile updated successfully!");
        setEditMode(false);
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("userID");
    localStorage.removeItem("isLoggedIn");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
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
          <option value="Fish">Fish</option>
          <option value="Chicken">Chicken</option>
          <option value="Vegan">Vegan</option>
          <option value="Non-Vegan">Non-Vegan</option>
        </select>

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

      {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
}

export default ProfilePage;
