//combi dashboard for user:
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import Footer from "./Footer";
import QuizSelector from "./assets/components/quizzes/quizselector"; // Import QuizSelector
import ChildrenQuiz from "./assets/components/quizzes/children.jsx"; // Import ChildrenQuiz
import pslePic from "./assets/Rethink-PSLE-Rectangle-5.webp";
import riasecPic from "./assets/job-opportunities.webp"
import industryPic from "./assets/istockphoto-496402539-612x612.jpg"
import schoolPic from "./assets/download.jpeg"
import educationPic from "./assets/education.jpg"


const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("user");
  const [activeChildView, setActiveChildView] = useState("add");
  const [childrenData, setChildrenData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [quizData, setQuizData] = useState([]); // Quiz-related data
  const [editingChildID, setEditingChildID] = useState(null);

  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [interest, setInterest] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState("");
  const [preferredLunch, setPreferredLunch] = useState("");
  const [userID, setUserID] = useState(localStorage.getItem("userId") || 3); // Fetch from localStorage
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user-related data dynamically
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3000/user/${userID}`
        );
        const user = userResponse.data;

        // Store user data in localStorage
        localStorage.setItem("userId", user.id || "GUEST_USER");
        localStorage.setItem("userName", user.name || "Anonymous");
        localStorage.setItem("userEmail", user.email || "unknown@example.com");
        localStorage.setItem("userInterest", user.interest || "None");
        localStorage.setItem("userAge", user.age || "Unknown");

        // Google Analytics user tracking
        window.gtag("config", "G-D6GLHWZQSH", {
          user_id: user.id,
          user_properties: {
            username: user.name,
            userEmail: user.email,
            userInterest: user.interest,
            userAge: user.age,
          },
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    // Fetch children, bookings, and quizzes
    const fetchData = async () => {
      try {
        const [childrenResponse, bookingsResponse, quizzesResponse] =
          await Promise.all([
            axios.get(`http://localhost:3000/children/user/${userID}`),
            axios.get(`http://localhost:3000/bookings/user/${userID}`),
            axios.get(`http://localhost:3000/quizzes`),
          ]);

        setChildrenData(childrenResponse.data);
        setBookingsData(bookingsResponse.data);
        setQuizData(quizzesResponse.data); // Set quiz data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
    fetchData();
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
        await axios.put(
          `http://localhost:3000/children/${editingChildID}`,
          childData
        );
        setSuccess("Child updated successfully!");
      } else {
        // Add new child
        await axios.post(`http://localhost:3000/children/${userID}`, childData);
        setSuccess("Child created successfully!");
      }

      // Refresh children data
      const response = await axios.get(
        `http://localhost:3000/children/user/${userID}`
      );
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
      const response = await axios.get(
        `http://localhost:3000/children/user/${userID}`
      );
      setChildrenData(response.data);
    } catch (err) {
      setError("Error deleting child.");
      console.error(err);
    }
  };

  
  const openModal = (title, background, link) => {
    setModalContent({ title, background, link });
  };

  const closeModal = () => {
    setModalContent(null);
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-grid">
          <aside className="sidebar">
            <div className="profile">
              <p>{localStorage.getItem("userEmail")}</p>
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
                <li
                  onClick={() => handleSectionChange("quiz")}
                  className={activeSection === "quiz" ? "active" : ""}
                >
                  Quiz
                </li>
              </ul>
            </nav>
          </aside>

          <main className="content-centered">
            {activeSection === "user" && (
              <div>
                {/* <h1>Overview{localStorage.getItem("userName")}</h1> */}

                {/* ✅ Learn More Section */}
                <h2 className="section-title">Learn More</h2>
                <div className="learn-more-grid">
                  {/* PSLE */}
                  <div className="learn-card" onClick={() => openModal("PSLE", "Understand the importance of PSLE and how it shapes future education paths.", "https://www.seab.gov.sg/psle/")}>
                    <img src={pslePic} alt="PSLE" />
                    <div className="overlay-class">
                      <h3>PSLE</h3>
                    </div>
                  </div>

                  {/* RIASEC */}
                  <div className="learn-card" onClick={() => openModal("RIASEC", "Explore career interests based on personality traits with the RIASEC model.", "https://www.myskillsfuture.gov.sg")}>
                    <img src={riasecPic} alt="RIASEC" />
                    <div className="overlay-class">
                      <h3>RIASEC</h3>
                    </div>
                  </div>

                  {/* Explore Schools */}
                  <div className="learn-card" onClick={() => openModal("Explore Schools", "Find out about different schools in Singapore and explore their offerings.", "https://www.myskillsfuture.gov.sg/content/student/en/primary/education-guide/explore-school/school-directory.html?q=&pageNum=1&viewBy=list&sortBy=asc")}>
                    <img src={schoolPic} alt="Explore Schools" /> {/* Leave image blank */}
                    <div className="overlay-class">
                      <h3>Explore Schools</h3>
                    </div>
                  </div>

                  {/* Education Pathway */}
                  <div className="learn-card" onClick={() => openModal("Education Pathway", "Learn about different education pathways and how they lead to various career opportunities.", "https://www.myskillsfuture.gov.sg/content/student/en/secondary/education-guide/education-landscape/landscape-overview.html")}>
                    <img src={educationPic} alt="Education Pathway" /> {/* Leave image blank */}
                    <div className="overlay-class">
                      <h3>Education Pathway</h3>
                    </div>
                  </div>
                
                  {/* Singapore Industries */}
                  <div className="learn-card" onClick={() => openModal("Singapore Industries", "Discover the diverse industries in Singapore and the career opportunities they offer.", "https://www.myskillsfuture.gov.sg/content/student/en/primary/world-of-work/industry-landscape.html")}>
                    <img src={industryPic} alt="Singapore Industries" /> {/* Leave image blank */}
                    <div className="overlay-class">
                      <h3>Singapore Industries</h3>
                    </div>
                  </div>
                </div>



                {/* ✅ Upcoming Bookings */}

                <h2>Upcoming Bookings</h2>
                <div className="bookings">
                  {bookingsData.map((booking) => (
                    <div key={booking.bookingID} className="booking-card">
                      <p>
                        <strong>Booking ID:</strong> {booking.bookingID}
                      </p>
                      <p>
                        <strong>Program Quantity:</strong>{" "}
                        {booking.programQuantity}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> $
                        {booking.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <h2>Quiz Results</h2>
                <div className="quiz-results">
                  {quizData.map((quiz) => (
                    <div key={quiz.quizID} className="quiz-result-card">
                      <p>
                        <strong>Quiz Title:</strong> {quiz.title}
                      </p>
                      <p>
                        <strong>Score:</strong> {quiz.score}
                      </p>
                      <p>
                        <strong>Status:</strong> {quiz.status}
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
                    className={`card purple ${
                      activeChildView === "add" ? "active" : ""
                    }`}
                  >
                    Add/Edit Child
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
                            <button onClick={() => handleEditChild(child)}>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteChild(child.childID)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </div>
            )}

            {activeSection === "quiz" && (
              <div>
                <h1>Quiz Selector</h1>
                <QuizSelector quizzes={quizData} />{" "}
                {/* Render QuizSelector with quiz data */}
                <ChildrenQuiz userID={userID} refresh={childrenData} />
              </div>
            )}
          </main>
        </div>
        {/* ✅ Modal Pop-up */}
        {modalContent && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>&times;</button>
              <h2>{modalContent.title}</h2>
              <p>{modalContent.background}</p>
              <a href={modalContent.link} target="_blank" rel="noopener noreferrer">
                <button className="learn-more-btn">Learn More</button>
              </a>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./UserDashboard.css";
// import Footer from "./Footer";

// const UserDashboard = () => {
//   const [activeSection, setActiveSection] = useState("user");
//   const [activeChildView, setActiveChildView] = useState("add");
//   const [childrenData, setChildrenData] = useState([]);
//   const [bookingsData, setBookingsData] = useState([]);
//   const [editingChildID, setEditingChildID] = useState(null);

//   const [name, setName] = useState("");
//   const [school, setSchool] = useState("");
//   const [interest, setInterest] = useState("");
//   const [learningStyle, setLearningStyle] = useState("");
//   const [specialNeeds, setSpecialNeeds] = useState("");
//   const [preferredLunch, setPreferredLunch] = useState("");
//   const [userID, setUserID] = useState(3); // Hardcoded User ID for now
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch children data
//     axios
//       .get(`http://localhost:3000/children/user/${userID}`)
//       .then((response) => setChildrenData(response.data))
//       .catch((error) => console.error("Error fetching children data:", error));

//     // Fetch bookings data
//     axios
//       .get(`http://localhost:3000/bookings/user/${userID}`)
//       .then((response) => setBookingsData(response.data))
//       .catch((error) => console.error("Error fetching bookings data:", error));
//   }, [userID]);

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     if (section === "child") setActiveChildView("add");
//   };

//   const handleChildViewChange = (view) => {
//     setActiveChildView(view);
//     if (view !== "edit") resetForm();
//   };

//   const resetForm = () => {
//     setEditingChildID(null);
//     setName("");
//     setSchool("");
//     setInterest("");
//     setLearningStyle("");
//     setSpecialNeeds("");
//     setPreferredLunch("");
//   };

//   const handleChildFormSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !school || !interest || !preferredLunch) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     const childData = {
//       name,
//       school,
//       interest,
//       learningStyle,
//       specialNeeds,
//       preferredLunch,
//       userID,
//     };

//     try {
//       if (editingChildID) {
//         // Update child
//         await axios.put(`http://localhost:3000/children/${editingChildID}`, childData);
//         setSuccess("Child updated successfully!");
//       } else {
//         // Add new child
//         await axios.post(`http://localhost:3000/children/${userID}`, childData);
//         setSuccess("Child created successfully!");
//       }

//       // Refresh children data
//       const response = await axios.get(`http://localhost:3000/children/user/${userID}`);
//       setChildrenData(response.data);

//       resetForm();
//     } catch (err) {
//       setError("Error saving child data.");
//       console.error(err);
//     }
//   };

//   const handleEditChild = (child) => {
//     setEditingChildID(child.childID);
//     setName(child.name);
//     setSchool(child.school);
//     setInterest(child.interest);
//     setLearningStyle(child.learningStyle);
//     setSpecialNeeds(child.specialNeeds);
//     setPreferredLunch(child.preferredLunch);
//     setActiveChildView("add"); // Reuse the form for editing
//   };

//   const handleDeleteChild = async (childID) => {
//     try {
//       await axios.delete(`http://localhost:3000/children/${childID}`);
//       setSuccess("Child deleted successfully!");

//       // Refresh children data
//       const response = await axios.get(`http://localhost:3000/children/user/${userID}`);
//       setChildrenData(response.data);
//     } catch (err) {
//       setError("Error deleting child.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-wrapper">
//         <div className="dashboard-grid">
//           <aside className="sidebar">
//             <div className="profile">
//               <img src="profile-placeholder.png" alt="User" className="profile-pic" />
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

//           <main className="content-centered">
//             {activeSection === "user" && (
//               <div>
//                 <h1>Hello, Sarah</h1>
//                 <h2>Upcoming Bookings</h2>
//                 <div className="bookings">
//                   {bookingsData.map((booking) => (
//                     <div key={booking.bookingID} className="booking-card">
//                       <p>
//                         <strong>Booking ID:</strong> {booking.bookingID}
//                       </p>
//                       <p>
//                         <strong>Program Quantity:</strong> {booking.programQuantity}
//                       </p>
//                       <p>
//                         <strong>Total Amount:</strong> ${booking.totalAmount.toFixed(2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeSection === "child" && (
//               <div>
//                 <h1>Child Dashboard</h1>
//                 <div className="overview-cards">
//                   <button
//                     onClick={() => handleChildViewChange("add")}
//                     className={`card purple ${activeChildView === "add" ? "active" : ""}`}
//                   >
//                     Add/Edit Child
//                   </button>
//                   <button
//                     onClick={() => handleChildViewChange("delete")}
//                     className={`card orange ${activeChildView === "delete" ? "active" : ""}`}
//                   >
//                     Delete Child
//                   </button>
//                 </div>

//                 {activeChildView === "add" && (
//                   <section className="child-form">
//                     <h2>{editingChildID ? "Edit Child" : "Add New Child"}</h2>
//                     <form onSubmit={handleChildFormSubmit}>
//                       <div className="form-group">
//                         <label htmlFor="name">Name</label>
//                         <input
//                           type="text"
//                           id="name"
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="school">School</label>
//                         <input
//                           type="text"
//                           id="school"
//                           value={school}
//                           onChange={(e) => setSchool(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="interest">Interest</label>
//                         <input
//                           type="text"
//                           id="interest"
//                           value={interest}
//                           onChange={(e) => setInterest(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="learningStyle">Learning Style</label>
//                         <input
//                           type="text"
//                           id="learningStyle"
//                           value={learningStyle}
//                           onChange={(e) => setLearningStyle(e.target.value)}
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="specialNeeds">Special Needs</label>
//                         <textarea
//                           id="specialNeeds"
//                           value={specialNeeds}
//                           onChange={(e) => setSpecialNeeds(e.target.value)}
//                         ></textarea>
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="preferredLunch">Preferred Lunch</label>
//                         <input
//                           type="text"
//                           id="preferredLunch"
//                           value={preferredLunch}
//                           onChange={(e) => setPreferredLunch(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <button type="submit" className="btn btn-primary">
//                         {editingChildID ? "Update Child" : "Create Child"}
//                       </button>
//                     </form>
//                     {success && <p className="text-success">{success}</p>}
//                     {error && <p className="text-danger">{error}</p>}
//                   </section>
//                 )}

//                 <section className="child-table">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>School</th>
//                         <th>Interest</th>
//                         <th>Learning Style</th>
//                         <th>Preferred Lunch</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {childrenData.map((child) => (
//                         <tr key={child.childID}>
//                           <td>{child.name}</td>
//                           <td>{child.school}</td>
//                           <td>{child.interest}</td>
//                           <td>{child.learningStyle}</td>
//                           <td>{child.preferredLunch}</td>
//                           <td>
//                             <button onClick={() => handleEditChild(child)}>Edit</button>
//                             <button onClick={() => handleDeleteChild(child.childID)}>Delete</button>
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
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
