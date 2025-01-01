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
import React, { useState, useEffect } from "react";
import "./Admin.css";
import adminProfilePic from "./assets/adminpfp.jpg";
import Mindsphere from "./assets/logo.png";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // Track active tab
  const [programmes, setProgrammes] = useState([]);
  const [editedProgramme, setEditedProgramme] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await fetch("http://localhost:3000/programs/1/cards");
        const data = await response.json();
        setProgrammes(data);
      } catch (error) {
        console.error("Error fetching programmes:", error);
      }
    };
    fetchProgrammes();
  }, []);

  const handleEditClick = (programme) => {
    setEditedProgramme({ ...programme }); // Create a copy for editing
  };

  const handleUpdateProgramme = (e) => {
    e.preventDefault();
    const updatedProgramme = {
      ...editedProgramme,
      name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value,
      duration: e.target.duration.value,
      classSize: e.target.classSize.value,
      imagePath: e.target.imagePath.value || Mindsphere,
    };

    setProgrammes((prevState) =>
      prevState.map((programme) =>
        programme.programID === updatedProgramme.programID
          ? updatedProgramme
          : programme
      )
    );

    setEditedProgramme(null); // Clear the editing state
  };

  const handleDeleteProgramme = (programmeToDelete) => {
    setProgrammes((prevState) =>
      prevState.filter(
        (programme) => programme.programID !== programmeToDelete.programID
      )
    );
  };

  const handleAddProgramme = (e) => {
    e.preventDefault();
    const newProgramme = {
      programID: Date.now(),
      name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value,
      duration: e.target.duration.value,
      classSize: e.target.classSize.value,
      imagePath: e.target.imagePath.value || Mindsphere,
    };
    setProgrammes([...programmes, newProgramme]);
    setIsAdding(false);
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActiveTab={setActiveTab} />

      <div className="content-area">
        {/* Content for Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            <h2>Dashboard Content</h2>
            {/* Your dashboard content goes here */}
          </div>
        )}

        {/* Content for Manage Programmes Tab */}
        {activeTab === "manageProgrammes" && (
          <div>
            <h2>Manage Programmes</h2>

            {/* Add Programme Section */}
            {isAdding ? (
              <div className="add-programme-section">
                <h3>Add New Programme</h3>
                <form onSubmit={handleAddProgramme}>
                  <label>
                    Name:
                    <input type="text" name="name" required />
                  </label>
                  <label>
                    Description:
                    <textarea name="description" required />
                  </label>
                  <label>
                    Price:
                    <input type="number" name="price" required />
                  </label>
                  <label>
                    Duration:
                    <input type="text" name="duration" required />
                  </label>
                  <label>
                    Class Size:
                    <input type="number" name="classSize" required />
                  </label>
                  <label>
                    Image URL:
                    <input type="text" name="imagePath" />
                  </label>
                  <button type="submit">Add</button>
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            ) : (
              <button onClick={() => setIsAdding(true)} className="add-button">
                Add Programme
              </button>
            )}

            {/* Programmes List */}
            <div className="programme-cards">
              {programmes.map((programme) => (
                <div className="programme-card" key={programme.programID}>
                  {editedProgramme && editedProgramme.programID === programme.programID ? (
                    // Inline Edit Form with all details
                    <div className="edit-form">
                      <form onSubmit={handleUpdateProgramme}>
                        <label>
                          Name:
                          <input
                            type="text"
                            name="name"
                            defaultValue={editedProgramme.name}
                            required
                          />
                        </label>
                        <label>
                          Description:
                          <textarea
                            name="description"
                            defaultValue={editedProgramme.description}
                            required
                          />
                        </label>
                        <label>
                          Price:
                          <input
                            type="number"
                            name="price"
                            defaultValue={editedProgramme.price}
                            required
                          />
                        </label>
                        <label>
                          Duration:
                          <input
                            type="text"
                            name="duration"
                            defaultValue={editedProgramme.duration}
                            required
                          />
                        </label>
                        <label>
                          Class Size:
                          <input
                            type="number"
                            name="classSize"
                            defaultValue={editedProgramme.classSize}
                            required
                          />
                        </label>
                        <label>
                          Image URL:
                          <input
                            type="text"
                            name="imagePath"
                            defaultValue={editedProgramme.imagePath}
                          />
                        </label>
                        <button type="submit">Save</button>
                        <button
                          type="button"
                          onClick={() => setEditedProgramme(null)}
                          className="cancel-button"
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  ) : (
                    // Programme Display
                    <div className="programme-info">
                      <img
                        src={programme.imagePath || Mindsphere}
                        alt={programme.name}
                      />
                      <h3>{programme.name}</h3>
                      <p>{programme.description}</p>
                      <p><strong>Price:</strong> ${programme.price}</p>
                      <p><strong>Duration:</strong> {programme.duration}</p>
                      <p><strong>Class Size:</strong> {programme.classSize}</p>
                      <button
                        onClick={() => handleEditClick(programme)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProgramme(programme)}
                        className="delete-button"
                      >
                        Delete
                      </button>
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
