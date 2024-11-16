

// import React, { useState, useEffect } from "react";
// import "./Admin.css";
// import adminProfilePic from "./assets/adminpfp.jpg"; // Adjust the path based on your project structure

// const Admin = () => {
//   const [showProgrammes, setShowProgrammes] = useState(false); // Controls display of Manage Programmes section
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls edit form visibility
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Controls add form visibility
//   const [selectedProgramme, setSelectedProgramme] = useState(null); // Stores the programme being edited
//   const [cards, setCards] = useState([]); // Stores the list of programme cards

//   const programID = 1; // Assuming you want to retrieve data for program with ID 1

//   // Fetch programme cards when the component mounts
//   useEffect(() => {
//     fetchCards();
//   }, []);

//   const fetchCards = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/programs/${programID}/cards`);
//       const data = await response.json();
//       setCards(data);
//     } catch (error) {
//       console.error("Error fetching programme cards:", error);
//     }
//   };

//   // Function to open the edit form with the selected card
//   const handleEditClick = (card) => {
//     setSelectedProgramme(card);
//     setIsEditModalOpen(true);
//   };

//   // Function to close the edit form
//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setSelectedProgramme(null);
//   };

//   // Function to open the add form
//   const handleAddClick = () => {
//     setIsAddModalOpen(true);
//   };

//   // Function to close the add form
//   const closeAddModal = () => {
//     setIsAddModalOpen(false);
//   };

//   // Function to handle adding a new programme card
//   const handleAddCard = (e) => {
//     e.preventDefault();
//     const newCard = {
//       cardID: Date.now(), // Automatically generate a unique ID for new card
//       programID: programID,
//       cardName: e.target.cardName.value,
//       description: e.target.description.value,
//       programPrice: e.target.programPrice.value,
//       originalPrice: e.target.originalPrice.value,
//       classSize: e.target.classSize.value,
//       duration: e.target.duration.value,
//       lunchProvided: e.target.lunchProvided.checked,
//       membershipBenefits: e.target.membershipBenefits.value,
//     };
//     setCards([...cards, newCard]);
//     closeAddModal();

//     // Send POST request to add the new card to the backend
//     fetch("http://localhost:3000/cards", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newCard),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.cardID) {
//           setCards([...cards, data]);
//         }
//       })
//       .catch((error) => console.error("Error adding card:", error));
//   };

//   // Function to handle editing an existing card
//   const handleEditSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedProgramme || !selectedProgramme.cardID) {
//       console.error("Selected card ID is missing.");
//       return;
//     }

//     const updatedCard = {
//       cardID: selectedProgramme.cardID,
//       programID: e.target.programID.value,
//       cardName: e.target.cardName.value,
//       description: e.target.description.value,
//       programPrice: e.target.programPrice.value,
//       originalPrice: e.target.originalPrice.value,
//       classSize: e.target.classSize.value,
//       duration: e.target.duration.value,
//       lunchProvided: e.target.lunchProvided.checked,
//       membershipBenefits: e.target.membershipBenefits.value,
//     };

//     fetch(`http://localhost:3000/cards/${selectedProgramme.cardID}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedCard),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.cardID) {
//           const updatedCards = cards.map((card) =>
//             card.cardID === data.cardID ? data : card
//           );
//           setCards(updatedCards);
//           closeEditModal();
//         } else {
//           console.error("Failed to update card. Invalid response:", data);
//         }
//       })
//       .catch((error) => console.error("Error updating card:", error));
//   };

//   // Function to handle deleting a card
//   const handleDeleteClick = (cardID) => {
//     fetch(`http://localhost:3000/cards/${cardID}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.ok) {
//           setCards(cards.filter((card) => card.cardID !== cardID));
//         }
//       })
//       .catch((error) => console.error("Error deleting card:", error));
//   };

//   return (
//     <div className="admin-dashboard">
//       <Sidebar
//         onDashboardClick={() => setShowProgrammes(false)}
//         onManageProgrammesClick={() => setShowProgrammes(true)}
//       />
//       <div className="content-area">
//         {showProgrammes ? (
//           <>
//             <h1>Manage Programmes</h1>

//             {/* Add Programme Button */}
//             <button className="add-button" onClick={handleAddClick}>
//               Add Programme Card
//             </button>

