// SignIn.jsx
import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import logo from './assets/logo.png'; 

const Home = () => {
  return (
    <div className="container">
      <div className="lined-container">
        <img src={logo} alt="DataSphere logo" />
        <h1 className="header">Sign in with this button</h1>
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard" />
        </SignedOut>
        <SignedIn>
          <p>You already signed in!</p>
        </SignedIn>
      </div>
    </div>
  );
};

export default Home; 

