// const ProgrammeCard = require("../models/ProgrammeCard");

// const getAllCardsByProgramId = async (req, res) => {
//   try {
//     const cards = await ProgrammeCard.getCardsByProgramId(req.params.programID);
//     res.json(cards);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving programme cards" });
//   }
// };

// const getAllProgrammeCards = async (req, res) => {
//   try {
//     // Call the static method to fetch all ProgrammeCards
//     const programmeCards = await ProgrammeCard.getAllProgrammeCards();
//     res.json(programmeCards); // Respond with the retrieved records
//   } catch (error) {
//     console.error("Error retrieving programme cards:", error);
//     res.status(500).json({ message: "Error retrieving programme cards" });
//   }
// };


// const getProgrammeCardById = async (req, res) => {
//   try {
//     const card = await ProgrammeCard.getProgrammeCardById(req.params.cardID);
//     if (!card)
//       return res.status(404).json({ message: "Programme card not found" });
//     res.json(card);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving programme card" });
//   }
// };

// // const createProgrammeCard = async (req, res) => {
// //   try {
// //     const cardID = await ProgrammeCard.createProgrammeCard(req.body);
// //     res.status(201).json({ cardID });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Error creating programme card" });
// //   }
// // };
// // Create a new program
// const createProgrammeCard = async (req, res) => {
//   try {
//     const cardID = await ProgrammeCard.createProgrammeCard(req.body);
//     res.status(201).json({ cardID, message: "Programme card created successfully" });
//   } catch (error) {
//     console.error("Error creating programme card:", error);
//     res.status(500).json({ message: `Error creating programme card: ${error.message}` });
//   }
// };


// const updateProgrammeCard = async (req, res) => {
//   const { cardID } = req.params;  // Get cardID from URL params
//   const updatedData = req.body;   // Get the updated data from the body of the request

//   console.log("Updating cardID:", cardID);  // Debugging: log the cardID to make sure it's correct
//   console.log("Updated data:", updatedData);  // Debugging: log the data to make sure it's correct

//   // Validation - Ensure the required fields are present
//   if (!updatedData.cardName || !updatedData.programPrice || !updatedData.duration || !updatedData.classSize) {
//     return res.status(400).json({ message: "Required fields are missing: cardName, programPrice, duration, classSize" });
//   }

//   try {
//     // Call the model function to update the ProgrammeCard
//     await ProgrammeCard.updateProgrammeCard(cardID, updatedData);

//     // Send a success response after updating the database
//     res.status(200).json({ message: "Programme card updated successfully" });
//   } catch (error) {
//     console.error('Error updating programme card:', error);
//     res.status(500).json({ message: "Error updating programme card", error: error.message });
//   }
// };

// const deleteProgrammeCard = async (req, res) => {
//   const cardID = req.params.cardID;  // Get cardID from the URL parameter

//   try {
//     const result = await ProgrammeCard.deleteProgrammeCard(cardID);

//     // Send success response
//     res.json(result);
//   } catch (error) {
//     console.error("Error deleting programme card and related records:", error);
//     res.status(500).json({ message: "Error deleting programme card", error: error.message });
//   }
// };

// module.exports = {
//   getAllCardsByProgramId,
//   getProgrammeCardById,
//   getAllProgrammeCards,
//   createProgrammeCard,
//   updateProgrammeCard,
//   deleteProgrammeCard,
// };
const ProgrammeCard = require("../models/ProgrammeCard");

const getAllCardsByProgramId = async (req, res) => {
  try {
    const cards = await ProgrammeCard.getCardsByProgramId(req.params.programID);
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving programme cards" });
  }
};

const getAllProgrammeCards = async (req, res) => {
  try {
    // Call the static method to fetch all ProgrammeCards
    const programmeCards = await ProgrammeCard.getAllProgrammeCards();
    res.json(programmeCards); // Respond with the retrieved records
  } catch (error) {
    console.error("Error retrieving programme cards:", error);
    res.status(500).json({ message: "Error retrieving programme cards" });
  }
};


const getProgrammeCardById = async (req, res) => {
  try {
    const card = await ProgrammeCard.getProgrammeCardById(req.params.cardID);
    if (!card)
      return res.status(404).json({ message: "Programme card not found" });
    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving programme card" });
  }
};

// const createProgrammeCard = async (req, res) => {
//   try {
//     const cardID = await ProgrammeCard.createProgrammeCard(req.body);
//     res.status(201).json({ cardID });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating programme card" });
//   }
// };
// Create a new program
const createProgrammeCard = async (req, res) => {
  try {
    const cardID = await ProgrammeCard.createProgrammeCard(req.body);
    res.status(201).json({ cardID, message: "Programme card created successfully" });
  } catch (error) {
    console.error("Error creating programme card:", error);
    res.status(500).json({ message: `Error creating programme card: ${error.message}` });
  }
};


// const updateProgrammeCard = async (req, res) => {
//   try {
//     await ProgrammeCard.updateProgrammeCard(req.params.cardID, req.body);
//     res.json({ message: "Programme card updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating programme card" });
//   }
// };
const updateProgrammeCard = async (req, res) => {
  const { cardID } = req.params;  // Get cardID from URL params
  const updatedData = req.body;   // Get the updated data from the body of the request

  console.log("Updating cardID:", cardID);  // Debugging: log the cardID to make sure it's correct
  console.log("Updated data:", updatedData);  // Debugging: log the data to make sure it's correct

  // Validation - Ensure the required fields are present
  if (!updatedData.cardName || !updatedData.programPrice || !updatedData.duration || !updatedData.classSize) {
    return res.status(400).json({ message: "Required fields are missing: cardName, programPrice, duration, classSize" });
  }

  try {
    // Call the model function to update the ProgrammeCard
    await ProgrammeCard.updateProgrammeCard(cardID, updatedData);

    // Send a success response after updating the database
    res.status(200).json({ message: "Programme card updated successfully" });
  } catch (error) {
    console.error('Error updating programme card:', error);
    res.status(500).json({ message: "Error updating programme card", error: error.message });
  }
};

const deleteProgrammeCard = async (req, res) => {
  const cardID = req.params.cardID;  // Get cardID from the URL parameter

  try {
    const result = await ProgrammeCard.deleteProgrammeCard(cardID);

    // Send success response
    res.json(result);
  } catch (error) {
    console.error("Error deleting programme card and related records:", error);
    res.status(500).json({ message: "Error deleting programme card", error: error.message });
  }
};

module.exports = {
  getAllCardsByProgramId,
  getProgrammeCardById,
  getAllProgrammeCards,
  createProgrammeCard,
  updateProgrammeCard,
  deleteProgrammeCard,
};