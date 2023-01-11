import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "@propelauth/react-test";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ForgotPassword onRedirectToLogin={() => navigate("/login")} />
    </div>
  );
};
