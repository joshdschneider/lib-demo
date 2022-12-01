import { useNavigate } from "react-router-dom";
import { InputProps, Login } from "../@propelauth/react";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Login
        onRedirectToSignup={() => navigate("/signup")}
        onRedirectToForgotPassword={() => navigate("/forgot-password")}
        onSuccess={() => navigate("/dashboard")}
        appearance={{
          options: {
            divider: "FOO",
          },
          elements: {
            EmailInput: CustomInput,
          },
        }}
      />
    </div>
  );
};

export const CustomInput = ({ className, ...rest }: InputProps) => {
  return <input className="FOOOO" {...rest} />;
};
