import React, { useState } from "react";
import "./UserDashboard.css"; // Import the CSS styles
import Footer from "./Footer";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("user");
  const [activeChildView, setActiveChildView] = useState("add");

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "child") setActiveChildView("add"); // Default to "Add Child" view when switching to Child section
  };

  const handleChildViewChange = (view) => {
    setActiveChildView(view);
  };

  const childrenData = [
    {
      name: "John Doe",
      school: "Greenwood High",
      interest: "Science",
      learningStyle: "Visual",
    },
    {
      name: "Alice Smith",
      school: "Brighton Elementary",
      interest: "Art",
      learningStyle: "Kinesthetic",
    },
    {
      name: "Mark Lee",
      school: "Westside Middle School",
      interest: "Mathematics",
      learningStyle: "Logical",
    },
    {
      name: "Emma Brown",
      school: "Sunrise Academy",
      interest: "Music",
      learningStyle: "Auditory",
    },
  ];

  const bookingsData = [
    { id: "B123", programName: "Coding Bootcamp", quantity: 1 },
    { id: "B456", programName: "Art Workshop", quantity: 2 },
    { id: "B789", programName: "Science Lab", quantity: 1 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-grid">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="profile">
              <img
                src="profile-placeholder.png"
                alt="User"
                className="profile-pic"
              />
              <h3>Sarah Connor</h3>
              <p>sarahc@gmail.com</p>
            </div>
            <nav className="menu">
              <ul>
                <li
                  onClick={() => handleSectionChange("user")}
                  className={activeSection === "user" ? "active" : ""}
                >
                  User
                </li>
                <li
                  onClick={() => handleSectionChange("child")}
                  className={activeSection === "child" ? "active" : ""}
                >
                  Child
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="content-centered">
            {activeSection === "user" && (
              <div>
                <h1>Hello, Sara</h1>
                <p>This is your dashboard</p>
                <h2>Upcoming Booking(s)</h2>
                <div className="bookings">
                  {bookingsData.map((booking, index) => (
                    <div key={index} className="booking-card">
                      <p>
                        <strong>Booking ID:</strong> {booking.id}
                      </p>
                      <p>
                        <strong>Program Name:</strong> {booking.programName}
                      </p>
                      <p>
                        <strong>Program Quantity:</strong> {booking.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "child" && (
              <div>
                <h1>Child Dashboard</h1>
                <p>
                  This is the child dashboard section with child-specific data.
                </p>
                <div className="overview-cards">
                  <button
                    onClick={() => handleChildViewChange("add")}
                    className={`card purple ${
                      activeChildView === "add" ? "active" : ""
                    }`}
                  >
                    Add Child
                  </button>
                  <button
                    onClick={() => handleChildViewChange("edit")}
                    className={`card teal ${
                      activeChildView === "edit" ? "active" : ""
                    }`}
                  >
                    Edit Child
                  </button>
                  <button
                    onClick={() => handleChildViewChange("delete")}
                    className={`card orange ${
                      activeChildView === "delete" ? "active" : ""
                    }`}
                  >
                    Delete Child
                  </button>
                </div>

                <section className="child-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Child Name</th>
                        <th>School</th>
                        <th>Interest</th>
                        <th>Learning Style</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {childrenData.map((child, index) => (
                        <tr key={index}>
                          <td>{child.name}</td>
                          <td>{child.school}</td>
                          <td>{child.interest}</td>
                          <td>{child.learningStyle}</td>
                          <td>
                            {activeChildView === "add" && (
                              <button className="action-btn add">Add</button>
                            )}
                            {activeChildView === "edit" && (
                              <button
                                className="action-btn edit"
                                onClick={() => alert(`Edit ${child.name}`)}
                              >
                                Edit
                              </button>
                            )}
                            {activeChildView === "delete" && (
                              <button
                                className="action-btn delete"
                                onClick={() => alert(`Delete ${child.name}`)}
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
