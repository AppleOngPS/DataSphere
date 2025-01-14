
// import React, { useState, useEffect } from "react";
// import "./Admin.css";
// import adminProfilePic from "./assets/adminpfp.jpg";

// const Admin = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [cards, setCards] = useState([]);
//   const [editedCard, setEditedCard] = useState(null);
//   const [newCard, setNewCard] = useState(null);

//   // Fetch all cards
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
//     fetchCards();
//   }, []);

//   // Handle create card click
//   const handleCreateClick = () => {
//     setNewCard({
//       cardName: "",
//       programID: "",
//       description: "",
//       programPrice: "",
//       originalPrice: "",
//       classSize: "",
//       duration: "",
//       lunchProvided: "true",
//       membershipBenefits: "",
//     });
//   };

//   // Handle create card form submission
//   const handleCreateCard = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/cards", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
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

//   // Handle edit click
//   const handleEditClick = (card) => {
//     setEditedCard({ ...card });
//   };

//   // Handle update card form submission
//   const handleUpdateCard = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3000/cards/${editedCard.cardID}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedCard),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to update card: ${response.status}`);
//       }
//       const updatedCard = await response.json();
//       setCards((prevCards) =>
//         prevCards.map((card) =>
//           card.cardID === updatedCard.cardID ? updatedCard : card
//         )
//       );
//       setEditedCard(null);
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   };

//   // Handle card deletion
//   const handleDelete = async (cardID) => {
//     try {
//       const response = await fetch(`http://localhost:3000/cards/${cardID}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to delete card: ${response.status}`);
//       }
//       setCards((prevCards) => prevCards.filter((card) => card.cardID !== cardID));
//     } catch (error) {
//       console.error("Error deleting card:", error);
//     }
//   };

//   // Handle input changes (for new and edited cards)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (newCard) {
//       setNewCard((prev) => ({ ...prev, [name]: value }));
//     } else if (editedCard) {
//       setEditedCard((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar setActiveTab={setActiveTab} />

//       <div className="content-area">
//         {activeTab === "dashboard" && <div><h2>Dashboard Content</h2></div>}

//         {activeTab === "manageProgrammes" && (
//           <div>
//             <h2>Manage Programmes</h2>
//             <button onClick={handleCreateClick}>Create New Programme</button>

//             {newCard && (
//               <form onSubmit={handleCreateCard}>
//                 <input type="text" name="cardName" placeholder="Card Name" onChange={handleChange} />
//                 <input type="text" name="programID" placeholder="Program ID" onChange={handleChange} />
//                 <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
//                 <input type="text" name="programPrice" placeholder="Program Price" onChange={handleChange} />
//                 <input type="text" name="originalPrice" placeholder="Original Price" onChange={handleChange} />
//                 <input type="text" name="classSize" placeholder="Class Size" onChange={handleChange} />
//                 <input type="text" name="duration" placeholder="Duration" onChange={handleChange} />
//                 <textarea name="membershipBenefits" placeholder="Membership Benefits" onChange={handleChange}></textarea>
//                 <button type="submit">Save</button>
//                 <button type="button" onClick={() => setNewCard(null)}>Cancel</button>
//               </form>
//             )}

