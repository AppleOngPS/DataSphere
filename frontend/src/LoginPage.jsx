// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import "./Auth.css";

// function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const location = useLocation(); // Access location to get the message

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         alert("Logged in successfully!");
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("userId", data.userId); // Store user ID in localStorage

//         // Now, fetch the role using the userId
//         const roleResponse = await fetch(
//           `http://localhost:3000/users/${data.userId}/role`
//         );
//         const roleData = await roleResponse.json();

//         if (roleResponse.ok) {
//           // Store userRole in localStorage
//           localStorage.setItem("userRole", roleData.role);
//         } else {
//           console.error("Error fetching user role:", roleData.message);
//         }

//         console.log("Logged in:", localStorage.getItem("isLoggedIn"));
//         console.log("User ID:", localStorage.getItem("userId"));
//         console.log("User Role:", localStorage.getItem("userRole"));

//         // Redirect to homepage
//         navigate("/");
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       alert("Failed to log in.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h1>mindsphere</h1>
//       {/* Display the redirect message if it exists */}
//       {location.state?.message && (
//         <p className="redirect-message">{location.state.message}</p>
//       )}
//       <form onSubmit={handleSubmit} className="auth-form">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Sign In</button>
//       </form>
//       <p>
//         Don’t have an account?{" "}
//         <Link to="/signup" className="toggle-link">
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// }

// export default LoginPage;
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg"; // Adjust the path based on your project structure

const Admin = () => {
  const [showProgrammes, setShowProgrammes] = useState(false); // Controls display of Manage Programmes section
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls edit form visibility
  const [selectedCard, setSelectedCard] = useState(null); // Stores the card being edited
  const [programmes, setProgrammes] = useState([]); // Stores the list of programmes
  const [cards, setCards] = useState([]); // Stores the list of cards for the selected programme
  const [selectedProgrammeID, setSelectedProgrammeID] = useState(null); // Stores selected programme ID

  // Fetch programmes list (for sidebar)
  const fetchProgrammes = async () => {
    try {
      const response = await fetch("http://localhost:3000/programs");
      const data = await response.json();
      setProgrammes(data);
    } catch (error) {
      console.error("Error fetching programmes:", error);
    }
  };

  // Fetch cards for the selected programme
  const fetchCards = async (programmeID) => {
    try {
      const response = await fetch(`http://localhost:3000/programs/${programmeID}/cards`);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  // Handle adding a new card
  const handleAddCard = async () => {
    const newCard = {
      name: "New Card", // Set default values here
      description: "Description of new card",
      programmeID: selectedProgrammeID,
    };

    try {
      const response = await fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        const createdCard = await response.json();
        setCards((prevCards) => [...prevCards, createdCard]);
      } else {
        console.error("Failed to create card");
      }
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  // Handle editing a card
  const handleEditClick = (card) => {
    setSelectedCard(card);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCard(null);
  };

  // Handle updating the card
  const handleUpdateCard = async (e) => {
    e.preventDefault();
    const updatedCard = {
      ...selectedCard,
      name: e.target.name.value,
      description: e.target.description.value,
    };

    try {
      const response = await fetch(`http://localhost:3000/cards/${selectedCard.cardID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCard),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setCards((prevCards) =>
          prevCards.map((card) => (card.cardID === selectedCard.cardID ? updatedData : card))
        );
        closeEditModal();
      } else {
        console.error("Failed to update card");
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  // Handle deleting a card
  const handleDeleteCard = async (cardID) => {
    try {
      const response = await fetch(`http://localhost:3000/cards/${cardID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCards((prevCards) => prevCards.filter((card) => card.cardID !== cardID));
      } else {
        console.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // Handle programme selection (to fetch relevant cards)
  const handleProgrammeSelect = (programmeID) => {
    setSelectedProgrammeID(programmeID);
    fetchCards(programmeID); // Fetch cards for the selected programme
  };

  useEffect(() => {
    fetchProgrammes(); // Fetch programmes when the component is mounted
  }, []);

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
            <button className="add-button" onClick={() => {}}>
              Add Programme
            </button>

            {/* Programmes Grid (card layout) */}
            <div className="programme-cards">
              {programmes.map((programme) => (
                <div
                  className="programme-card"
                  key={programme.programID}
                  onClick={() => handleProgrammeSelect(programme.programID)}
                >
                  <h3>{programme.name}</h3>
                </div>
              ))}
            </div>

            {/* Cards for selected programme */}
            {selectedProgrammeID && (
              <>
                <h2>Manage Cards for Programme {selectedProgrammeID}</h2>

                {/* Add Card Button */}
                <button className="add-button" onClick={handleAddCard}>
                  Add Card
                </button>

                {/* Cards Grid (card layout) */}
                <div className="card-grid">
                  {cards.map((card) => (
                    <div className="programme-card" key={card.cardID}>
                      <h3>{card.name}</h3>
                      <p>{card.description}</p>
                      <button onClick={() => handleEditClick(card)}>Edit</button>
                      <button onClick={() => handleDeleteCard(card.cardID)}>Delete</button>
                    </div>
                  ))}
                </div>

                {/* Modal for editing card details */}
                {isEditModalOpen && selectedCard && (
                  <div className="modal-overlay">
                    <div className="modal">
                      <h2>Edit Card</h2>
                      <form onSubmit={handleUpdateCard}>
                        <label>
                          Name:
                          <input
                            type="text"
                            name="name"
                            defaultValue={selectedCard.name}
                            required
                          />
                        </label>
                        <label>
                          Description:
                          <textarea
                            name="description"
                            defaultValue={selectedCard.description}
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
              </>
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
        <img src={adminProfilePic} alt="Admin Profile" className="profile-image" />
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
