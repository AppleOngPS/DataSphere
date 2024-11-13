// src/components/Dashboard.js
import React from "react";
import "./Dashboard.css"; // Import the CSS styles
import Footer from "./Footer";

const Dashboard = () => {
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
                <li>Dashboard</li>
                <li>Analytics</li>
                <li>Task List</li>
                <li>Tracking</li>
                <li>Setting</li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="content">
            <header className="header">
              <div>
                <h1>Hello, Sara</h1>
                <p>Today is Monday, 20 October 2021</p>
              </div>
              <button className="add-project-btn">Add New Project</button>
            </header>

            <section className="overview-cards">
              <div className="card purple">
                <h2>Web Development</h2>
                <p>10 tasks | 96%</p>
              </div>
              <div className="card teal">
                <h2>Mobile App Design</h2>
                <p>12 tasks | 46%</p>
              </div>
              <div className="card orange">
                <h2>Facebook Brand Kit</h2>
                <p>22 tasks | 73%</p>
              </div>
            </section>

            <section className="tasks-and-stats">
              <div className="tasks">
                <h3>Tasks for Today</h3>
                <div className="task">Mobile App - Prepare Figma file</div>
                <div className="task">UX Wireframes - Design UX wireframes</div>
                <div className="task">Mobile App - Research</div>
              </div>

              <div className="stats">
                <h3>Statistics</h3>
                <div className="stat">28h - Tracked Time</div>
                <div className="stat">18 - Finished Tasks</div>
                <div className="stat">$9.99 p/m - Pro Plan</div>
              </div>
            </section>
          </main>

          {/* Calendar */}
          <aside className="calendar">
            <h3>Calendar</h3>
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
