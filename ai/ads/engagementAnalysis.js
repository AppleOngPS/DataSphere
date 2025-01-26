const { revenueModel } = require('../services/revenueAnalysis');
const { parseCSV } = require('../utils/csvParser');

const analyzeRevenueGrowth = async (csvFile) => {
  try {
    // Parse uploaded CSV data (e.g., revenue, profit, etc.)
    const data = await parseCSV(csvFile);

    // Generate insights and growth analysis based on the data
    const insights = revenueModel.analyzeGrowth(data);

    return insights;
  } catch (error) {
    console.error("Error analyzing revenue data:", error);
    throw new Error("Revenue analysis failed.");
  }
};

module.exports = { analyzeRevenueGrowth };
