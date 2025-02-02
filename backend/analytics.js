

// // analytics.js

// const { google } = require('googleapis');
// const path = require('path');
// require('dotenv').config();

// const PROPERTY_ID = '466958660'; // Replace with your GA4 Property ID

// const SERVICE_ACCOUNT_KEY_PATH = path.join(__dirname, process.env.SERVICE_ACCOUNT_KEY_PATH);

// const auth = new google.auth.GoogleAuth({
//   keyFile: SERVICE_ACCOUNT_KEY_PATH,
//   scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
// });

// const analyticsData = google.analyticsdata('v1beta');

// async function fetchAnalyticsData() {
//   try {
//     const authClient = await auth.getClient();
//     const requestBody = {
//       property: `properties/${PROPERTY_ID}`,
//       dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
//       metrics: [{ name: 'sessions' }],
//       dimensions: [{ name: 'browser' }],
//     };

//     const response = await analyticsData.properties.runReport({
//       auth: authClient,
//       property: `properties/${PROPERTY_ID}`,
//       requestBody: requestBody,
//     });

//     console.log('Analytics Data:', response.data);

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data from Google Analytics:', error);
//     throw error;
//   }
// }

// module.exports = { fetchAnalyticsData };  // Export the function

// analytics.js

const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const PROPERTY_ID = '466958660'; // Replace with your GA4 Property ID

const SERVICE_ACCOUNT_KEY_PATH = path.join(__dirname, process.env.SERVICE_ACCOUNT_KEY_PATH);

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_KEY_PATH,
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

const analyticsData = google.analyticsdata('v1beta');

// Fetch session data (sessions by browser)
async function fetchAnalyticsData() {
  try {
    const authClient = await auth.getClient();
    const requestBody = {
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'sessions' }],
      dimensions: [{ name: 'browser' }],
    };

    const response = await analyticsData.properties.runReport({
      auth: authClient,
      property: `properties/${PROPERTY_ID}`,
      requestBody: requestBody,
    });

    console.log('Analytics Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Google Analytics:', error);
    throw error;
  }
}

// Fetch user flow data (page views by page path)
async function fetchUserFlowData() {
  try {
    const authClient = await auth.getClient();
    const requestBody = {
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'itemsViewed' }],  // Get the count of page views
      dimensions: [{ name: 'pagePath' }], // Get the page paths (user flow)
    };

    const response = await analyticsData.properties.runReport({
      auth: authClient,
      property: `properties/${PROPERTY_ID}`,
      requestBody: requestBody,
    });

    console.log('User Flow Data:', response.data);
    return response.data; // Return the fetched data for further use
  } catch (error) {
    console.error('Error fetching user flow data from Google Analytics:', error);
    throw error;
  }
}

module.exports = { fetchAnalyticsData, fetchUserFlowData };  // Export both functions
