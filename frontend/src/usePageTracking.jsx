// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const usePageTracking = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const pagePath = location.pathname;

//     // Log page view to Google Analytics
//     if (window.gtag) {
//       const userID = localStorage.getItem("userId");
//       const email = localStorage.getItem("email");

//       window.gtag("config", "G-3BDNKJGCMX", {
//         page_path: pagePath,
//         page_title: document.title,
//         user_id: userID,
//         email: email,
//       });
//     }

//     // Log user flow to localStorage
//     const userFlow = JSON.parse(localStorage.getItem("userFlow")) || [];
//     userFlow.push({
//       path: pagePath,
//       timestamp: new Date().toISOString(),
//     });
//     localStorage.setItem("userFlow", JSON.stringify(userFlow));

//     // Optionally log user flow to the backend
//     const logToBackend = async () => {
//       try {
//         const userID = localStorage.getItem("userId");
//         const role = localStorage.getItem("userRole");
//         if (!userID || !role) return;

//         await fetch("http://localhost:3000/track", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userID,
//             role,
//             event: "page_view",
//             page: pagePath,
//             userFlow, // Send full user flow for analysis
//           }),
//         });
//       } catch (error) {
//         console.error("Error logging user flow to backend:", error);
//       }
//     };

//     logToBackend();
//   }, [location]);
// };

// export default usePageTracking;

// The usePageTracking hook logs page views to Google Analytics and logs user flow to localStorage and optionally to the backend. The user flow is stored in localStorage and is sent to the backend along with the page view event. The user flow is an array of objects, where each object represents a page visited by the user and includes the page path and timestamp. The user flow is updated on each page view, and the full user flow is sent to the backend on each page view. The user flow can be used to analyze the user's journey through the website and identify any patterns or issues in the user experience.
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const usePageTracking = (childData = []) => {
//   const location = useLocation();

//   useEffect(() => {
//     const pagePath = location.pathname;

//     // Update user flow in localStorage
//     const userFlow = JSON.parse(localStorage.getItem("userFlow")) || [];
//     userFlow.push({
//       path: pagePath,
//       timestamp: new Date().toISOString(),
//     });
//     localStorage.setItem("userFlow", JSON.stringify(userFlow));

//     // Log user flow and child data to the backend
//     const logToBackend = async () => {
//       try {
//         const userID = localStorage.getItem("userId");
//         const role = localStorage.getItem("userRole");

//         if (!userID || !role) return;

//         await fetch("http://localhost:3000/track", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userID,
//             role,
//             event: "page_view",
//             page: pagePath,
//             userFlow,
//             children: childData.map((child) => ({
//               childID: child.childID || "Unknown",
//               name: child.name,
//               school: child.school,
//               interest: child.interest,
//               learningStyle: child.learningStyle,
//               specialNeeds: child.specialNeeds,
//               preferredLunch: child.preferredLunch,
//             })),
//           }),
//         });
//       } catch (error) {
//         console.error("Error logging user flow to backend:", error);
//       }
//     };

//     logToBackend();
//   }, [location, childData]);
// };

// export default usePageTracking;

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const usePageTracking = (childData = []) => {
//   const location = useLocation();

//   useEffect(() => {
//     const pagePath = location.pathname;
//     const userID = localStorage.getItem("userId");
//     const role = localStorage.getItem("userRole");

//     const userFlow = JSON.parse(localStorage.getItem("userFlow")) || [];
//     userFlow.push({ path: pagePath, timestamp: new Date().toISOString() });
//     localStorage.setItem("userFlow", JSON.stringify(userFlow));

//     const logToBackend = async () => {
//       try {
//         await fetch("http://localhost:3000/track", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userID,
//             role,
//             event: "page_view",
//             page: pagePath,
//             userFlow,
//             children: childData,
//           }),
//         });
//       } catch (error) {
//         console.error("Error logging user flow to backend:", error);
//       }
//     };

//     logToBackend();
//   }, [location, childData]);
// };

// export default usePageTracking;


// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const usePageTracking = (childData = []) => {
//   const location = useLocation();

//   useEffect(() => {
//     const pagePath = location.pathname;
//     const userID = localStorage.getItem("userId");
//     const role = localStorage.getItem("userRole");

//     if (!userID || !role) {
//       console.error("Missing userID or role. Cannot log event.");
//       return;
//     }

//     if (!Array.isArray(childData)) {
//       console.error("Invalid child data. Expected an array.");
//       return;
//     }

//     const userFlow = JSON.parse(localStorage.getItem("userFlow")) || [];
//     userFlow.push({ path: pagePath, timestamp: new Date().toISOString() });
//     localStorage.setItem("userFlow", JSON.stringify(userFlow));

//     const logToBackend = async () => {
//       try {
//         await fetch("http://localhost:3000/track", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userID,
//             role,
//             event: "page_view",
//             page: pagePath,
//             userFlow,
//             children: childData.length > 0 ? childData : null,
//           }),
//         });
//       } catch (error) {
//         console.error("Error logging user flow to backend:", error);
//         // Optionally log error details to a separate backend endpoint
//         await fetch("http://localhost:3000/log-error", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userID,
//             role,
//             error: error.message,
//             page: pagePath,
//             timestamp: new Date().toISOString(),
//           }),
//         });
//       }
//     };

//     logToBackend();
//   }, [location, childData]);
// };

// export default usePageTracking;
// // The usePageTracking hook logs page views to Google Analytics and logs user flow to localStorage and optionally to the backend. The user flow is stored in localStorage and is sent to the backend along with the page view event. The user flow is an array of objects, where each object represents a page visited by the user and includes the page path and timestamp. The user flow is updated on each page view, and the full user flow is sent to the backend on each page view. The user flow can be used to analyze the user's journey through the website and identify any patterns or issues in the user experience.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = (childData = []) => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname;
    const userID = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");

    // Check if userID or role is missing
    if (!userID || !role) {
      console.error("Missing userID or role. Cannot log event.");
      return;
    }

    if (!Array.isArray(childData)) {
      console.error("Invalid child data. Expected an array.");
      return;
    }

    const userFlow = JSON.parse(localStorage.getItem("userFlow")) || [];
    userFlow.push({ path: pagePath, timestamp: new Date().toISOString() });
    localStorage.setItem("userFlow", JSON.stringify(userFlow));

    // Here, we can log locally or add backend API call based on requirements
    // If you need to track with Google Analytics, make sure to handle the GA4 property correctly
    if (window.gtag) {
      window.gtag("event", "page_view", {
        user_id: userID,
        page_path: pagePath,
        user_flow: userFlow,
        children: childData.length > 0 ? childData : null,
      });
    } else {
      console.error("gtag function is not defined. Check your Google Analytics setup.");
    }
  }, [location, childData]);
};

export default usePageTracking;
