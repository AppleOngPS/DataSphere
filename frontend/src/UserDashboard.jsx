// import React, { useState } from "react";
// import "./UserDashboard.css"; // Import the CSS styles
// import Footer from "./Footer";

// const UserDashboard = () => {
//   const [activeSection, setActiveSection] = useState("user");
//   const [activeChildView, setActiveChildView] = useState("add");

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     if (section === "child") setActiveChildView("add"); // Default to "Add Child" view when switching to Child section
//   };

//   const handleChildViewChange = (view) => {
//     setActiveChildView(view);
//   };

//   const childrenData = [
//     {
//       name: "John Doe",
//       school: "Greenwood High",
//       interest: "Science",
//       learningStyle: "Visual",
//     },
//     {
//       name: "Alice Smith",
//       school: "Brighton Elementary",
//       interest: "Art",
//       learningStyle: "Kinesthetic",
//     },
//     {
//       name: "Mark Lee",
//       school: "Westside Middle School",
//       interest: "Mathematics",
//       learningStyle: "Logical",
//     },
//     {
//       name: "Emma Brown",
//       school: "Sunrise Academy",
//       interest: "Music",
//       learningStyle: "Auditory",
//     },
//   ];

//   const bookingsData = [
//     { id: "B123", programName: "Coding Bootcamp", quantity: 1 },
//     { id: "B456", programName: "Art Workshop", quantity: 2 },
//     { id: "B789", programName: "Science Lab", quantity: 1 },
//   ];

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-wrapper">
//         <div className="dashboard-grid">
//           {/* Sidebar */}
//           <aside className="sidebar">
//             <div className="profile">
//               <img
//                 src="profile-placeholder.png"
//                 alt="User"
//                 className="profile-pic"
//               />
//               <h3>Sarah Connor</h3>
//               <p>sarahc@gmail.com</p>
//             </div>
//             <nav className="menu">
//               <ul>
//                 <li
//                   onClick={() => handleSectionChange("user")}
//                   className={activeSection === "user" ? "active" : ""}
//                 >
//                   User
//                 </li>
//                 <li
//                   onClick={() => handleSectionChange("child")}
//                   className={activeSection === "child" ? "active" : ""}
//                 >
//                   Child
//                 </li>
//               </ul>
//             </nav>
//           </aside>

//           {/* Main Content */}
//           <main className="content-centered">
//             {activeSection === "user" && (
//               <div>
//                 <h1>Hello, Sara</h1>
//                 <p>This is your dashboard</p>
//                 <h2>Upcoming Booking(s)</h2>
//                 <div className="bookings">
//                   {bookingsData.map((booking, index) => (
//                     <div key={index} className="booking-card">
//                       <p>
//                         <strong>Booking ID:</strong> {booking.id}
//                       </p>
//                       <p>
//                         <strong>Program Name:</strong> {booking.programName}
//                       </p>
//                       <p>
//                         <strong>Program Quantity:</strong> {booking.quantity}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeSection === "child" && (
//               <div>
//                 <h1>Child Dashboard</h1>
//                 <p>
//                   This is the child dashboard section with child-specific data.
//                 </p>
//                 <div className="overview-cards">
//                   <button
//                     onClick={() => handleChildViewChange("add")}
//                     className={`card purple ${
//                       activeChildView === "add" ? "active" : ""
//                     }`}
//                   >
//                     Add Child
//                   </button>
//                   <button
//                     onClick={() => handleChildViewChange("edit")}
//                     className={`card teal ${
//                       activeChildView === "edit" ? "active" : ""
//                     }`}
//                   >
//                     Edit Child
//                   </button>
//                   <button
//                     onClick={() => handleChildViewChange("delete")}
//                     className={`card orange ${
//                       activeChildView === "delete" ? "active" : ""
//                     }`}
//                   >
//                     Delete Child
//                   </button>
//                 </div>

