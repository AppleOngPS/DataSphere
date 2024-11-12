// SignIn.jsx
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom"; // Add navigation handling

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <div className="container">
      <div className="lined-container">
        <img src={logo} alt="DataSphere logo" />
        <h1 className="header">Sign In With This Button</h1>
        <SignedOut>
          <SignInButton 
            mode="modal" 
            // Optionally handle redirect within this component as well
            afterSignIn={() => navigate('/dashboard')} 
          />
        </SignedOut>
        <SignedIn>
          <p>You are already signed in!</p>
        </SignedIn>
      </div>
    </div>
  );
};

export default Home;
