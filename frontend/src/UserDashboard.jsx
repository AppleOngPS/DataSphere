import React from "react";
import "./UserDashboard.css"; // Import the CSS styles
import Footer from "./Footer";

const Dashboard = () => {
  const childData = [
    {
      name: "John Doe",
      school: "Greenwood High",
      interest: "Science",
      learningStyle: "Visual",
      action: "Delete",
    },
    {
      name: "Alice Smith",
      school: "Brighton Elementary",
      interest: "Art",
      learningStyle: "Kinesthetic",
      action: "Delete",
    },
    {
      name: "Mark Lee",
      school: "Westside Middle School",
      interest: "Mathematics",
      learningStyle: "Logical",
      action: "Delete",
    },
    {
      name: "Emma Brown",
      school: "Sunrise Academy",
      interest: "Music",
      learningStyle: "Auditory",
      action: "Delete",
    },
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
                <li>User</li>
                <li>Child</li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="content">
            <header className="header">
              <div>
                <h1>Hello, Sara</h1>
                <p>This is Your Dashboard.</p>
              </div>
              <button className="add-project-btn">Add New Project</button>
            </header>

            <section className="overview-cards">
              <div className="card purple">
                <h2>Add Child</h2>
                <p>Number of Child</p>
              </div>
              <div className="card teal">
                <h2>Edit Child</h2>
                <p>Number of Child</p>
              </div>
              <div className="card orange">
                <h2>Delete Child</h2>
                <p>Number of Child</p>
              </div>
            </section>

            {/* Child Data Table */}
            <section className="child-data">
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
                  {childData.map((child, index) => (
                    <tr key={index}>
                      <td>{child.name}</td>
                      <td>{child.school}</td>
                      <td>{child.interest}</td>
                      <td>{child.learningStyle}</td>
                      <td>
                        <button className="delete-btn">{child.action}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </main>

          {/* Calendar */}
          <aside className="calendar">
            <h3>Upcoming Booking</h3>
            <div className="calendar-item">10:00 - Facebook Brand</div>
            <div className="calendar-item">13:20 - Task Management</div>
            <div className="calendar-item">Meetup</div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
