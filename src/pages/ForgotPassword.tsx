import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../@propelauth/react";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ForgotPassword onRedirectToLogin={() => navigate("/login")} />
    </div>
  );
};
