// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';  // Import Bar chart component from react-chartjs-2
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the necessary components for Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Adminboard = () => {
//   const [analyticsData, setAnalyticsData] = useState(null);

//   useEffect(() => {
//     const fetchAnalyticsData = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/analytics');
//         const data = await response.json();
//         setAnalyticsData(data);  // Store the fetched data in state
//       } catch (error) {
//         console.error('Error fetching analytics data:', error);
//       }
//     };

//     fetchAnalyticsData();
//   }, []);

//   if (!analyticsData) {
//     return <div>Loading...</div>;
//   }

//   // Prepare the data for the chart
//   const chartData = {
//     labels: ['Chrome', 'Edge'],
//     datasets: [
//       {
//         label: 'Sessions',
//         data: [
//           analyticsData.rows[0].metricValues[0]?.value,  // Sessions for Chrome
//           analyticsData.rows[1].metricValues[0]?.value,  // Sessions for Edge
//         ],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Sessions by Browser</h2>
//       <Bar data={chartData} options={{ responsive: true }} />  {/* Render the chart with the data */}
//     </div>
//   );
// };

// export default Adminboard;

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';  // Import Bar chart component from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Adminboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [userFlowData, setUserFlowData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Simulate user flow data with hardcoded username
        const simulatedUserFlow = {
          rows: [
            {
              dimensionValues: [{ value: '/home' }], // page path
              metricValues: [{ value: 100 }], // 100 views for Home page
              userName: 'JohnDoe', // Simulating a user (JohnDoe)
            },
            {
              dimensionValues: [{ value: '/profile' }], // page path
              metricValues: [{ value: 75 }], // 75 views for Profile page
              userName: 'JohnDoe', // Same user tracking
            },
            {
              dimensionValues: [{ value: '/settings' }], // page path
              metricValues: [{ value: 50 }], // 50 views for Settings page
              userName: 'JohnDoe', // Same user tracking
            },
          ],
        };
        setUserFlowData(simulatedUserFlow);

        // Simulate other analytics data (e.g., sessions by browser)
        const simulatedAnalyticsData = {
          rows: [
            { dimensionValues: [{ value: 'Chrome' }], metricValues: [{ value: 120 }] }, // 120 sessions for Chrome
            { dimensionValues: [{ value: 'Edge' }], metricValues: [{ value: 80 }] }, // 80 sessions for Edge
          ],
        };
        setAnalyticsData(simulatedAnalyticsData);  // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (!analyticsData || !userFlowData) {
    return <div>Loading...</div>;
  }

  // Prepare the data for the sessions by browser chart
  const chartData = {
    labels: analyticsData.rows.map(row => row.dimensionValues[0].value), // Get browser names from dimensionValues
    datasets: [
      {
        label: 'Sessions',
        data: analyticsData.rows.map(row => row.metricValues[0].value), // Get session counts
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare the data for the user flow chart (page views per page path, including username)
  const userFlowChartData = {
    labels: userFlowData.rows.map(row => `${row.userName}: ${row.dimensionValues[0].value}`),  // page paths and user names
    datasets: [
      {
        label: 'Page Views',
        data: userFlowData.rows.map(row => row.metricValues[0].value),  // page views
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Sessions by Browser</h2>
      <Bar data={chartData} options={{ responsive: true }} />  {/* Render the chart with session data */}

      <h2>User Flow by Page</h2>
      <Bar data={userFlowChartData} options={{ responsive: true }} />  {/* Render the chart with user flow data */}
    </div>
  );
};

export default Adminboard;
