// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const usePageTracking = () => {
//   const location = useLocation();

//   useEffect(() => {
//     if (window.gtag) {
//       window.gtag("config", "G-3BDNKJGCMX", {
//         page_path: location.pathname,
//       });
//     }
//   }, [location]);
// };

// export default usePageTracking;



import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = (childData = []) => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname;
    const userID = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");

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

    const logToBackend = async () => {
      try {
        await fetch("http://localhost:3000/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID,
            role,
            event: "page_view",
            page: pagePath,
            userFlow,
            children: childData.length > 0 ? childData : null,
          }),
        });
      } catch (error) {
        console.error("Error logging user flow to backend:", error);
        // Optionally log error details to a separate backend endpoint
        await fetch("http://localhost:3000/log-error", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID,
            role,
            error: error.message,
            page: pagePath,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    };

    logToBackend();
  }, [location, childData]);
};

export default usePageTracking;
// The usePageTracking hook logs page views to Google Analytics and logs user flow to localStorage and optionally to the backend. The user flow is stored in localStorage and is sent to the backend along with the page view event. The user flow is an array of objects, where each object represents a page visited by the user and includes the page path and timestamp. The user flow is updated on each page view, and the full user flow is sent to the backend on each page view. The user flow can be used to analyze the user's journey through the website and identify any patterns or issues in the user experience.