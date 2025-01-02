
// import React, { useState, useEffect } from "react";
// import "./Admin.css";
// import adminProfilePic from "./assets/adminpfp.jpg";

// const Admin = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [cards, setCards] = useState([]);
//   const [editedCard, setEditedCard] = useState(null);

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

//   const handleEditClick = (card) => {
//     setEditedCard({ ...card }); // Set the card to be edited
//   };

//   const handleUpdateCard = async (e) => {
//     e.preventDefault();

//     console.log("Attempting to update card with ID:", editedCard.cardID);

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
//       console.log("Updated card response:", updatedCard);

//       // Re-fetch cards after update to make sure you get the latest data from the backend
//       const fetchCards = async () => {
//         try {
//           const response = await fetch("http://localhost:3000/cards");
//           if (!response.ok) {
//             throw new Error(`HTTP Error: ${response.status}`);
//           }
//           const data = await response.json();
//           setCards(data); // Update the cards with the latest data from the backend
//         } catch (error) {
//           console.error("Error fetching cards:", error);
//         }
//       };

//       // Refetch the data after the update
//       fetchCards();

//       setEditedCard(null); // Exit edit mode
//       console.log("Updated card saved and data refetched successfully");

//     } catch (error) {
//       console.error("Error during card update:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedCard((prev) => ({ ...prev, [name]: value })); // Update the edited card's state
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar setActiveTab={setActiveTab} />

//       <div className="content-area">
//         {activeTab === "dashboard" && <div><h2>Dashboard Content</h2></div>}

//         {activeTab === "manageProgrammes" && (
//           <div>
//             <h2>Manage Cards</h2>
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

// export default Admin;
import React, { useState, useEffect } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cards, setCards] = useState([]);
  const [editedCard, setEditedCard] = useState(null);

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

  const handleEditClick = (card) => {
    setEditedCard({ ...card }); // Set the card to be edited
  };

  const handleUpdateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/cards/${editedCard.cardID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCard), // Send updated card details
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
      setEditedCard(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCard((prev) => ({ ...prev, [name]: value })); // Update the edited card's state
  };

  const handleDelete = async (cardID) => {
    try {
      const response = await fetch(`http://localhost:3000/cards/${cardID}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete card: ${response.status}`);
      }
  
      // Remove the deleted card from the UI
      setCards((prevCards) => prevCards.filter((card) => card.cardID !== cardID));
    } catch (error) {
      console.error("Error deleting card:", error);
      // Optionally, show an error notification
    }
  };
  

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveTab={setActiveTab} />

      <div className="content-area">
        {activeTab === "dashboard" && <div><h2>Dashboard Content</h2></div>}

        {activeTab === "manageProgrammes" && (
          <div>
            <h2>Manage Cards</h2>
            <div className="programme-cards">
              {cards.map((card) => (
                <div className="programme-card" key={card.cardID}>
                  {editedCard && editedCard.cardID === card.cardID ? (
                    <form onSubmit={handleUpdateCard}>
                      <label>
                        Card Name:
                        <input
                          type="text"
                          name="cardName"
                          value={editedCard.cardName}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      <label>
                        Program ID:
                        <input
                          type="number"
                          name="programID"
                          value={editedCard.programID}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      <label>
                        Description:
                        <textarea
                          name="description"
                          value={editedCard.description}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      <label>
                        Program Price:
                        <input
                          type="number"
                          name="programPrice"
                          value={editedCard.programPrice || ""}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Original Price:
                        <input
                          type="number"
                          name="originalPrice"
                          value={editedCard.originalPrice || ""}
                          onChange={handleChange}
                        />
                      </label>
                      <label>
                        Class Size:
                        <input
                          type="text"
                          name="classSize"
                          value={editedCard.classSize}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      <label>
                        Duration:
                        <input
                          type="text"
                          name="duration"
                          value={editedCard.duration}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      <label>
                        Lunch Provided:
                        <select
                          name="lunchProvided"
                          value={editedCard.lunchProvided ? "true" : "false"}
                          onChange={(e) =>
                            setEditedCard((prev) => ({
                              ...prev,
                              lunchProvided: e.target.value === "true",
                            }))
                          }
                          required
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </label>
                      <label>
                        Membership Benefits:
                        <textarea
                          name="membershipBenefits"
                          value={editedCard.membershipBenefits || ""}
                          onChange={handleChange}
                        />
                      </label>
                      <button type="submit">Save</button>
                      <button
                        type="button"
                        onClick={() => setEditedCard(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="programme-info">
                      <h3>{card.cardName}</h3>
                      <p><strong>Program ID:</strong> {card.programID}</p>
                      <p>{card.description}</p>
                      <p><strong>Price:</strong> ${card.programPrice || "N/A"}</p>
                      <p><strong>Original Price:</strong> ${card.originalPrice || "N/A"}</p>
                      <p><strong>Class Size:</strong> {card.classSize}</p>
                      <p><strong>Duration:</strong> {card.duration}</p>
                      <p><strong>Lunch Provided:</strong> {card.lunchProvided ? "Yes" : "No"}</p>
                      <p><strong>Membership Benefits:</strong> {card.membershipBenefits || "N/A"}</p>
                      <button onClick={() => handleEditClick(card)}>Edit</button>
                      <button onClick={() => handleDelete(card.cardID)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
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
