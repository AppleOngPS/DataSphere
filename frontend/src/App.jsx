import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Homepage from "./homepage"; // Main homepage component
import WorkshopPage from "./WorkshopPage"; // Import WorkshopPage
import AboutUs from "./AboutUs"; // Import AboutUs component
import CSRPage from "./CSRPage"; // Import CSRPage component
import Navbar from "./assets/components/Navbar"; // Import Navbar
import "./assets/components/nav.css"; // Import Navbar CSS
import Blog from "./Blog"; // Import Blog
import BlogDetail from "./BlogDetail"; // Import BlogDetail for individual blog posts
import News from "./News"; // Import News
import NewsDetail from "./NewsDetail"; // Import NewsDetail for individual news articles
import BookingPage from "./BookingPage";
import AdminPage from "./Admin"; // Import AdminPage
import UserDashboard from "./UserDashboard";

// import usePageTracking from "./usePageTracking"; // Import the hook

import {
  RedirectToSignIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

function App() {
  // usePageTracking(); // Call the tracking hook
  return (
    <Router>
      {/* Navbar will be present on all pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />{" "}
        {/* Sign-in and sign-up page */}
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
        <Route path="/signUp" element={<Home />} />{" "}
        <Route path="/homepage" element={<Homepage />} />{" "}
        {/* Main homepage route */}
        <Route path="/workshops" element={<WorkshopPage />} />
        <Route path="/about" element={<AboutUs />} />{" "}
        {/* Add this line for AboutUs */}
        <Route path="/csr" element={<CSRPage />} />{" "}
        {/* Add this line for CSR */}
        <Route path="/blog" element={<Blog />} /> {/* Blog route */}
        <Route path="/blog/:id" element={<BlogDetail />} />{" "}
        {/* Dynamic route for blog details */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/news" element={<News />} /> {/* News route */}
        <Route path="/news/:id" element={<NewsDetail />} />{" "}
        <Route path="/checkout/:cardID" element={<BookingPage />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="*" element={<RedirectToSignIn />} />{" "}
        {/* Redirect to sign-in if no match */}
      </Routes>
    </Router>
  );
}

export default App;
