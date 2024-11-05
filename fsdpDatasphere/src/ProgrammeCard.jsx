import { useNavigate } from "react-router-dom";
import "./ProgrammeCard.css";

const ProgrammeCard = ({ programme }) => {
  const navigate = useNavigate();

  const handleBuyProgramme = () => {
    // Redirect to the payment page with the program ID
    navigate(`/payment/${programme.programID}`);
  };

  return (
    <div className="program-card">
      <h3 className="program-name">{programme.name}</h3>
      <p className="program-description">{programme.description}</p>
      <p className="program-price">
        Price: ${programme.programPrice.toFixed(2)}
      </p>
      <button className="program-button" onClick={handleBuyProgramme}>
        Buy Programme
      </button>
    </div>
  );
};

export default ProgrammeCard;

// // import React from "react";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProgrammeCard.css";

// const ProgrammeCard = ({ programme }) => {
//   const navigate = useNavigate();

//   const handleBuyProgramme = () => {
//     // Redirect to the payment page with the program ID
//     navigate(`/payment/${programme.programID}`);
//   };

//   return (
//     <div className="program-card">
//       <h3 className="program-name">{programme.name}</h3>
//       <p className="program-description">{programme.description}</p>
//       <p className="program-price">
//         Price: ${programme.programPrice.toFixed(2)}
//       </p>
//       <button className="program-button" onClick={handleBuyProgramme}>
//         Buy Programme
//       </button>
//     </div>
//   );
// };

// export default ProgrammeCard;
