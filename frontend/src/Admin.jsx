
// import React, { useState } from "react";
// import "./Admin.css";
// import adminProfilePic from "./assets/adminpfp.jpg"; // Adjust the path based on your project structure
// import programmesData from "./Programmes"; // Import the programmes data

// const Admin = () => {
//   const [showProgrammes, setShowProgrammes] = useState(false); // Controls display of Manage Programmes section
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls edit form visibility
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Controls add form visibility
//   const [selectedProgramme, setSelectedProgramme] = useState(null); // Stores the programme being edited
//   const [programmes, setProgrammes] = useState(programmesData); // Stores the list of programmes

//   // Function to open the edit form with the selected programme
//   const handleEditClick = (programme) => {
//     setSelectedProgramme(programme);
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

//   // Function to handle adding a new programme
//   const handleAddProgramme = (e) => {
//     e.preventDefault();
//     const newProgramme = {
//       name: e.target.name.value,
//       description: e.target.description.value,
//     };
//     setProgrammes([...programmes, newProgramme]);
//     closeAddModal();
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
//               Add Programme
//             </button>

//             {/* Programmes Table */}
//             <table className="programmes-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {programmes.map((programme, index) => (
//                   <tr key={index}>
//                     <td>{programme.name}</td>
//                     <td>{programme.description}</td>
//                     <td>
//                       <button onClick={() => handleEditClick(programme)}>
//                         Edit
//                       </button>
//                       <button>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Modal for editing programme details */}
//             {isEditModalOpen && selectedProgramme && (
//               <div className="modal-overlay">
//                 <div className="modal">
//                   <h2>Edit Programme</h2>
//                   <form>
//                     <label>
//                       Name:
//                       <input
//                         type="text"
//                         value={selectedProgramme.name}
//                         onChange={(e) =>
//                           setSelectedProgramme({
//                             ...selectedProgramme,
//                             name: e.target.value,
//                           })
//                         }
//                       />
//                     </label>
//                     <label>
//                       Description:
//                       <textarea
//                         value={selectedProgramme.description}
//                         onChange={(e) =>
//                           setSelectedProgramme({
//                             ...selectedProgramme,
//                             description: e.target.value,
//                           })
//                         }
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

//             {/* Modal for adding a new programme */}
//             {isAddModalOpen && (
//               <div className="modal-overlay">
//                 <div className="modal">
//                   <h2>Add Programme</h2>
//                   <form onSubmit={handleAddProgramme}>
//                     <label>
//                       Name:
//                       <input type="text" name="name" required />
//                     </label>
//                     <label>
//                       Description:
//                       <textarea name="description" required />
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


import React, { useState } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg"; // Adjust the path based on your project structure
import programmesData from "./Programmes"; // Import the programmes data

const Admin = () => {
  const [showProgrammes, setShowProgrammes] = useState(false); // Controls display of Manage Programmes section
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls edit form visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Controls add form visibility
  const [selectedProgramme, setSelectedProgramme] = useState(null); // Stores the programme being edited
  const [programmes, setProgrammes] = useState(programmesData); // Stores the list of programmes

  // Function to open the edit form with the selected programme
  const handleEditClick = (programme) => {
    setSelectedProgramme(programme);
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

  // Function to handle adding a new programme
  const handleAddProgramme = (e) => {
    e.preventDefault();
    const newProgramme = {
      name: e.target.name.value,
      description: e.target.description.value,
    };
    setProgrammes([...programmes, newProgramme]);
    closeAddModal();
  };

  // Function to handle editing an existing programme
  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Ensure selectedProgramme and its id are valid
    if (!selectedProgramme || !selectedProgramme.id) {
      console.error("Selected programme ID is missing.");
      return;
    }

    const updatedProgramme = {
      name: e.target.name.value,
      description: e.target.description.value,
    };

    // Send the updated programme data to the backend (PUT request)
    fetch(`http://localhost:3000/programs/${selectedProgramme.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProgramme), // Only send name and description
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.id) {
          // Update the local state with the updated programme
          const updatedProgrammes = programmes.map((programme) =>
            programme.id === data.id ? data : programme
          );
          setProgrammes(updatedProgrammes); // Update the programmes list in state
          closeEditModal(); // Close the edit modal
        } else {
          console.error("Failed to update programme. Invalid response:", data);
        }
      })
      .catch((error) => console.error("Error updating programme:", error));
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
              Add Programme
            </button>

            {/* Programmes Table */}
            <table className="programmes-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {programmes.map((programme, index) => (
                  <tr key={index}>
                    <td>{programme.name}</td>
                    <td>{programme.description}</td>
                    <td>
                      <button onClick={() => handleEditClick(programme)}>
                        Edit
                      </button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal for editing programme details */}
            {isEditModalOpen && selectedProgramme && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Edit Programme</h2>
                  <form onSubmit={handleEditSubmit}>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        defaultValue={selectedProgramme.name}
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
                    <button type="submit">Save</button>
                    <button type="button" onClick={closeEditModal}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Modal for adding a new programme */}
            {isAddModalOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Add Programme</h2>
                  <form onSubmit={handleAddProgramme}>
                    <label>
                      Name:
                      <input type="text" name="name" required />
                    </label>
                    <label>
                      Description:
                      <textarea name="description" required />
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