//                 <section className="child-table">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Child Name</th>
//                         <th>School</th>
//                         <th>Interest</th>
//                         <th>Learning Style</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {childrenData.map((child, index) => (
//                         <tr key={index}>
//                           <td>{child.name}</td>
//                           <td>{child.school}</td>
//                           <td>{child.interest}</td>
//                           <td>{child.learningStyle}</td>
//                           <td>
//                             {activeChildView === "add" && (
//                               <button className="action-btn add">Add</button>
//                             )}
//                             {activeChildView === "edit" && (
//                               <button
//                                 className="action-btn edit"
//                                 onClick={() => alert(`Edit ${child.name}`)}
//                               >
//                                 Edit
//                               </button>
//                             )}
//                             {activeChildView === "delete" && (
//                               <button
//                                 className="action-btn delete"
//                                 onClick={() => alert(`Delete ${child.name}`)}
//                               >
//                                 Delete
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </section>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import Footer from "./Footer";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("user");
  const [activeChildView, setActiveChildView] = useState("add");
  const [childrenData, setChildrenData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [editingChildID, setEditingChildID] = useState(null);

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [interest, setInterest] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState("");
  const [preferredLunch, setPreferredLunch] = useState("");
  const [userID, setUserID] = useState(3); // Hardcoded User ID for now
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch children data
    axios
      .get(`http://localhost:3000/children/user/${userID}`)
      .then((response) => setChildrenData(response.data))
      .catch((error) => console.error("Error fetching children data:", error));

    // Fetch bookings data
    axios
      .get(`http://localhost:3000/bookings/user/${userID}`)
      .then((response) => setBookingsData(response.data))
      .catch((error) => console.error("Error fetching bookings data:", error));
  }, [userID]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "child") setActiveChildView("add");
  };

  const handleChildViewChange = (view) => {
    setActiveChildView(view);
    if (view !== "edit") resetForm();
  };

  const resetForm = () => {
    setEditingChildID(null);
    setName("");
    setSchool("");
    setInterest("");
    setLearningStyle("");
    setSpecialNeeds("");
    setPreferredLunch("");
  };

  const handleChildFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !school || !interest || !preferredLunch) {
      setError("Please fill in all required fields");
      return;
    }

    const childData = {
      name,
      school,
      interest,
      learningStyle,
      specialNeeds,
      preferredLunch,
      userID,
    };

    try {
      if (editingChildID) {
        // Update child
        await axios.put(`http://localhost:3000/children/${editingChildID}`, childData);
        setSuccess("Child updated successfully!");
      } else {
        // Add new child
        await axios.post(`http://localhost:3000/children/${userID}`, childData);
        setSuccess("Child created successfully!");
      }

      // Refresh children data
      const response = await axios.get(`http://localhost:3000/children/user/${userID}`);
      setChildrenData(response.data);

      resetForm();
    } catch (err) {
      setError("Error saving child data.");
      console.error(err);
    }
  };

  const handleEditChild = (child) => {
    setEditingChildID(child.childID);
    setName(child.name);
    setSchool(child.school);
    setInterest(child.interest);
    setLearningStyle(child.learningStyle);
    setSpecialNeeds(child.specialNeeds);
    setPreferredLunch(child.preferredLunch);
    setActiveChildView("add"); // Reuse the form for editing
  };

  const handleDeleteChild = async (childID) => {
    try {
      await axios.delete(`http://localhost:3000/children/${childID}`);
      setSuccess("Child deleted successfully!");

      // Refresh children data
      const response = await axios.get(`http://localhost:3000/children/user/${userID}`);
      setChildrenData(response.data);
    } catch (err) {
      setError("Error deleting child.");
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-grid">
          <aside className="sidebar">
            <div className="profile">
              <img src="profile-placeholder.png" alt="User" className="profile-pic" />
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

          <main className="content-centered">
            {activeSection === "user" && (
              <div>
                <h1>Hello, Sarah</h1>
                <h2>Upcoming Bookings</h2>
                <div className="bookings">
                  {bookingsData.map((booking) => (
                    <div key={booking.bookingID} className="booking-card">
                      <p>
                        <strong>Booking ID:</strong> {booking.bookingID}
                      </p>
                      <p>
                        <strong>Program Quantity:</strong> {booking.programQuantity}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> ${booking.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "child" && (
              <div>
                <h1>Child Dashboard</h1>
                <div className="overview-cards">
                  <button
                    onClick={() => handleChildViewChange("add")}
                    className={`card purple ${activeChildView === "add" ? "active" : ""}`}
                  >
                    Add/Edit Child
                  </button>
                  <button
                    onClick={() => handleChildViewChange("delete")}
                    className={`card orange ${activeChildView === "delete" ? "active" : ""}`}
                  >
                    Delete Child
                  </button>
                </div>

                {activeChildView === "add" && (
                  <section className="child-form">
                    <h2>{editingChildID ? "Edit Child" : "Add New Child"}</h2>
                    <form onSubmit={handleChildFormSubmit}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="school">School</label>
                        <input
                          type="text"
                          id="school"
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="interest">Interest</label>
                        <input
                          type="text"
                          id="interest"
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="learningStyle">Learning Style</label>
                        <input
                          type="text"
                          id="learningStyle"
                          value={learningStyle}
                          onChange={(e) => setLearningStyle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="specialNeeds">Special Needs</label>
                        <textarea
                          id="specialNeeds"
                          value={specialNeeds}
                          onChange={(e) => setSpecialNeeds(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="preferredLunch">Preferred Lunch</label>
                        <input
                          type="text"
                          id="preferredLunch"
                          value={preferredLunch}
                          onChange={(e) => setPreferredLunch(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        {editingChildID ? "Update Child" : "Create Child"}
                      </button>
                    </form>
                    {success && <p className="text-success">{success}</p>}
                    {error && <p className="text-danger">{error}</p>}
                  </section>
                )}

                <section className="child-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>School</th>
                        <th>Interest</th>
                        <th>Learning Style</th>
                        <th>Preferred Lunch</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {childrenData.map((child) => (
                        <tr key={child.childID}>
                          <td>{child.name}</td>
                          <td>{child.school}</td>
                          <td>{child.interest}</td>
                          <td>{child.learningStyle}</td>
                          <td>{child.preferredLunch}</td>
                          <td>
                            <button onClick={() => handleEditChild(child)}>Edit</button>
                            <button onClick={() => handleDeleteChild(child.childID)}>Delete</button>
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
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;