//             {/* Cards Table */}
//             <table className="programmes-table">
//               <thead>
//                 <tr>
//                   <th>Card Name</th>
//                   <th>Description</th>
//                   <th>Program Price</th>
//                   <th>Original Price</th>
//                   <th>Class Size</th>
//                   <th>Duration</th>
//                   <th>Lunch Provided</th>
//                   <th>Membership Benefits</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cards.map((card, index) => (
//                   <tr key={index}>
//                     <td>{card.cardName}</td>
//                     <td>{card.description}</td>
//                     <td>{card.programPrice}</td>
//                     <td>{card.originalPrice}</td>
//                     <td>{card.classSize}</td>
//                     <td>{card.duration}</td>
//                     <td>{card.lunchProvided ? "Yes" : "No"}</td>
//                     <td>{card.membershipBenefits}</td>
//                     <td>
//                       <button onClick={() => handleEditClick(card)}>Edit</button>
//                       <button onClick={() => handleDeleteClick(card.cardID)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Modal for editing card details */}
//             {isEditModalOpen && selectedProgramme && (
//               <div className="modal-overlay">
//                 <div className="modal">
//                   <h2>Edit Programme Card</h2>
//                   <form onSubmit={handleEditSubmit}>
//                     <label>
//                       Program ID:
//                       <input
//                         type="text"
//                         name="programID"
//                         defaultValue={selectedProgramme.programID}
//                         required
//                       />
//                     </label>
//                     <label>
//                       Card Name:
//                       <input
//                         type="text"
//                         name="cardName"
//                         defaultValue={selectedProgramme.cardName}
//                         required
//                       />
//                     </label>
//                     <label>
//                       Description:
//                       <textarea
//                         name="description"
//                         defaultValue={selectedProgramme.description}
//                         required
//                       />
//                     </label>
//                     <label>
//                       Program Price:
//                       <input
//                         type="number"
//                         name="programPrice"
//                         defaultValue={selectedProgramme.programPrice}
//                         required
//                       />
//                     </label>
//                     <label>
//                       Original Price:
//                       <input
//                         type="number"
//                         name="originalPrice"
//                         defaultValue={selectedProgramme.originalPrice}
//                         required
//                       />
//                     </label>
//                     <label>
//                       Class Size:
//                       <input
//                         type="text"
//                         name="classSize"
//                         defaultValue={selectedProgramme.classSize}
//                         required
//                       />
//                     </label>
//                     <label>
//                       Duration:
//                       <input
//                         type="text"
//                         name="duration"
//                         defaultValue={selectedProgramme.duration}
//                         required
//                       />
//                     </label>
//                     <label>
//                       Lunch Provided:
//                       <input
//                         type="checkbox"
//                         name="lunchProvided"
//                         defaultChecked={selectedProgramme.lunchProvided}
//                       />
//                     </label>
//                     <label>
//                       Membership Benefits:
//                       <textarea
//                         name="membershipBenefits"
//                         defaultValue={selectedProgramme.membershipBenefits}
//                         required
//                       />
//                     </label>
//                     <button type="submit">Save</button>
//                     <button type="button" onClick={closeEditModal}>
//                       Cancel
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             )}

