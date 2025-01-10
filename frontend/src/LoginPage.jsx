import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
import logo from "./assets/logo.png"; // Import the logo file

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Logged in successfully!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.userId);

        // Fetch the role using the userId
        const roleResponse = await fetch(
          `http://localhost:3000/users/${data.userId}/role`
        );
        const roleData = await roleResponse.json();

        if (roleResponse.ok) {
          // Store userRole in localStorage
          localStorage.setItem("userRole", roleData.role);
        } else {
          console.error("Error fetching user role:", roleData.message);
        }

        console.log("Logged in:", localStorage.getItem("isLoggedIn"));
        console.log("User ID:", localStorage.getItem("userId"));
        console.log("User Role:", localStorage.getItem("userRole"));

        navigate("/"); // Redirect to homepage
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in.");
    }
  };

  return (
    <div className="auth-page">
      {/* Left section with the logo */}
      <div className="auth-left">
        <img src={logo} alt="Mindsphere Logo" className="logo" />
        <p className="tagline">
          Learn Impactful Speaking Skills <br />
          From Seasoned Speakers
        </p>
      </div>

      {/* Right section with the form */}
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Log in</h2>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            Log in
          </button>
          <div className="or-section">
            <span></span>
          </div>
          <Link to="/signup">
            <button type="button" className="signup-button">
              Create new account
            </button>
          </Link>
        </form>
        <p className="footer-text">Where learning meets achievement.</p>
      </div>
    </div>
  );
}

export default LoginPage;


// export default LoginPage;
// eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from "react";
// import "./Admin.css";
// import adminProfilePic from "./assets/adminpfp.jpg"; // Adjust the path based on your project structure

// const Admin = () => {
//   const [showProgrammes, setShowProgrammes] = useState(false); // Controls display of Manage Programmes section
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls edit form visibility
//   const [selectedCard, setSelectedCard] = useState(null); // Stores the card being edited
//   const [programmes, setProgrammes] = useState([]); // Stores the list of programmes
//   const [cards, setCards] = useState([]); // Stores the list of cards for the selected programme
//   const [selectedProgrammeID, setSelectedProgrammeID] = useState(null); // Stores selected programme ID

//   // Fetch programmes list (for sidebar)
//   const fetchProgrammes = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/programs");
//       const data = await response.json();
//       setProgrammes(data);
//     } catch (error) {
//       console.error("Error fetching programmes:", error);
//     }
//   };

//   // Fetch cards for the selected programme
//   const fetchCards = async (programmeID) => {
//     try {
//       const response = await fetch(`http://localhost:3000/programs/${programmeID}/cards`);
//       const data = await response.json();
//       setCards(data);
//     } catch (error) {
//       console.error("Error fetching cards:", error);
//     }
//   };

//   // Handle adding a new card
//   const handleAddCard = async () => {
//     const newCard = {
//       name: "New Card", // Set default values here
//       description: "Description of new card",
//       programmeID: selectedProgrammeID,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/cards", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCard),
//       });

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
//         console.error("Failed to delete card");
//       }
//     } catch (error) {
//       console.error("Error deleting card:", error);
//     }
//   };

//   // Handle programme selection (to fetch relevant cards)
//   const handleProgrammeSelect = (programmeID) => {
//     setSelectedProgrammeID(programmeID);
//     fetchCards(programmeID); // Fetch cards for the selected programme
//   };

//   useEffect(() => {
//     fetchProgrammes(); // Fetch programmes when the component is mounted
//   }, []);

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
// };

// export default Admin;
