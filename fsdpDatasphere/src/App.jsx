import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Programmes from "./Programmes";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import PaymentPage from "./PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/programmes" element={<Programmes />} />
        {/* Route for Programmes page */}
        <Route path="/payment" element={<PaymentPage />} />{" "}
        {/* <Route path="/payment/:programmeId" element={<PaymentPage />} /> Route with dynamic programmeId */}
        {/* Route for Payment page */}
        {/* Redirect to sign-in if no match */}
        <Route path="*" element={<RedirectToSignIn />} />
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
