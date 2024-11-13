import React from "react";
import "./UserDashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <img src="/path-to-image" alt="User" className="profile-image" />
          <h3>Sarah Connor</h3>
          <p>sarahc@gmail.com</p>
        </div>
        <nav className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">Analytics</a>
          <a href="#">Task List</a>
          <a href="#">Tracking</a>
          <a href="#">Setting</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="greeting">
            <h2>Hello, Sara</h2>
            <p>Today is Monday, 20 October 2021</p>
          </div>
          <button className="new-project-btn">Add New Project</button>
        </header>
        <section className="overview-cards">
          <div className="card purple">Web Development</div>
          <div className="card teal">Mobile App Design</div>
          <div className="card orange">Facebook Brand Kit</div>
        </section>
        <div className="tasks-stats">
          <section className="tasks">
            <h3>Tasks for Today</h3>
            <div className="task-item">Mobile App - Prepare Figma file</div>
            <div className="task-item">
              UX Wireframes - Design UX wireframes
            </div>
            <div className="task-item">Mobile App - Research</div>
          </section>
          <section className="stats">
            <h3>Statistics</h3>
            <div className="stat-item">28h - Tracked Time</div>
            <div className="stat-item">18 - Finished Tasks</div>
            <div className="stat-item">New Widget</div>
          </section>
        </div>
      </main>
      <aside className="calendar">
        <h3>Calendar</h3>
        <div className="calendar-item">10:00 - Facebook Brand</div>
        <div className="calendar-item">13:20 - Task Management</div>
        <div className="calendar-item">Meetup</div>
      </aside>
    </div>
  );
};

export default Dashboard;
