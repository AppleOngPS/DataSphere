import React, { useState, useEffect } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg";
import Footer from "./Footer";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // State for cards
  const [cards, setCards] = useState([]);
  const [editedCard, setEditedCard] = useState(null);
  const [newCard, setNewCard] = useState(null);

  // State for programs
  const [programs, setPrograms] = useState([]);
  const [editedProgram, setEditedProgram] = useState(null);
  const [newProgram, setNewProgram] = useState(null);

  // Fetch all cards and programs
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:3000/cards");
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:3000/programs/");
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchCards();
    fetchPrograms();
  }, []);

  // Handle Create, Edit, Update, and Delete for Cards
  const handleCreateClick = () =>
    setNewCard({
      cardName: "",
      programID: "",
      description: "",
      programPrice: "",
      originalPrice: "",
      classSize: "",
      duration: "",
      lunchProvided: true,
      membershipBenefits: "",
    });

  const handleCreateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCard),
      });
      if (!response.ok) {
        throw new Error(`Failed to create card: ${response.status}`);
      }
      const createdCard = await response.json();
      setCards((prevCards) => [...prevCards, createdCard]);
      setNewCard(null);
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const handleEditClick = (card) => setEditedCard({ ...card });

  const handleUpdateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/cards/${editedCard.cardID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedCard),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update card: ${response.status}`);
      }
      const updatedCard = await response.json();
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.cardID === updatedCard.cardID ? updatedCard : c
        )
      );
      setEditedCard(null);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleDelete = async (cardID) => {
    try {
      const response = await fetch(`http://localhost:3000/cards/${cardID}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete card: ${response.status}`);
      }
      setCards((prevCards) =>
        prevCards.filter((card) => card.cardID !== cardID)
      );
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // Handle Create, Edit, Update, and Delete for Programs
  const handleCreateProgramClick = () =>
    setNewProgram({ name: "", description: "", imagePath: "" });

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/programs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProgram),
      });
      if (!response.ok) {
        throw new Error(`Failed to create program: ${response.status}`);
      }
      const createdProgram = await response.json();
      setPrograms((prevPrograms) => [...prevPrograms, createdProgram]);
      setNewProgram(null);
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  const handleEditProgramClick = (program) => setEditedProgram({ ...program });

  const handleUpdateProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/programs/${editedProgram.programID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedProgram),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update program: ${response.status}`);
      }
      const updatedProgram = await response.json();
      setPrograms((prevPrograms) =>
        prevPrograms.map((p) =>
          p.programID === updatedProgram.programID ? updatedProgram : p
        )
      );
      setEditedProgram(null);
    } catch (error) {
      console.error("Error updating program:", error);
    }
  };

  const handleDeleteProgram = async (programID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/programs/${programID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete program: ${response.status}`);
      }
      setPrograms((prevPrograms) =>
        prevPrograms.filter((program) => program.programID !== programID)
      );
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  // Handle input changes for both cards and programs
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (newCard) {
      setNewCard((prev) => ({ ...prev, [name]: value }));
    } else if (editedCard) {
      setEditedCard((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProgramChange = (e) => {
    const { name, value } = e.target;
    if (newProgram) {
      setNewProgram((prev) => ({ ...prev, [name]: value }));
    } else if (editedProgram) {
      setEditedProgram((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveTab={setActiveTab} />

      <div className="content-area">
        {/* TOP HEADER SECTION (Like the second screenshot) */}
        <div className="welcome-section">
          <h1>Hello, Admin</h1>
          <p>This is your dashboard.</p>
        </div>

        {/* Conditional tabs */}
        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            <p>
              Use the sidebar to manage your programmes or see a quick overview
              here.
            </p>
            {/* If you want to add stats/cards, do it here */}
          </div>
        )}

        {activeTab === "manageProgrammes" && (
          <div className="manage-programmes-section">
            <h2>Manage Programmes</h2>

            {/* Manage Program Cards Section */}
            <div className="section-block">
              <h3>Manage Program Cards</h3>
              <button className="create-button" onClick={handleCreateClick}>
                Create New Programme Card
              </button>

              {newCard && (
                <form className="form-block" onSubmit={handleCreateCard}>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Card Name"
                    onChange={handleCardChange}
                    required
                  />
                 
                  <input
                    type="text"
                    name="programID"
                    placeholder="Program ID"
                    onChange={handleCardChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleCardChange}
                    required
                  ></textarea>
                  <input
                    type="text"
                    name="programPrice"
                    placeholder="Program Price"
                    onChange={handleCardChange}
                  />
                  <input
                    type="text"
                    name="originalPrice"
                    placeholder="Original Price"
                    onChange={handleCardChange}
                  />
                  <input
                    type="text"
                    name="classSize"
                    placeholder="Class Size"
                    onChange={handleCardChange}
                  />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    onChange={handleCardChange}
                  />
                  <textarea
                    name="membershipBenefits"
                    placeholder="Membership Benefits"
                    onChange={handleCardChange}
                  ></textarea>

                  <div className="button-row">
                    <button type="submit" className="save-button">
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setNewCard(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="programme-cards">
                {cards.length === 0 ? (
                  <p>No cards found.</p>
                ) : (
                  cards.map((card) => (
                    <div className="programme-card" key={card.cardID}>
                      {editedCard && editedCard.cardID === card.cardID ? (
                        <form
                          className="form-block"
                          onSubmit={handleUpdateCard}
                        >
                          <input
                            type="text"
                            name="cardName"
                            value={editedCard.cardName}
                            onChange={handleCardChange}
                          />
                          <textarea
                            name="description"
                            value={editedCard.description}
                            onChange={handleCardChange}
                          ></textarea>
                          <input
                            type="text"
                            name="programPrice"
                            value={editedCard.programPrice}
                            onChange={handleCardChange}
                          />
                          <input
                            type="text"
                            name="originalPrice"
                            value={editedCard.originalPrice}
                            onChange={handleCardChange}
                          />
                          <input
                            type="text"
                            name="classSize"
                            value={editedCard.classSize}
                            onChange={handleCardChange}
                          />
                          <input
                            type="text"
                            name="duration"
                            value={editedCard.duration}
                            onChange={handleCardChange}
                          />
                          <textarea
                            name="membershipBenefits"
                            value={editedCard.membershipBenefits}
                            onChange={handleCardChange}
                          ></textarea>
                          <div className="button-row">
                            <button type="submit" className="save-button">
                              Save
                            </button>
                            <button
                              type="button"
                              className="cancel-button"
                              onClick={() => setEditedCard(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="programme-info">
                          <h3>{card.cardName}</h3>
                          <p>
                            <strong>Program ID:</strong> {card.programID}
                          </p>
                          <p>
                            <strong>Description:</strong> {card.description}
                          </p>
                          <p>
                            <strong>Price:</strong>{" "}
                            {card.programPrice
                              ? `$${card.programPrice}`
                              : "N/A"}
                          </p>
                          <p>
                            <strong>Original Price:</strong>{" "}
                            {card.originalPrice
                              ? `$${card.originalPrice}`
                              : "N/A"}
                          </p>
                          <p>
                            <strong>Class Size:</strong> {card.classSize}
                          </p>
                          <p>
                            <strong>Duration:</strong> {card.duration}
                          </p>
                          <p>
                            <strong>Lunch Provided:</strong>{" "}
                            {card.lunchProvided ? "Yes" : "No"}
                          </p>
                          <p>
                            <strong>Membership Benefits:</strong>{" "}
                            {card.membershipBenefits}
                          </p>
                          <div className="button-row">
                            <button onClick={() => handleEditClick(card)}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(card.cardID)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Manage Programs Section */}
            <div className="section-block">
              <h3>Manage Programs</h3>
              <button
                className="create-button"
                onClick={handleCreateProgramClick}
              >
                Create New Program
              </button>

              {newProgram && (
                <form className="form-block" onSubmit={handleCreateProgram}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Program Name"
                    onChange={handleProgramChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Program Description"
                    onChange={handleProgramChange}
                    required
                  ></textarea>
                  <input
                    type="text"
                    name="imagePath"
                    placeholder="Image Path"
                    onChange={handleProgramChange}
                  />
                  <div className="button-row">
                    <button type="submit" className="save-button">
                      Save
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setNewProgram(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="program-cards">
                {programs.length === 0 ? (
                  <p>No programs found.</p>
                ) : (
                  programs.map((program) => (
                    <div className="program-card" key={program.programID}>
                      {editedProgram &&
                      editedProgram.programID === program.programID ? (
                        <form
                          className="form-block"
                          onSubmit={handleUpdateProgram}
                        >
                          <input
                            type="text"
                            name="name"
                            value={editedProgram.name}
                            onChange={handleProgramChange}
                          />
                          <textarea
                            name="description"
                            value={editedProgram.description}
                            onChange={handleProgramChange}
                          ></textarea>
                          <input
                            type="text"
                            name="imagePath"
                            value={editedProgram.imagePath}
                            onChange={handleProgramChange}
                          />
                          <div className="button-row">
                            <button type="submit" className="save-button">
                              Save
                            </button>
                            <button
                              type="button"
                              className="cancel-button"
                              onClick={() => setEditedProgram(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="program-info">
                          <h3>{program.name}</h3>
                          <p>
                            <strong>Description:</strong> {program.description}
                          </p>
                          <div className="program-image">
                            {program.imagePath ? (
                              <img src={program.imagePath} alt={program.name} />
                            ) : (
                              <p>No image provided</p>
                            )}
                          </div>
                          <div className="button-row">
                            <button
                              onClick={() => handleEditProgramClick(program)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteProgram(program.programID)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ setActiveTab }) => (
  <div className="sidebar">
    <div className="profile"></div>

    <nav className="nav-buttons">
      <button onClick={() => setActiveTab("dashboard")} className="nav-button">
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab("manageProgrammes")}
        className="nav-button"
      >
        Manage Programmes
      </button>
    </nav>
  </div>
);

export default Admin;

// import React, { useState, useEffect, useRef } from "react";
// import "./Admin.css";
// import adminProfilePic from "./assets/adminpfp.jpg";
// import Chart from "chart.js/auto";
// import ReportUploader from "./assets/components/ReportUploader";

// const Admin = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   // State for cards
//   const [cards, setCards] = useState([]);
//   const [editedCard, setEditedCard] = useState(null);
//   const [newCard, setNewCard] = useState(null);

//   // State for programs
//   const [programs, setPrograms] = useState([]);
//   const [editedProgram, setEditedProgram] = useState(null);
//   const [newProgram, setNewProgram] = useState(null);

//   // State for analytics
//   const [analyticsData, setAnalyticsData] = useState([]);
//   const chartRef = useRef(null); // Reference for Chart.js
//   const chartInstance = useRef(null); // Reference to the Chart.js instance

//   // Fetch all cards, programs and analytics data
//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/cards");
//         if (!response.ok) {
//           throw new Error(`HTTP Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setCards(data);
//       } catch (error) {
//         console.error("Error fetching cards:", error);
//       }
//     };

//     const fetchPrograms = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/programs/");
//         if (!response.ok) {
//           throw new Error(`HTTP Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setPrograms(data);
//       } catch (error) {
//         console.error("Error fetching programs:", error);
//       }
//     };

//     const fetchAnalytics = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/analytics");
//         if (!response.ok) {
//           throw new Error(`HTTP Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setAnalyticsData(data);
//       } catch (error) {
//         console.error("Error fetching analytics data:", error);
//       }
//     };

//     fetchCards();
//     fetchPrograms();
//     fetchAnalytics();
//   }, []);

//   // Update Chart.js when analytics data changes
// useEffect(() => {
//   const transformedData = analyticsData.map((item) => ({
//     timestamp: item.timestamp || "No Timestamp",
//     event_count: item.event_count || 0,
//   }));

//   console.log("Transformed Analytics Data:", transformedData); // Log transformed data

//   if (transformedData.length && chartRef.current) {
//     // Destroy previous chart if it exists
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const ctx = chartRef.current.getContext("2d");

//     // Create a new chart instance
//     chartInstance.current = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: transformedData.map((item) => item.timestamp),
//         datasets: [
//           {
//             label: "User Events",
//             data: transformedData.map((item) => item.event_count),
//             borderColor: "blue",
//             borderWidth: 2,
//           },
//         ],
//       },
//     });
//   }
// }, [analyticsData]); // Run the effect whenever analyticsData changes

//   // Handle Create, Edit, Update, and Delete for Cards
//   const handleCreateClick = () =>
//     setNewCard({
//       cardName: "",
//       programID: "",
//       description: "",
//       programPrice: "",
//       originalPrice: "",
//       classSize: "",
//       duration: "",
//       lunchProvided: true,
//       membershipBenefits: "",
//     });

//   const handleCreateCard = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/cards", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newCard),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to create card: ${response.status}`);
//       }
//       const createdCard = await response.json();
//       setCards((prevCards) => [...prevCards, createdCard]);
//       setNewCard(null);
//     } catch (error) {
//       console.error("Error creating card:", error);
//     }
//   };

//   const handleEditClick = (card) => setEditedCard({ ...card });

//   const handleUpdateCard = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://localhost:3000/cards/${editedCard.cardID}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(editedCard),
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to update card: ${response.status}`);
//       }
//       const updatedCard = await response.json();
//       setCards((prevCards) =>
//         prevCards.map((c) =>
//           c.cardID === updatedCard.cardID ? updatedCard : c
//         )
//       );
//       setEditedCard(null);
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   };

//   const handleDelete = async (cardID) => {
//     try {
//       const response = await fetch(`http://localhost:3000/cards/${cardID}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to delete card: ${response.status}`);
//       }
//       setCards((prevCards) =>
//         prevCards.filter((card) => card.cardID !== cardID)
//       );
//     } catch (error) {
//       console.error("Error deleting card:", error);
//     }
//   };

//   // Handle Create, Edit, Update, and Delete for Programs
//   const handleCreateProgramClick = () =>
//     setNewProgram({ name: "", description: "", imagePath: "" });

//   const handleCreateProgram = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/programs/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProgram),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to create program: ${response.status}`);
//       }
//       const createdProgram = await response.json();
//       setPrograms((prevPrograms) => [...prevPrograms, createdProgram]);
//       setNewProgram(null);
//     } catch (error) {
//       console.error("Error creating program:", error);
//     }
//   };

//   const handleEditProgramClick = (program) => setEditedProgram({ ...program });

//   const handleUpdateProgram = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://localhost:3000/programs/${editedProgram.programID}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(editedProgram),
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to update program: ${response.status}`);
//       }
//       const updatedProgram = await response.json();
//       setPrograms((prevPrograms) =>
//         prevPrograms.map((p) =>
//           p.programID === updatedProgram.programID ? updatedProgram : p
//         )
//       );
//       setEditedProgram(null);
//     } catch (error) {
//       console.error("Error updating program:", error);
//     }
//   };

//   const handleDeleteProgram = async (programID) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/programs/${programID}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to delete program: ${response.status}`);
//       }
//       setPrograms((prevPrograms) =>
//         prevPrograms.filter((program) => program.programID !== programID)
//       );
//     } catch (error) {
//       console.error("Error deleting program:", error);
//     }
//   };

//   // Handle input changes for both cards and programs
//   const handleCardChange = (e) => {
//     const { name, value } = e.target;
//     if (newCard) {
//       setNewCard((prev) => ({ ...prev, [name]: value }));
//     } else if (editedCard) {
//       setEditedCard((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleProgramChange = (e) => {
//     const { name, value } = e.target;
//     if (newProgram) {
//       setNewProgram((prev) => ({ ...prev, [name]: value }));
//     } else if (editedProgram) {
//       setEditedProgram((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar setActiveTab={setActiveTab} />

//       <div className="content-area">
//         {/* TOP HEADER SECTION (Like the second screenshot) */}
//         <div className="welcome-section">
//           <h1>Hello, Admin</h1>
//           <p>This is your dashboard.</p>
//         </div>

//         {/* Conditional tabs */}
//         {activeTab === "dashboard" && (
//           <div className="dashboard-content">
//             <h2>Dashboard Overview</h2>
//             <p>
//               Use the sidebar to manage your programmes or see a quick overview
//               here.
//             </p>

//             {/* Chart.js Canvas */}
//             <canvas id="analyticsChart" ref={chartRef}></canvas>

//             {/* ReportUploader Component */}
//             <ReportUploader />

//             {/* If you want to add stats/cards, do it here */}
//           </div>
//         )}

//         {activeTab === "manageProgrammes" && (
//           <div className="manage-programmes-section">
//             <h2>Manage Programmes</h2>

//             {/* Manage Program Cards Section */}
//             <div className="section-block">
//               <h3>Manage Program Cards</h3>
//               <button className="create-button" onClick={handleCreateClick}>
//                 Create New Programme Card
//               </button>

//               {newCard && (
//                 <form className="form-block" onSubmit={handleCreateCard}>
//                   <input
//                     type="text"
//                     name="cardName"
//                     placeholder="Card Name"
//                     onChange={handleCardChange}
//                     required
//                   />
//                   <textarea
//                     name="description"
//                     placeholder="Description"
//                     onChange={handleCardChange}
//                     required
//                   ></textarea>
//                   <input
//                     type="text"
//                     name="programPrice"
//                     placeholder="Program Price"
//                     onChange={handleCardChange}
//                   />
//                   <input
//                     type="text"
//                     name="originalPrice"
//                     placeholder="Original Price"
//                     onChange={handleCardChange}
//                   />
//                   <input
//                     type="text"
//                     name="classSize"
//                     placeholder="Class Size"
//                     onChange={handleCardChange}
//                   />
//                   <input
//                     type="text"
//                     name="duration"
//                     placeholder="Duration"
//                     onChange={handleCardChange}
//                   />
//                   <textarea
//                     name="membershipBenefits"
//                     placeholder="Membership Benefits"
//                     onChange={handleCardChange}
//                   ></textarea>

//                   <div className="button-row">
//                     <button type="submit" className="save-button">
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       className="cancel-button"
//                       onClick={() => setNewCard(null)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               )}

//               <div className="programme-cards">
//                 {cards.length === 0 ? (
//                   <p>No cards found.</p>
//                 ) : (
//                   cards.map((card) => (
//                     <div className="programme-card" key={card.cardID}>
//                       {editedCard && editedCard.cardID === card.cardID ? (
//                         <form
//                           className="form-block"
//                           onSubmit={handleUpdateCard}
//                         >
//                           <input
//                             type="text"
//                             name="cardName"
//                             value={editedCard.cardName}
//                             onChange={handleCardChange}
//                           />
//                           <textarea
//                             name="description"
//                             value={editedCard.description}
//                             onChange={handleCardChange}
//                           ></textarea>
//                           <input
//                             type="text"
//                             name="programPrice"
//                             value={editedCard.programPrice}
//                             onChange={handleCardChange}
//                           />
//                           <input
//                             type="text"
//                             name="originalPrice"
//                             value={editedCard.originalPrice}
//                             onChange={handleCardChange}
//                           />
//                           <input
//                             type="text"
//                             name="classSize"
//                             value={editedCard.classSize}
//                             onChange={handleCardChange}
//                           />
//                           <input
//                             type="text"
//                             name="duration"
//                             value={editedCard.duration}
//                             onChange={handleCardChange}
//                           />
//                           <textarea
//                             name="membershipBenefits"
//                             value={editedCard.membershipBenefits}
//                             onChange={handleCardChange}
//                           ></textarea>
//                           <div className="button-row">
//                             <button type="submit" className="save-button">
//                               Save
//                             </button>
//                             <button
//                               type="button"
//                               className="cancel-button"
//                               onClick={() => setEditedCard(null)}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </form>
//                       ) : (
//                         <div className="programme-info">
//                           <h3>{card.cardName}</h3>
//                           <p>
//                             <strong>Program ID:</strong> {card.programID}
//                           </p>
//                           <p>
//                             <strong>Description:</strong> {card.description}
//                           </p>
//                           <p>
//                             <strong>Price:</strong>{" "}
//                             {card.programPrice
//                               ? `$${card.programPrice}`
//                               : "N/A"}
//                           </p>
//                           <p>
//                             <strong>Original Price:</strong>{" "}
//                             {card.originalPrice
//                               ? `$${card.originalPrice}`
//                               : "N/A"}
//                           </p>
//                           <p>
//                             <strong>Class Size:</strong> {card.classSize}
//                           </p>
//                           <p>
//                             <strong>Duration:</strong> {card.duration}
//                           </p>
//                           <p>
//                             <strong>Lunch Provided:</strong>{" "}
//                             {card.lunchProvided ? "Yes" : "No"}
//                           </p>
//                           <p>
//                             <strong>Membership Benefits:</strong>{" "}
//                             {card.membershipBenefits}
//                           </p>
//                           <div className="button-row">
//                             <button onClick={() => handleEditClick(card)}>
//                               Edit
//                             </button>
//                             <button onClick={() => handleDelete(card.cardID)}>
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//             {/* Manage Programs Section */}
//             <div className="section-block">
//               <h3>Manage Programs</h3>
//               <button
//                 className="create-button"
//                 onClick={handleCreateProgramClick}
//               >
//                 Create New Program
//               </button>

//               {newProgram && (
//                 <form className="form-block" onSubmit={handleCreateProgram}>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Program Name"
//                     onChange={handleProgramChange}
//                     required
//                   />
//                   <textarea
//                     name="description"
//                     placeholder="Program Description"
//                     onChange={handleProgramChange}
//                     required
//                   ></textarea>
//                   <input
//                     type="text"
//                     name="imagePath"
//                     placeholder="Image Path"
//                     onChange={handleProgramChange}
//                   />
//                   <div className="button-row">
//                     <button type="submit" className="save-button">
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       className="cancel-button"
//                       onClick={() => setNewProgram(null)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               )}

//               <div className="program-cards">
//                 {programs.length === 0 ? (
//                   <p>No programs found.</p>
//                 ) : (
//                   programs.map((program) => (
//                     <div className="program-card" key={program.programID}>
//                       {editedProgram &&
//                       editedProgram.programID === program.programID ? (
//                         <form
//                           className="form-block"
//                           onSubmit={handleUpdateProgram}
//                         >
//                           <input
//                             type="text"
//                             name="name"
//                             value={editedProgram.name}
//                             onChange={handleProgramChange}
//                           />
//                           <textarea
//                             name="description"
//                             value={editedProgram.description}
//                             onChange={handleProgramChange}
//                           ></textarea>
//                           <input
//                             type="text"
//                             name="imagePath"
//                             value={editedProgram.imagePath}
//                             onChange={handleProgramChange}
//                           />
//                           <div className="button-row">
//                             <button type="submit" className="save-button">
//                               Save
//                             </button>
//                             <button
//                               type="button"
//                               className="cancel-button"
//                               onClick={() => setEditedProgram(null)}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </form>
//                       ) : (
//                         <div className="program-info">
//                           <h3>{program.name}</h3>
//                           <p>
//                             <strong>Description:</strong> {program.description}
//                           </p>
//                           <div className="program-image">
//                             {program.imagePath ? (
//                               <img src={program.imagePath} alt={program.name} />
//                             ) : (
//                               <p>No image provided</p>
//                             )}
//                           </div>
//                           <div className="button-row">
//                             <button
//                               onClick={() => handleEditProgramClick(program)}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleDeleteProgram(program.programID)
//                               }
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ setActiveTab }) => (
//   <div className="sidebar">
//     <div className="profile">
//       <img
//         src={adminProfilePic}
//         alt="Admin Profile"
//         className="profile-image"
//       />
//       <p className="profile-name">Admin Name</p>
//     </div>

//     <nav className="nav-buttons">
//       <button onClick={() => setActiveTab("dashboard")} className="nav-button">
//         Dashboard
//       </button>
//       <button
//         onClick={() => setActiveTab("manageProgrammes")}
//         className="nav-button"
//       >
//         Manage Programmes
//       </button>
//     </nav>
//   </div>
// );

// export default Admin;
