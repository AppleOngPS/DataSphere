import React from "react";
import Header from "./Header";
import WorkshopPage from "./WorkshopPage"; // Import new component
import "./Programmes.css";

const Programmes = () => {
  return (
    <div>
      <Header />
      <main className="programmes-container">
        <h1 className="programmes-title">Our Signature Programmes</h1>
        <PublicSpeakingWorkshop /> {/* Add the component here */}
      </main>
    </div>
  );
};

export default Programmes;

// import React, { useEffect, useState } from "react";
// import Header from "./Header"; // Import the Header component
// import ProgrammeCard from "./ProgrammeCard";
// import "./Programmes.css";

// const Programmes = () => {
//   const [programmes, setProgrammes] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/programs")
//       .then((response) => {
//         console.log("Response status:", response.status); // Log status
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => setProgrammes(data))
//       .catch((error) => console.error("Error fetching programs:", error));
//   }, []);

//   return (
//     <div>
//       <Header /> {/* Display the header at the top */}
//       <div className="programmes-container">
//         <h1>Our Signature Programmes</h1>
//         <div className="programmes-list">
//           {programmes.map((programme) => (
//             <ProgrammeCard key={programme.programID} programme={programme} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Programmes;