//             <div className="programme-cards">
//               {cards.length === 0 ? (
//                 <p>No cards found.</p>
//               ) : (
//                 cards.map((card) => (
//                   <div className="programme-card" key={card.cardID}>
//                     {editedCard && editedCard.cardID === card.cardID ? (
//                       <form onSubmit={handleUpdateCard}>
//                         <input
//                           type="text"
//                           name="cardName"
//                           value={editedCard.cardName}
//                           onChange={handleChange}
//                         />
//                         <textarea
//                           name="description"
//                           value={editedCard.description}
//                           onChange={handleChange}
//                         ></textarea>
//                         <input
//                           type="text"
//                           name="programPrice"
//                           value={editedCard.programPrice}
//                           onChange={handleChange}
//                         />
//                         <input
//                           type="text"
//                           name="originalPrice"
//                           value={editedCard.originalPrice}
//                           onChange={handleChange}
//                         />
//                         <input
//                           type="text"
//                           name="classSize"
//                           value={editedCard.classSize}
//                           onChange={handleChange}
//                         />
//                         <input
//                           type="text"
//                           name="duration"
//                           value={editedCard.duration}
//                           onChange={handleChange}
//                         />
//                         <textarea
//                           name="membershipBenefits"
//                           value={editedCard.membershipBenefits}
//                           onChange={handleChange}
//                         ></textarea>
//                         <button type="submit">Save</button>
//                         <button type="button" onClick={() => setEditedCard(null)}>Cancel</button>
//                       </form>
//                     ) : (
//                       <div className="programme-info">
//                         <h3>{card.cardName}</h3>
//                         <p><strong>Description:</strong> {card.description}</p>
//                         <p><strong>Price:</strong> ${card.programPrice || "N/A"}</p>
//                         <p><strong>Original Price:</strong> ${card.originalPrice || "N/A"}</p>
//                         <p><strong>Class Size:</strong> {card.classSize}</p>
//                         <p><strong>Duration:</strong> {card.duration}</p>
//                         <p><strong>Lunch Provided:</strong> {card.lunchProvided ? "Yes" : "No"}</p>
//                         <p><strong>Membership Benefits:</strong> {card.membershipBenefits}</p>
//                         <button onClick={() => handleEditClick(card)}>Edit</button>
//                         <button onClick={() => handleDelete(card.cardID)}>Delete</button>
//                       </div>
//                     )}
//                   </div>
//                 ))
//               )}
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
//       <button onClick={() => setActiveTab("manageProgrammes")} className="nav-button">
//         Manage Programmes
//       </button>
//     </nav>
//   </div>
// );

// export default Admin;