//             {/* Modal for adding a new programme card */}
//             {isAddModalOpen && (
//               <div className="modal-overlay">
//                 <div className="modal">
//                   <h2>Add Programme Card</h2>
//                   <form onSubmit={handleAddCard}>
//                     <label>
//                       Card Name:
//                       <input type="text" name="cardName" required />
//                     </label>
//                     <label>
//                       Description:
//                       <textarea name="description" required />
//                     </label>
//                     <label>
//                       Program Price:
//                       <input type="number" name="programPrice" required />
//                     </label>
//                     <label>
//                       Original Price:
//                       <input type="number" name="originalPrice" required />
//                     </label>
//                     <label>
//                       Class Size:
//                       <input type="text" name="classSize" required />
//                     </label>
//                     <label>
//                       Duration:
//                       <input type="text" name="duration" required />
//                     </label>
//                     <label>
//                       Lunch Provided:
//                       <input type="checkbox" name="lunchProvided" />
//                     </label>
//                     <label>
//                       Membership Benefits:
//                       <textarea name="membershipBenefits" required />
//                     </label>
//                     <button type="submit">Add</button>
//                     <button type="button" onClick={closeAddModal}>
//                       Cancel
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <h1>Welcome to the Admin Dashboard</h1>
//         )}
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ onDashboardClick, onManageProgrammesClick }) => {
//   return (
//     <div className="sidebar">
//       <div className="profile">
//         <img
//           src={adminProfilePic}
//           alt="Admin Profile"
//           className="profile-image"
//         />
//         <p className="profile-name">Name</p>
//       </div>
//       <nav className="nav-buttons">
//         <button className="nav-button" onClick={onDashboardClick}>
//           Dashboard
//         </button>
//         <button className="nav-button" onClick={onManageProgrammesClick}>
//           Manage Programmes
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Admin;

import React, { useState, useEffect } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg"; // Adjust the path based on your project structure

const Admin = () => {
  const [showProgrammes, setShowProgrammes] = useState(false); // Controls display of Manage Programmes section
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls edit form visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Controls add form visibility
  const [selectedProgramme, setSelectedProgramme] = useState(null); // Stores the programme being edited
  const [cards, setCards] = useState([]); // Stores the list of programme cards

  const programID = 1; // Assuming you want to retrieve data for program with ID 1

  // Fetch programme cards when the component mounts
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch(`http://localhost:3000/programs/${programID}/cards`);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching programme cards:", error);
    }
  };

  // Function to open the edit form with the selected card
  const handleEditClick = (card) => {
    setSelectedProgramme(card);
    setIsEditModalOpen(true);
  };

  // Function to close the edit form
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProgramme(null);
  };

  // Function to open the add form
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  // Function to close the add form
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Function to handle adding a new programme card
  const handleAddCard = (e) => {
    e.preventDefault();
    const newCard = {
      cardID: Date.now(), // Automatically generate a unique ID for new card
      programID: programID,
      cardName: e.target.cardName.value,
      description: e.target.description.value,
      programPrice: e.target.programPrice.value,
      originalPrice: e.target.originalPrice.value,
      classSize: e.target.classSize.value,
      duration: e.target.duration.value,
      lunchProvided: e.target.lunchProvided.checked,
      membershipBenefits: e.target.membershipBenefits.value,
    };

    // Optimistically update the UI before making the API call
    setCards([...cards, newCard]);
    closeAddModal();

    // Send POST request to add the new card to the backend
    fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.cardID) {
          // Refetch the cards or update the state with the new card
          fetchCards();
        }
      })
      .catch((error) => console.error("Error adding card:", error));
  };

  // Function to handle editing an existing card
  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!selectedProgramme || !selectedProgramme.cardID) {
      console.error("Selected card ID is missing.");
      return;
    }

    const updatedCard = {
      cardID: selectedProgramme.cardID,
      programID: e.target.programID.value,
      cardName: e.target.cardName.value,
      description: e.target.description.value,
      programPrice: e.target.programPrice.value,
      originalPrice: e.target.originalPrice.value,
      classSize: e.target.classSize.value,
      duration: e.target.duration.value,
      lunchProvided: e.target.lunchProvided.checked,
      membershipBenefits: e.target.membershipBenefits.value,
    };

    fetch(`http://localhost:3000/cards/${selectedProgramme.cardID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.cardID) {
          const updatedCards = cards.map((card) =>
            card.cardID === data.cardID ? data : card
          );
          setCards(updatedCards);
          closeEditModal();
        } else {
          console.error("Failed to update card. Invalid response:", data);
        }
      })
      .catch((error) => console.error("Error updating card:", error));
  };

  // Function to handle deleting a card
  const handleDeleteClick = (cardID) => {
    fetch(`http://localhost:3000/cards/${cardID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCards(cards.filter((card) => card.cardID !== cardID));
        }
      })
      .catch((error) => console.error("Error deleting card:", error));
  };

  return (
    <div className="admin-dashboard">
      <Sidebar
        onDashboardClick={() => setShowProgrammes(false)}
        onManageProgrammesClick={() => setShowProgrammes(true)}
      />
      <div className="content-area">
        {showProgrammes ? (
          <>
            <h1>Manage Programmes</h1>

            {/* Add Programme Button */}
            <button className="add-button" onClick={handleAddClick}>
              Add Programme Card
            </button>

            {/* Cards Table */}
            <table className="programmes-table">
              <thead>
                <tr>
                  <th>Card Name</th>
                  <th>Description</th>
                  <th>Program Price</th>
                  <th>Original Price</th>
                  <th>Class Size</th>
                  <th>Duration</th>
                  <th>Lunch Provided</th>
                  <th>Membership Benefits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, index) => (
                  <tr key={index}>
                    <td>{card.cardName}</td>
                    <td>{card.description}</td>
                    <td>{card.programPrice}</td>
                    <td>{card.originalPrice}</td>
                    <td>{card.classSize}</td>
                    <td>{card.duration}</td>
                    <td>{card.lunchProvided ? "Yes" : "No"}</td>
                    <td>{card.membershipBenefits}</td>
                    <td>
                      <button onClick={() => handleEditClick(card)}>Edit</button>
                      <button onClick={() => handleDeleteClick(card.cardID)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal for editing card details */}
            {isEditModalOpen && selectedProgramme && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Edit Programme Card</h2>
                  <form onSubmit={handleEditSubmit}>
                    <label>
                      Program ID:
                      <input
                        type="text"
                        name="programID"
                        defaultValue={selectedProgramme.programID}
                        required
                      />
                    </label>
                    <label>
                      Card Name:
                      <input
                        type="text"
                        name="cardName"
                        defaultValue={selectedProgramme.cardName}
                        required
                      />
                    </label>
                    <label>
                      Description:
                      <textarea
                        name="description"
                        defaultValue={selectedProgramme.description}
                        required
                      />
                    </label>
                    <label>
                      Program Price:
                      <input
                        type="number"
                        name="programPrice"
                        defaultValue={selectedProgramme.programPrice}
                        required
                      />
                    </label>
                    <label>
                      Original Price:
                      <input
                        type="number"
                        name="originalPrice"
                        defaultValue={selectedProgramme.originalPrice}
                        required
                      />
                    </label>
                    <label>
                      Class Size:
                      <input
                        type="text"
                        name="classSize"
                        defaultValue={selectedProgramme.classSize}
                        required
                      />
                    </label>
                    <label>
                      Duration:
                      <input
                        type="text"
                        name="duration"
                        defaultValue={selectedProgramme.duration}
                        required
                      />
                    </label>
                    <label>
                      Lunch Provided:
                      <input
                        type="checkbox"
                        name="lunchProvided"
                        defaultChecked={selectedProgramme.lunchProvided}
                      />
                    </label>
                    <label>
                      Membership Benefits:
                      <textarea
                        name="membershipBenefits"
                        defaultValue={selectedProgramme.membershipBenefits}
                        required
                      />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={closeEditModal}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Modal for adding a new programme card */}
            {isAddModalOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Add Programme Card</h2>
                  <form onSubmit={handleAddCard}>
                    <label>
                      Card Name:
                      <input type="text" name="cardName" required />
                    </label>
                    <label>
                      Description:
                      <textarea name="description" required />
                    </label>
                    <label>
                      Program Price:
                      <input type="number" name="programPrice" required />
                    </label>
                    <label>
                      Original Price:
                      <input type="number" name="originalPrice" required />
                    </label>
                    <label>
                      Class Size:
                      <input type="text" name="classSize" required />
                    </label>
                    <label>
                      Duration:
                      <input type="text" name="duration" required />
                    </label>
                    <label>
                      Lunch Provided:
                      <input type="checkbox" name="lunchProvided" />
                    </label>
                    <label>
                      Membership Benefits:
                      <textarea name="membershipBenefits" required />
                    </label>
                    <button type="submit">Add</button>
                    <button type="button" onClick={closeAddModal}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <h1>Welcome to the Admin Dashboard</h1>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ onDashboardClick, onManageProgrammesClick }) => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src={adminProfilePic}
          alt="Admin Profile"
          className="profile-image"
        />
        <p className="profile-name">Name</p>
      </div>
      <nav className="nav-buttons">
        <button className="nav-button" onClick={onDashboardClick}>
          Dashboard
        </button>
        <button className="nav-button" onClick={onManageProgrammesClick}>
          Manage Programmes
        </button>
      </nav>
    </div>
  );
};

export default Admin;
