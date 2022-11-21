import { useNavigate } from "react-router-dom";
import { Signup } from "../@propelauth/react";

export const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Signup onRedirectToLogin={() => navigate("/login")} onSuccess={() => navigate("/dashboard")} />
    </div>
  );
};
