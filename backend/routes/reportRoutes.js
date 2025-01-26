// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const csv = require("csv-parser");
// const QuickChart = require("quickchart-js");

// const router = express.Router();

// // Multer setup for CSV uploads
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             const uploadPath = path.join(__dirname, "../uploads");
//             if (!fs.existsSync(uploadPath)) {
//                 fs.mkdirSync(uploadPath, { recursive: true }); // Create 'uploads' directory if it doesn't exist
//             }
//             cb(null, uploadPath); // Save files in the 'uploads' directory
//         },
//         filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Ensure unique filenames
//     }),
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === "text/csv") cb(null, true);
//         else cb(new Error("Only CSV files are allowed!")); // Restrict to CSV files
//     },
// });

// // Analyze revenue and generate insights
// async function analyzeRevenue(filePath) {
//     return new Promise((resolve, reject) => {
//         const data = [];
//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on("data", (row) => {
//                 data.push(row);
//             })
//             .on("end", () => {
//                 const monthlyRevenue = data.reduce((acc, record) => {
//                     const month = record.month;
//                     const revenue = parseFloat(record.revenue || 0);
//                     acc[month] = (acc[month] || 0) + revenue;
//                     return acc;
//                 }, {});

//                 const totalRevenue = Object.values(monthlyRevenue).reduce((a, b) => a + b, 0);
//                 resolve({ monthlyRevenue, totalRevenue });
//             })
//             .on("error", (err) => reject(err));
//     });
// }

// // Generate charts using QuickChart
// async function generateChart(data, chartTitle) {
//     const chart = new QuickChart();
//     chart.setConfig({
//         type: "bar",
//         data: {
//             labels: Object.keys(data),
//             datasets: [
//                 {
//                     label: chartTitle,
//                     data: Object.values(data),
//                     backgroundColor: "rgba(75, 192, 192, 0.2)",
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     borderWidth: 1,
//                 },
//             ],
//         },
//         options: {
//             scales: {
//                 y: { beginAtZero: true },
//             },
//         },
//     });
//     chart.setWidth(800).setHeight(400).setBackgroundColor("transparent");

//     // Return the chart URL
//     return chart.getUrl();
// }

// // Endpoint: Upload CSV and Generate Report
// router.post("/upload", upload.single("file"), async (req, res) => {
//     try {
//         const filePath = path.join(__dirname, "../uploads", req.file.filename);
//         console.log("File saved at:", filePath); // Log the file path for debugging

//         // Analyze Revenue
//         const { monthlyRevenue, totalRevenue } = await analyzeRevenue(filePath);

//         // Generate Chart
//         const chartUrl = await generateChart(monthlyRevenue, "Monthly Revenue");

//         // Insights
//         const insights = Object.keys(monthlyRevenue).map((month) => {
//             const revenue = monthlyRevenue[month];
//             return {
//                 month,
//                 insight: revenue < 1000
//                     ? `Revenue for ${month} is low. Consider improving marketing.`
//                     : `Revenue for ${month} is strong.`,
//             };
//         });

//         res.status(200).json({
//             message: "Report generated successfully.",
//             totalRevenue,
//             insights,
//             chart: chartUrl, // Send the chart URL
//         });
//     } catch (error) {
//         console.error("Error generating report:", error);
//         res.status(500).json({ message: "Error generating report", error: error.message });
//     }
// });

// module.exports = router;

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const sql = require("mssql");
const dbConfig = require("../dbConfig"); // Ensure this points to your DB config

const router = express.Router();

// Multer setup for CSV uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, "../uploads");
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "text/csv") cb(null, true);
        else cb(new Error("Only CSV files are allowed!"));
    },
});

// Process CSV and Insert into Database
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const filePath = path.join(__dirname, "../uploads", req.file.filename);
        console.log("File saved at:", filePath);

        // Parse CSV and prepare data for insertion
        const rows = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                rows.push(row);
            })
            .on("end", async () => {
                console.log("Parsed rows:", rows);

                // Validate and insert rows into the database
                const pool = await sql.connect(dbConfig);
                const transaction = new sql.Transaction(pool);

                try {
                    await transaction.begin();

                    for (const row of rows) {
                        // Example: Insert into UserEvents table
                        await transaction.request()
                            .input("userID", sql.Int, row.userID)
                            .input("Role", sql.VarChar(50), row.role || "user")
                            .input("Event", sql.VarChar(255), row.event)
                            .input("Page", sql.VarChar(255), row.page || "unknown")
                            .input("Details", sql.Text, row.details || "")
                            .input("CreatedAt", sql.DateTime, row.timestamp || new Date())
                            .query(`
                                INSERT INTO UserEvents (userID, Role, Event, Page, Details, CreatedAt)
                                VALUES (@userID, @Role, @Event, @Page, @Details, @CreatedAt)
                            `);
                    }

                    await transaction.commit();
                    res.status(200).json({ message: "Data uploaded successfully!" });
                } catch (error) {
                    console.error("Error inserting data:", error);
                    await transaction.rollback();
                    res.status(500).json({ message: "Error processing CSV data", error: error.message });
                } finally {
                    pool.close();
                }
            })
            .on("error", (err) => {
                console.error("Error reading CSV:", err);
                res.status(500).json({ message: "Error reading CSV", error: err.message });
            });
    } catch (error) {
        console.error("Error handling file upload:", error);
        res.status(500).json({ message: "Error handling file upload", error: error.message });
    }
});

module.exports = router;
