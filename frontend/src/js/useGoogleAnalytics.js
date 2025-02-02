// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const useGoogleAnalytics = () => {
//   const location = useLocation();

//   // Function to log events to your backend
//   const logEventToBackend = async (event, page, details = null, quizData = null) => {
//     try {
//       const userID = localStorage.getItem("userId");
//       const role = localStorage.getItem("userRole");
//       const gender = localStorage.getItem("userGender");
//       const interests = localStorage.getItem("userInterests");
//       const userFlow = JSON.parse(localStorage.getItem("userFlow")) || []; // Retrieve user flow
  
//       if (!userID || !role) return; // Ensure user is authenticated
  
//       // Include the current page in userFlow
//       if (!userFlow.includes(page)) {
//         userFlow.push(page);
//         localStorage.setItem("userFlow", JSON.stringify(userFlow));
//       }
  
//       await fetch("http://localhost:3000/track", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userID,
//           role,
//           gender,
//           interests,
//           event,
//           page,
//           details,
//           quizData,
//           userFlow, // Include the user flow
//         }),
//       });
//     } catch (error) {
//       console.error("Error logging event to backend:", error);
//     }
//   };
  

//   // Track page views
//   useEffect(() => {
//     const pagePath = location.pathname;

//     // Log page view to Google Analytics
//     if (window.gtag) {
//       window.gtag("event", "page_view", {
//         page_path: pagePath,
//         page_title: document.title,
//       });
//     }

//     // Log page view to backend
//     logEventToBackend("page_view", pagePath);
//   }, [location]);

//   // Expose a function for logging custom events
//   const logCustomEvent = (event, details, quizData = null) => {
//     const pagePath = location.pathname;

//     // Log custom event to Google Analytics
//     if (window.gtag) {
//       const analyticsData = {
//         page_path: pagePath,
//         event_details: details,
//       };

//       // Add quiz data to analytics if provided
//       if (quizData) {
//         analyticsData.quiz_category = quizData.category;
//         analyticsData.quiz_score = quizData.score;
//         analyticsData.quiz_result = quizData.result;
//       }

//       window.gtag("event", event, analyticsData);
//     }

//     // Log custom event to backend
//     logEventToBackend(event, pagePath, details, quizData);
//   };

//   return {
//     logCustomEvent,
//   };
// };

// export default useGoogleAnalytics;

//finale: function

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const useGoogleAnalytics = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const pagePath = location.pathname;

//     // Log page view to Google Analytics
//     if (window.gtag) {
//       window.gtag("event", "page_view", {
//         page_path: pagePath,
//         page_title: document.title,
//       });
//     }
//   }, [location]);

//   const logCustomEvent = (event, details = null, quizData = null) => {
//     const pagePath = location.pathname;

//     if (window.gtag) {
//       const analyticsData = {
//         page_path: pagePath,
//         ...details,
//       };

//       if (quizData) {
//         analyticsData.quiz_category = quizData.category;
//         analyticsData.quiz_score = quizData.score;
//         analyticsData.quiz_result = quizData.result;
//       }

//       window.gtag("event", event, analyticsData);
//     }
//   };

//   return { logCustomEvent };
// };

// export default useGoogleAnalytics;

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const useGoogleAnalytics = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const pagePath = location.pathname;
//     const userID = localStorage.getItem("userId");
//     const role = localStorage.getItem("userRole");

//     // Log page view to Google Analytics with user and child data
//     if (window.gtag) {
//       window.gtag("event", "page_view", {
//         page_path: pagePath,
//         page_title: document.title,
//         user_id: userID,
//         user_role: role,
//       });
//     }
//   }, [location]);

//   const logCustomEvent = (event, details = null, quizData = null) => {
//     const pagePath = location.pathname;
//     const userID = localStorage.getItem("userId");

//     if (window.gtag) {
//       window.gtag("event", event, {
//         page_path: pagePath,
//         user_id: userID,
//         event_details: details,
//         ...(quizData && {
//           quiz_category: quizData.category,
//           quiz_score: quizData.score,
//           quiz_result: quizData.result,
//         }),
//       });
//     }
//   };

//   return { logCustomEvent };
// };

// export default useGoogleAnalytics;


import { useEffect } from "react"; // Correct import
const useGoogleAnalytics = () => {
  useEffect(() => {
    if (window.gtag) {
      const userID = localStorage.getItem("userId") || "GUEST_USER";
      const userName = localStorage.getItem("userName") || "Anonymous";
      const userInterest = localStorage.getItem("userInterest") || "Unknown";
      const userAge = localStorage.getItem("userAge") || "Unknown";

      // Ensure gtag function exists before calling it
      console.log("Google Analytics is initialized with:", { userID, userName, userInterest, userAge });

      window.gtag("config", "G-D6GLHWZQSH", {
        debug_mode: true,
        user_id: userID,
        user_properties: {
          username: userName,
          interest: userInterest,
          age: userAge,
        },
      });
    } else {
      console.error("Google Analytics (gtag) is not properly initialized.");
    }
  }, []);
};

export default useGoogleAnalytics;