import React, { useState, useEffect } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg";

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
  const handleCreateClick = () => setNewCard({ cardName: "", programID: "", description: "", programPrice: "", originalPrice: "", classSize: "", duration: "", lunchProvided: true, membershipBenefits: "" });
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
      const response = await fetch(`http://localhost:3000/cards/${editedCard.cardID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedCard),
      });
      if (!response.ok) {
        throw new Error(`Failed to update card: ${response.status}`);
      }
      const updatedCard = await response.json();
      setCards((prevCards) => prevCards.map((card) => card.cardID === updatedCard.cardID ? updatedCard : card));
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
      setCards((prevCards) => prevCards.filter((card) => card.cardID !== cardID));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // Handle Create, Edit, Update, and Delete for Programs
  const handleCreateProgramClick = () => setNewProgram({ name: "", description: "", imagePath: "" });

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
      const response = await fetch(`http://localhost:3000/programs/${editedProgram.programID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProgram),
      });
      if (!response.ok) {
        throw new Error(`Failed to update program: ${response.status}`);
      }
      const updatedProgram = await response.json();
      setPrograms((prevPrograms) => prevPrograms.map((program) => program.programID === updatedProgram.programID ? updatedProgram : program));
      setEditedProgram(null);
    } catch (error) {
      console.error("Error updating program:", error);
    }
  };

  const handleDeleteProgram = async (programID) => {
    try {
      const response = await fetch(`http://localhost:3000/programs/${programID}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete program: ${response.status}`);
      }
      setPrograms((prevPrograms) => prevPrograms.filter((program) => program.programID !== programID));
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  // Handle input changes for both cards and programs
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (newCard) setNewCard((prev) => ({ ...prev, [name]: value }));
    else if (editedCard) setEditedCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramChange = (e) => {
    const { name, value } = e.target;
    if (newProgram) setNewProgram((prev) => ({ ...prev, [name]: value }));
    else if (editedProgram) setEditedProgram((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveTab={setActiveTab} />

      <div className="content-area">
        {activeTab === "dashboard" && <div><h2>Dashboard Content</h2></div>}

        {activeTab === "manageProgrammes" && (
          <div>
            <h2>Manage Programmes</h2>

            {/* Manage Program Cards Section */}
            <div>
              <h3>Manage Program Cards</h3>
              <button onClick={handleCreateClick}>Create New Programme Card</button>

              {newCard && (
                <form onSubmit={handleCreateCard}>
                  <input type="text" name="cardName" placeholder="Card Name" onChange={handleCardChange} />
                  <textarea name="description" placeholder="Description" onChange={handleCardChange}></textarea>
                  <input type="text" name="programPrice" placeholder="Program Price" onChange={handleCardChange} />
                  <input type="text" name="originalPrice" placeholder="Original Price" onChange={handleCardChange} />
                  <input type="text" name="classSize" placeholder="Class Size" onChange={handleCardChange} />
                  <input type="text" name="duration" placeholder="Duration" onChange={handleCardChange} />
                  <textarea name="membershipBenefits" placeholder="Membership Benefits" onChange={handleCardChange}></textarea>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setNewCard(null)}>Cancel</button>
                </form>
              )}

              <div className="programme-cards">
                {cards.length === 0 ? (
                  <p>No cards found.</p>
                ) : (
                  cards.map((card) => (
                    <div className="programme-card" key={card.cardID}>
                      {editedCard && editedCard.cardID === card.cardID ? (
                        <form onSubmit={handleUpdateCard}>
                          <input type="text" name="cardName" value={editedCard.cardName} onChange={handleCardChange} />
                          <textarea name="description" value={editedCard.description} onChange={handleCardChange}></textarea>
                          <input type="text" name="programPrice" value={editedCard.programPrice} onChange={handleCardChange} />
                          <input type="text" name="originalPrice" value={editedCard.originalPrice} onChange={handleCardChange} />
                          <input type="text" name="classSize" value={editedCard.classSize} onChange={handleCardChange} />
                          <input type="text" name="duration" value={editedCard.duration} onChange={handleCardChange} />
                          <textarea name="membershipBenefits" value={editedCard.membershipBenefits} onChange={handleCardChange}></textarea>
                          <button type="submit">Save</button>
                          <button type="button" onClick={() => setEditedCard(null)}>Cancel</button>
                        </form>
                      ) : (
                        <div className="programme-info">
                          <h3>{card.cardName}</h3>
                          <p><strong>Program ID:</strong> {card.programID}</p>
                          <p><strong>Description:</strong> {card.description}</p>
                          <p><strong>Price:</strong> ${card.programPrice || "N/A"}</p>
                          <p><strong>Original Price:</strong> ${card.originalPrice || "N/A"}</p>
                          <p><strong>Class Size:</strong> {card.classSize}</p>
                          <p><strong>Duration:</strong> {card.duration}</p>
                          <p><strong>Lunch Provided:</strong> {card.lunchProvided ? "Yes" : "No"}</p>
                          <p><strong>Membership Benefits:</strong> {card.membershipBenefits}</p>
                          <button onClick={() => handleEditClick(card)}>Edit</button>
                          <button onClick={() => handleDelete(card.cardID)}>Delete</button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Manage Programs Section */}
            <div>
              <h3>Manage Programs</h3>
              <button onClick={handleCreateProgramClick}>Create New Program</button>

              {newProgram && (
                <form onSubmit={handleCreateProgram}>
                  <input type="text" name="name" placeholder="Program Name" onChange={handleProgramChange} />
                  <textarea name="description" placeholder="Program Description" onChange={handleProgramChange}></textarea>
                  <input type="text" name="imagePath" placeholder="Image Path" onChange={handleProgramChange} />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setNewProgram(null)}>Cancel</button>
                </form>
              )}

              <div className="program-cards">
                {programs.length === 0 ? (
                  <p>No programs found.</p>
                ) : (
                  programs.map((program) => (
                    <div className="program-card" key={program.programID}>
                      {editedProgram && editedProgram.programID === program.programID ? (
                        <form onSubmit={handleUpdateProgram}>
                          <input type="text" name="name" value={editedProgram.name} onChange={handleProgramChange} />
                          <textarea name="description" value={editedProgram.description} onChange={handleProgramChange}></textarea>
                          <input type="text" name="imagePath" value={editedProgram.imagePath} onChange={handleProgramChange} />
                          <button type="submit">Save</button>
                          <button type="button" onClick={() => setEditedProgram(null)}>Cancel</button>
                        </form>
                      ) : (
                        <div className="program-info">
                          <h3>{program.name}</h3>
                          <p><strong>Description:</strong> {program.description}</p>
                          <p><strong>Image:</strong> <img src={program.imagePath} alt={program.name} /></p>
                          <button onClick={() => handleEditProgramClick(program)}>Edit</button>
                          <button onClick={() => handleDeleteProgram(program.programID)}>Delete</button>
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
    <div className="profile">
      <img src={adminProfilePic} alt="Admin Profile" className="profile-image" />
      <p className="profile-name">Admin Name</p>
    </div>
    <nav className="nav-buttons">
      <button onClick={() => setActiveTab("dashboard")} className="nav-button">Dashboard</button>
      <button onClick={() => setActiveTab("manageProgrammes")} className="nav-button">Manage Programmes</button>
    </nav>
  </div>
);

export default Admin;
