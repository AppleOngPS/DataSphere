import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard"; // Keep this import
import Homepage from "./homepage"; // Main homepage component
import WorkshopPage from "./WorkshopPage"; // Import WorkshopPage
import AboutUs from "./AboutUs"; // Import AboutUs component
import CSRPage from "./CSRPage"; // Import CSRPage component
import Navbar from "./assets/components/Navbar"; // Import Navbar
import "./assets/components/nav.css"; // Import Navbar CSS
import Blog from "./Blog"; // Import Blog
import News from "./News"; // Import News
import CheckoutPage from "./CheckoutPage";

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
        <Route path="/" element={<Home />} /> {/* Sign-in and sign-up page */}
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
        <Route path="/blog" element={<Blog />} /> {/* Blog route */}
        <Route path="/news" element={<News />} /> {/* News route */}
        <Route path="/checkout" element={<CheckoutPage />} />
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
