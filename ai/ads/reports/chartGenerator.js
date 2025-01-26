const ChartJSNodeCanvas = require('chartjs-node-canvas');

async function generateChart(data, chartTitle) {
    const width = 800; // Chart width
    const height = 400; // Chart height

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });
    const configuration = {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: chartTitle,
                data: Object.values(data),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    };

    return await chartJSNodeCanvas.renderToBuffer(configuration);
}

module.exports = { generateChart };
