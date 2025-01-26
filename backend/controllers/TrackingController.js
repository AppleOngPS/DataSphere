//initialized the tracking controller

// const sql = require("mssql");
// const dbConfig = require("../dbConfig");

// const logUserEvent = async (req, res) => {
//   console.log("Request received:", { 
//     params: req.params, 
//     body: { 
//       ...req.body, 
//       userFlow: JSON.stringify(req.body.userFlow, null, 2)
//     }
//   });

//   const { id } = req.params; 
//   const { userID, role, event, page, details, userFlow, childID, trackingID } = req.body;

//   try {
//     console.log("Connecting to the database...");
//     const pool = await sql.connect(dbConfig);

//     console.log("Checking if the event already exists...");
//     const existingEventCheck = await pool
//       .request()
//       .input("trackingID", sql.VarChar(255), trackingID)
//       .query("SELECT 1 FROM UserEvents WHERE TrackingID = @trackingID");

//     if (existingEventCheck.recordset.length > 0) {
//       console.log("Duplicate event detected, skipping insert...");
//       return res.status(409).json({ message: "Duplicate event detected" });
//     }

//     console.log("Inserting event into UserEvents table...");
//     await pool
//       .request()
//       .input("role", sql.VarChar(50), role || null)
//       .input("event", sql.VarChar(255), event)
//       .input("page", sql.VarChar(255), page)
//       .input("details", sql.Text, details || null)
//       .input("userID", sql.Int, userID)
//       .input("childID", sql.Int, childID || null)
//       .input("userFlow", sql.Text, JSON.stringify(userFlow || []))
//       .input("trackingID", sql.VarChar(255), trackingID) // Use trackingID for uniqueness
//       .query(`
//         INSERT INTO UserEvents (Role, Event, Page, Details, userID, childID, userFlow, TrackingID)
//         VALUES (@role, @event, @page, @details, @userID, @childID, @userFlow, @trackingID)
//       `);

//     console.log("Event logged successfully for userID:", userID);
//     res.status(201).json({ message: "Event logged successfully" });
//   } catch (error) {
//     console.error("Error logging user event:", error);
//     res.status(500).json({ message: "Error logging user event" });
//   }
// };

// module.exports = { logUserEvent };

// const sql = require("mssql");
// const dbConfig = require("../dbConfig");

// // Log user events into the database
// const logUserEvent = async (req, res) => {
//   const { userID, role, event, page, details, userFlow, childID, trackingID } = req.body;

//   try {
//     const pool = await sql.connect(dbConfig);

//     // Check if the event already exists
//     const existingEventCheck = await pool
//       .request()
//       .input("trackingID", sql.VarChar(255), trackingID)
//       .query("SELECT 1 FROM UserEvents WHERE TrackingID = @trackingID");

//     if (existingEventCheck.recordset.length > 0) {
//       return res.status(409).json({ message: "Duplicate event detected" });
//     }

//     // Insert the new event into the database
//     await pool
//       .request()
//       .input("role", sql.VarChar(50), role || null)
//       .input("event", sql.VarChar(255), event)
//       .input("page", sql.VarChar(255), page)
//       .input("details", sql.Text, details || null)
//       .input("userID", sql.Int, userID)
//       .input("childID", sql.Int, childID || null)
//       .input("userFlow", sql.Text, JSON.stringify(userFlow || []))
//       .input("trackingID", sql.VarChar(255), trackingID)
//       .query(`
//         INSERT INTO UserEvents (Role, Event, Page, Details, userID, childID, userFlow, TrackingID)
//         VALUES (@role, @event, @page, @details, @userID, @childID, @userFlow, @trackingID)
//       `);

//     res.status(201).json({ message: "Event logged successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging user event", error: error.message });
//   }
// };

// // Fetch tracking data from the database
// const getTrackingData = async (req, res) => {
//   try {
//     const pool = await sql.connect(dbConfig);
//     const data = await pool.request().query("SELECT * FROM UserEvents");
//     res.status(200).json(data.recordset);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tracking data", error: error.message });
//   }
// };

// module.exports = { logUserEvent, getTrackingData };

const sql = require("mssql");
const dbConfig = require("../dbConfig");

// Log user events into the database
const logUserEvent = async (req, res) => {
  const { userID, role, event, page, details, userFlow, childID, trackingID } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    // Check if the event already exists
    const existingEventCheck = await pool
      .request()
      .input("trackingID", sql.VarChar(255), trackingID)
      .query("SELECT 1 FROM UserEvents WHERE TrackingID = @trackingID");

    if (existingEventCheck.recordset.length > 0) {
      return res.status(409).json({ message: "Duplicate event detected" });
    }

    // Insert the new event into the database
    await pool
      .request()
      .input("role", sql.VarChar(50), role || null)
      .input("event", sql.VarChar(255), event)
      .input("page", sql.VarChar(255), page)
      .input("details", sql.Text, details || null)
      .input("userID", sql.Int, userID)
      .input("childID", sql.Int, childID || null)
      .input("userFlow", sql.Text, JSON.stringify(userFlow || []))
      .input("trackingID", sql.VarChar(255), trackingID)
      .query(`
        INSERT INTO UserEvents (Role, Event, Page, Details, userID, childID, userFlow, TrackingID)
        VALUES (@role, @event, @page, @details, @userID, @childID, @userFlow, @trackingID)
      `);

    res.status(201).json({ message: "Event logged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging user event", error: error.message });
  }
};

// Fetch enriched tracking data from the database
const getTrackingData = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    const data = await pool
      .request()
      .query(`
        SELECT 
          ue.ID AS EventID,
          ue.Role,
          ue.Event,
          ue.Page,
          ue.Details,
          ue.CreatedAt,
          e.userName AS Username,
          e.email AS Email,
          e.interest AS Interest
        FROM 
          UserEvents ue
        INNER JOIN 
          endUser e ON ue.userID = e.userID
      `);

    res.status(200).json(data.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tracking data", error: error.message });
  }
};

module.exports = { logUserEvent, getTrackingData };
