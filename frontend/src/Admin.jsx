
// import React, { useState, useEffect } from "react";
// import "./Admin.css";
// import adminProfilePic from "./assets/adminpfp.jpg";

// const Admin = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [cards, setCards] = useState([]);
//   const [editedCard, setEditedCard] = useState(null);
//   const [newCard, setNewCard] = useState(null);

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
//       setNewCard(null); // Close the create form
//     } catch (error) {
//       console.error("Error creating card:", error);
//     }
//   };

//   const handleEditClick = (card) => {
//     setEditedCard({ ...card });
//   };

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
//       setEditedCard(null); // Exit edit mode
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (newCard) {
//       setNewCard((prev) => ({ ...prev, [name]: value }));
//     } else if (editedCard) {
//       setEditedCard((prev) => ({ ...prev, [name]: value }));
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
//       setCards((prevCards) => prevCards.filter((card) => card.cardID !== cardID));
//     } catch (error) {
//       console.error("Error deleting card:", error);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar setActiveTab={setActiveTab} />

//       <div className="content-area">
//         {activeTab === "dashboard" && <div><h2>Dashboard Content</h2></div>}

//         {activeTab === "manageProgrammes" && (
//           <div>
//             <h2>Manage Cards</h2>
//             <button onClick={handleCreateClick}>Create New Card</button>

//             {/* New Card Form */}
//             {newCard && (
//               <form onSubmit={handleCreateCard}>
//                 <label>
//                   Card Name:
//                   <input
//                     type="text"
//                     name="cardName"
//                     value={newCard.cardName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </label>
//                 <label>
//                   Program ID:
//                   <input
//                     type="number"
//                     name="programID"
//                     value={newCard.programID}
//                     onChange={handleChange}
//                     required
//                   />
//                 </label>
//                 <label>
//                   Description:
//                   <textarea
//                     name="description"
//                     value={newCard.description}
//                     onChange={handleChange}
//                     required
//                   />
//                 </label>
//                 <label>
//                   Program Price:
//                   <input
//                     type="number"
//                     name="programPrice"
//                     value={newCard.programPrice || ""}
//                     onChange={handleChange}
//                   />
//                 </label>
//                 <label>
//                   Original Price:
//                   <input
//                     type="number"
//                     name="originalPrice"
//                     value={newCard.originalPrice || ""}
//                     onChange={handleChange}
//                   />
//                 </label>
//                 <label>
//                   Class Size:
//                   <input
//                     type="text"
//                     name="classSize"
//                     value={newCard.classSize}
//                     onChange={handleChange}
//                     required
//                   />
//                 </label>
//                 <label>
//                   Duration:
//                   <input
//                     type="text"
//                     name="duration"
//                     value={newCard.duration}
//                     onChange={handleChange}
//                     required
//                   />
//                 </label>
//                 <label>
//                   Lunch Provided:
//                   <select
//                     name="lunchProvided"
//                     value={newCard.lunchProvided}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="true">Yes</option>
//                     <option value="false">No</option>
//                   </select>
//                 </label>
//                 <label>
//                   Membership Benefits:
//                   <textarea
//                     name="membershipBenefits"
//                     value={newCard.membershipBenefits || ""}
//                     onChange={handleChange}
//                   />
//                 </label>
//                 <button type="submit">Create Card</button>
//                 <button
//                   type="button"
//                   onClick={() => setNewCard(null)}
//                 >
//                   Cancel
//                 </button>
//               </form>
//             )}

//             <div className="programme-cards">
//               {cards.map((card) => (
//                 <div className="programme-card" key={card.cardID}>
//                   {editedCard && editedCard.cardID === card.cardID ? (
//                     <form onSubmit={handleUpdateCard}>
//                       <label>
//                         Card Name:
//                         <input
//                           type="text"
//                           name="cardName"
//                           value={editedCard.cardName}
//                           onChange={handleChange}
//                           required
//                         />
//                       </label>
//                       <label>
//                         Program ID:
//                         <input
//                           type="number"
//                           name="programID"
//                           value={editedCard.programID}
//                           onChange={handleChange}
//                           required
//                         />
//                       </label>
//                       <label>
//                         Description:
//                         <textarea
//                           name="description"
//                           value={editedCard.description}
//                           onChange={handleChange}
//                           required
//                         />
//                       </label>
//                       <label>
//                         Program Price:
//                         <input
//                           type="number"
//                           name="programPrice"
//                           value={editedCard.programPrice || ""}
//                           onChange={handleChange}
//                         />
//                       </label>
//                       <label>
//                         Original Price:
//                         <input
//                           type="number"
//                           name="originalPrice"
//                           value={editedCard.originalPrice || ""}
//                           onChange={handleChange}
//                         />
//                       </label>
//                       <label>
//                         Class Size:
//                         <input
//                           type="text"
//                           name="classSize"
//                           value={editedCard.classSize}
//                           onChange={handleChange}
//                           required
//                         />
//                       </label>
//                       <label>
//                         Duration:
//                         <input
//                           type="text"
//                           name="duration"
//                           value={editedCard.duration}
//                           onChange={handleChange}
//                           required
//                         />
//                       </label>
//                       <label>
//                         Lunch Provided:
//                         <select
//                           name="lunchProvided"
//                           value={editedCard.lunchProvided ? "true" : "false"}
//                           onChange={(e) =>
//                             setEditedCard((prev) => ({
//                               ...prev,
//                               lunchProvided: e.target.value === "true",
//                             }))
//                           }
//                           required
//                         >
//                           <option value="true">Yes</option>
//                           <option value="false">No</option>
//                         </select>
//                       </label>
//                       <label>
//                         Membership Benefits:
//                         <textarea
//                           name="membershipBenefits"
//                           value={editedCard.membershipBenefits || ""}
//                           onChange={handleChange}
//                         />
//                       </label>
//                       <button type="submit">Save</button>
//                       <button
//                         type="button"
//                         onClick={() => setEditedCard(null)}
//                       >
//                         Cancel
//                       </button>
//                     </form>
//                   ) : (
//                     <div className="programme-info">
//                       <h3>{card.cardName}</h3>
//                       <p><strong>Program ID:</strong> {card.programID}</p>
//                       <p>{card.description}</p>
//                       <p><strong>Price:</strong> ${card.programPrice || "N/A"}</p>
//                       <p><strong>Original Price:</strong> ${card.originalPrice || "N/A"}</p>
//                       <p><strong>Class Size:</strong> {card.classSize}</p>
//                       <p><strong>Duration:</strong> {card.duration}</p>
//                       <p><strong>Lunch Provided:</strong> {card.lunchProvided ? "Yes" : "No"}</p>
//                       <p><strong>Membership Benefits:</strong> {card.membershipBenefits || "N/A"}</p>
//                       <button onClick={() => handleEditClick(card)}>Edit</button>
//                       <button onClick={() => handleDelete(card.cardID)}>Delete</button>
//                     </div>
//                   )}
//                 </div>
//               ))}
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
import React, { useState, useEffect } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cards, setCards] = useState([]);
  const [editedCard, setEditedCard] = useState(null);
  const [newCard, setNewCard] = useState(null);

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
    fetchCards();
  }, []);

  const handleCreateClick = () => {
    setNewCard({
      cardName: "",
      programID: "",
      description: "",
      programPrice: "",
      originalPrice: "",
      classSize: "",
      duration: "",
      lunchProvided: "true",
      membershipBenefits: "",
    });
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  const handleEditClick = (card) => {
    setEditedCard({ ...card });
  };

  const handleUpdateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/cards/${editedCard.cardID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCard),
      });
      if (!response.ok) {
        throw new Error(`Failed to update card: ${response.status}`);
      }
      const updatedCard = await response.json();
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.cardID === updatedCard.cardID ? updatedCard : card
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
      setCards((prevCards) => prevCards.filter((card) => card.cardID !== cardID));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (newCard) {
      setNewCard((prev) => ({ ...prev, [name]: value }));
    } else if (editedCard) {
      setEditedCard((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveTab={setActiveTab} />

      <div className="content-area">
        {activeTab === "dashboard" && <div><h2>Dashboard Content</h2></div>}

        {activeTab === "manageProgrammes" && (
          <div>
            <h2>Manage Programmes</h2>
            <button onClick={handleCreateClick}>Create New Programme</button>

            {newCard && (
              <form onSubmit={handleCreateCard}>
                <input type="text" name="cardName" placeholder="Card Name" onChange={handleChange} />
                <input type="text" name="programID" placeholder="Program ID" onChange={handleChange} />
                <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                <input type="text" name="programPrice" placeholder="Program Price" onChange={handleChange} />
                <input type="text" name="originalPrice" placeholder="Original Price" onChange={handleChange} />
                <input type="text" name="classSize" placeholder="Class Size" onChange={handleChange} />
                <input type="text" name="duration" placeholder="Duration" onChange={handleChange} />
                <textarea name="membershipBenefits" placeholder="Membership Benefits" onChange={handleChange}></textarea>
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
                        <input type="text" name="cardName" value={editedCard.cardName} onChange={handleChange} />
                        <textarea name="description" value={editedCard.description} onChange={handleChange}></textarea>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditedCard(null)}>Cancel</button>
                      </form>
                    ) : (
                      <div className="programme-info">
                        <h3>{card.cardName}</h3>
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
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ setActiveTab }) => (
  <div className="sidebar">
    <div className="profile">
      <img
        src={adminProfilePic}
        alt="Admin Profile"
        className="profile-image"
      />
      <p className="profile-name">Admin Name</p>
    </div>
    <nav className="nav-buttons">
      <button onClick={() => setActiveTab("dashboard")} className="nav-button">
        Dashboard
      </button>
      <button onClick={() => setActiveTab("manageProgrammes")} className="nav-button">
        Manage Programmes
      </button>
    </nav>
  </div>
);

export default Admin;
