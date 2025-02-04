import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import QuizSelector from "./assets/components/quizzes/quizselector.jsx"; // Import QuizSelector
import usePageTracking from "./usePageTracking";
import useGoogleAnalytics from "./js/useGoogleAnalytics";
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
import BookingPage from "./components/BookingPage.jsx";
import CalendarPage from "./Calendar";
import AdminPage from "./Admin"; // Import AdminPage
import UserDashboard from "./UserDashboard";
import Calendar from "./Calendar";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Auth from "./Auth";
import ProfilePage from "./ProfilePage"; // Import ProfilePage
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
// import MembershipPage from "./membership";
import CreateBooking from "./CreateBooking.jsx";
import VideoCallPage from "./VideoCall.jsx";
import Sidebar from "./assets/components/Booking/Sidebar";
import BookSession from "./assets/components/Booking/BookSession";
import TimeSlots from "./assets/components/Booking/TimeSlots";
import BackShots from "./assets/components/BackToTop.jsx"

function App() {
  const location = useLocation();

  // Define the routes where the Navbar should be hidden
  const hideNavbarRoutes = ["/login", "/signup", "/auth", "/checkout", "/createBooking"];
  const shouldShowNavbar = !hideNavbarRoutes.some((route) => location.pathname.startsWith(route));

  const hiddenPages = ["/checkout", "/login", "/signup"];



  return (
    <div className="App">
      {/* Conditionally render Navbar */}
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/* Main homepage route */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout/:cardID" element={<BookingPage />} />
        {/* Protected Routes */}
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userDashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Other Pages */}
        <Route path="/createBooking" element={<CreateBooking />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/workshops" element={<WorkshopPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/csr" element={<CSRPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/checkout/:cardID" element={<BookingPage />} />
        {/* <Route path="/membership" element={<MembershipPage />} /> */}
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/book-session" element={<BookSession />} />
        <Route path="/time-slots" element={<TimeSlots />} />
        <Route path="/call/:booking" element={<VideoCallPage />} />
        {/* Add ProfilePage Route */}
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>
      {!hiddenPages.includes(location.pathname) && <BackShots />} {/* ✅ Conditionally render */}
    </div>
  );
}
// Wrapper to initialize Google Analytics and page tracking
const GoogleAnalyticsWrapper = ({ children }) => {
  useGoogleAnalytics(); // Ensure this is not conditionally called
  return children;
};


export default function Root() {
  return (
    <Router>
      <GoogleAnalyticsWrapper>
        <App />
      </GoogleAnalyticsWrapper>
    </Router>
  );
}
