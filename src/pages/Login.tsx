import { useNavigate } from "react-router-dom";
import { Login } from "../@propelauth/react";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Login
        onRedirectToSignup={() => navigate("/signup")}
        onRedirectToForgotPassword={() => navigate("/forgot-password")}
        onSuccess={() => navigate("/dashboard")}
      />
    </div>
  );
};
