// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import QuizSelector from "./assets/components/quizzes/quizselector.jsx"; // Import QuizSelector
// import usePageTracking from "./usePageTracking";
// import useGoogleAnalytics from "./js/useGoogleAnalytics";
// import Home from "./Home";
// import Homepage from "./homepage";
// import WorkshopPage from "./WorkshopPage";
// import AboutUs from "./AboutUs";
// import CSRPage from "./CSRPage";
// import Navbar from "./assets/components/Navbar";
// import Blog from "./Blog";
// import BlogDetail from "./BlogDetail";
// import News from "./News";
// import NewsDetail from "./NewsDetail";
// import BookingPage from "./BookingPage";
// import AdminPage from "./Admin";
// import UserDashboard from "./UserDashboard";
// import Calendar from "./Calendar";
// import SignUpPage from "./SignUpPage";
// import LoginPage from "./LoginPage";
// import Auth from "./Auth";
// import ProfilePage from "./ProfilePage";
// import ProtectedRoute from "./ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       {/* Initialize Google Analytics and Page Tracking */}
//       <GoogleAnalyticsWrapper>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/auth" element={<Auth />} /> 
//          <Route path="/quiz" element={<QuizSelector />} /> {/* Add QuizSelector */}
//           <Route
//             path="/adminDashboard"
//             element={
//               <ProtectedRoute>
//                 <AdminPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/userDashboard"
//             element={
//               <ProtectedRoute>
//                 <UserDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/home" element={<Home />} />
//           <Route path="/homepage" element={<Homepage />} />
//           <Route path="/workshops" element={<WorkshopPage />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/csr" element={<CSRPage />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/blog/:id" element={<BlogDetail />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/news/:id" element={<NewsDetail />} />
//           <Route path="/checkout/:cardID" element={<BookingPage />} />
//               {/* Add ProfilePage Route */}
//           <Route path="/Calendar" element={<Calendar />} />
//         </Routes>
//       </GoogleAnalyticsWrapper>
//     </Router>
//   );
// }

// // Wrapper to initialize Google Analytics and page tracking
// function GoogleAnalyticsWrapper({ children }) {
//   useGoogleAnalytics();
//   usePageTracking();
//   return children;
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import QuizSelector from "./assets/components/quizzes/quizselector.jsx"; // Import QuizSelector
import usePageTracking from "./usePageTracking";
import useGoogleAnalytics from "./js/useGoogleAnalytics";
import Home from "./Home";
import Homepage from "./homepage";
import WorkshopPage from "./WorkshopPage";
import AboutUs from "./AboutUs";
import CSRPage from "./CSRPage";
import Navbar from "./assets/components/Navbar";
import Blog from "./Blog";
import BlogDetail from "./BlogDetail";
import News from "./News";
import NewsDetail from "./NewsDetail";
import BookingPage from "./BookingPage";
import AdminPage from "./Admin";
import UserDashboard from "./UserDashboard";
import Calendar from "./Calendar";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Auth from "./Auth";
import ProfilePage from "./ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const location = useLocation(); // Ensure useLocation is imported
  const hideNavbarRoutes = ["/login", "/signup", "/auth"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz" element={<QuizSelector />} />
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
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </>
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

