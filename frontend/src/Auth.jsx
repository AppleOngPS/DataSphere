import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <LoginPage onToggle={toggleForm} />
      ) : (
        <SignUpPage onToggle={toggleForm} />
      )}
    </div>
  );
}

export default Auth;
