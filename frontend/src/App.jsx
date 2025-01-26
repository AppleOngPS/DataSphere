import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import BookingPage from "./BookingPage";
import CalendarPage from "./Calendar";
import AdminPage from "./Admin"; // Import AdminPage
import UserDashboard from "./UserDashboard";
import Calendar from "./Calendar";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Auth from "./Auth";
import ProfilePage from "./ProfilePage"; // Import ProfilePage
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import MembershipPage from "./membership";

function App() {
  const location = useLocation();

  // Define the routes where the Navbar should be hidden
  const hideNavbarRoutes = ["/login", "/signup", "/auth"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

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
        <Route path="/membership" element={<MembershipPage />} />
        {/* Add ProfilePage Route */}
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
}
// Wrapper to initialize Google Analytics and page tracking
function GoogleAnalyticsWrapper({ children }) {
  useGoogleAnalytics(); // Make sure to call the hook
  usePageTracking(); // Make sure to call the hook
  return children;
}

export default function Root() {
  return (
    <Router>
      <GoogleAnalyticsWrapper>
        <App />
      </GoogleAnalyticsWrapper>
    </Router>
  );
}

