import { Signup } from "../lib/components/Signup";

export const SignupPage = () => {
  const appearance = {
    theme: {
      backgroundColor: "red",
    },
  };

  return (
    <div>
      <Signup appearance={appearance} />
    </div>
  );
};
