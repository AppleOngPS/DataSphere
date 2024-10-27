import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';

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
        
        {/* Redirect to home if no match */}
        <Route path="*" element={<RedirectToSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

