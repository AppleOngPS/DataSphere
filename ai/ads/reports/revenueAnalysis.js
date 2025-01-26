const fs = require('fs');
const csv = require('csv-parser');

async function analyzeRevenue(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                data.push(row); // Parse each CSV row into an object
            })
            .on('end', () => {
                // Perform calculations
                const monthlyRevenue = data.reduce((acc, record) => {
                    const month = record.month;
                    const revenue = parseFloat(record.revenue || 0);
                    acc[month] = (acc[month] || 0) + revenue;
                    return acc;
                }, {});

                const totalRevenue = Object.values(monthlyRevenue).reduce((a, b) => a + b, 0);
                resolve({ monthlyRevenue, totalRevenue });
            })
            .on('error', (err) => reject(err));
    });
}

module.exports = { analyzeRevenue };
