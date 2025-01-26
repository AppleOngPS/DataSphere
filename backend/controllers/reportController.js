const { analyzeRevenue } = require('../../ai/ads/reports/revenueAnalysis');
const { analyzeImpact } = require('../../ai/ads/reports/impactAnalysis');
const { generateChart } = require('../../ai/ads/reports/chartGenerator');
const path = require('path');

exports.uploadAndGenerateReport = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../uploads', req.file.filename);

        // Revenue Analysis
        const { monthlyRevenue, totalRevenue } = await analyzeRevenue(filePath);

        // Impact Analysis
        const impactData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
            month,
            revenue,
            expenses: Math.random() * revenue * 0.5, // Mock expenses for now
        }));
        const insights = await analyzeImpact(impactData);

        // Generate Chart
        const chartBuffer = await generateChart(monthlyRevenue, 'Monthly Revenue');

        res.status(200).json({
            totalRevenue,
            monthlyRevenue,
            insights,
            chart: chartBuffer.toString('base64'), // Send chart as Base64
        });
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Error generating report', error: error.message });
    }
};
