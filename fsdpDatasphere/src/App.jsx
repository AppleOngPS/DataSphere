import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './homepage'; // Main homepage component
import WorkshopPage from './WorkshopPage'; // Import WorkshopPage
import AboutUs from './AboutUs'; // Import AboutUs component
import CSRPage from './CSRPage'; // Import CSRPage component
import BookingPage from './BookingPage'; // Import your checkout page component
import Navbar from './components/Navbar'; // Import Navbar
import './components/nav.css'; // Import Navbar CSS
import Home from "./Home";
import Dashboard from "./Dashboard"; // Keep this import
import Programmes from "./Programmes";
import Homepage from "./homepage"; // Main homepage component
import WorkshopPage from "./WorkshopPage"; // Import WorkshopPage
import AboutUs from "./AboutUs"; // Import AboutUs component
import CSRPage from "./CSRPage"; // Import CSRPage component
import Navbar from "./components/Navbar"; // Import Navbar
import Blog from "./Blog"; // Import Blog
import BlogDetail from "./BlogDetail"; // Import BlogDetail for individual blog posts
import News from "./News"; // Import News
import NewsDetail from "./NewsDetail"; // Import NewsDetail for individual news articles
import "./components/nav.css"; // Import Navbar CSS
import Homepage from "./homepage"; // Main homepage component
import WorkshopPage from "./WorkshopPage"; // Import WorkshopPage
import AboutUs from "./AboutUs"; // Import AboutUs component
import CSRPage from "./CSRPage"; // Import CSRPage component
import Navbar from "./components/Navbar"; // Import Navbar
import CalendarPage from "./Calender";
import "./components/nav.css"; // Import Navbar CSS

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      {/* Navbar will be present on all pages */}
      <Navbar />
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<Homepage />} /> {/* Main homepage route */}

        {/* Sign-In and Sign-Up routes */}
        <Route
          path="/sign-in"
          element={
            <SignedOut>
              <SignIn path="/sign-in" routing="path" />
            </SignedOut>
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignedOut>
              <SignUp path="/sign-up" routing="path" />
            </SignedOut>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route path="/homepage" element={<Homepage />} />{" "}
        {/* Main homepage route */}
        <Route path="/workshops" element={<WorkshopPage />} />
        <Route path="/about" element={<AboutUs />} />{" "}
        {/* Add this line for AboutUs */}
        <Route path="/csr" element={<CSRPage />} />{" "}
        {/* Add this line for CSR */}
        <Route path="/programmes" element={<Programmes />} />{" "}
        <Route path="/Calender" element={<CalendarPage />} />
        <Route path="/blog" element={<Blog />} /> {/* Blog route */}
        <Route path="/blog/:id" element={<BlogDetail />} />{" "}
        {/* Dynamic route for blog details */}
        <Route path="/news" element={<News />} /> {/* News route */}
        <Route path="/news/:id" element={<NewsDetail />} />{" "}
        {/* News detail route */}
        <Route path="*" element={<RedirectToSignIn />} />{" "}
        {/* Redirect to sign-in if no match */}
      </Routes>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import Dashboard from "./Dashboard";
// import Programmes from "./Programmes";
// import PaymentPage from "./PaymentPage";
// import {
//   RedirectToSignIn,
//   SignedIn,
//   SignedOut,
//   SignIn,
//   SignUp,
// } from "@clerk/clerk-react";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/programmes" element={<Programmes />} />
//         <Route
//           path="/dashboard"
//           element={
//             <SignedIn>
//               <Dashboard />
//             </SignedIn>
//           }
//         />
//         <Route
//           path="/sign-in"
//           element={
//             <SignedOut>
//               <SignIn />
//             </SignedOut>
//           }
//         />
//         <Route
//           path="/sign-up"
//           element={
//             <SignedOut>
//               <SignUp />
//             </SignedOut>
//           }
//         />
//         {/* Route with dynamic programID */}
//         <Route path="/payment/:programID" element={<PaymentPage />} />
//         <Route path="*" element={<RedirectToSignIn />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
