import { useEffect, useState } from "react";
import { Appearance, useAppearance } from "../state/useAppearance";
import Elements from "../elements";

export type SignupProps = {
  signInUrl?: string;
  redirectUrl?: string;
  appearance?: Appearance;
  // other props..
};

export const Signup = ({ signInUrl, redirectUrl, appearance }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAppearance } = useAppearance();

  useEffect(() => {
    if (appearance) {
      setAppearance(appearance);
    }
  }, [appearance, setAppearance]);

  function handleSubmit() {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert("Submitted");
    }
  }

  return (
    <Elements.Container>
      <Elements.Logo src={"getFromConfig"} alt={"getFromConfig"} />
      <Elements.EmailInput email={email} setEmail={setEmail} />
      <Elements.PasswordInput password={password} setPassword={setPassword} />
      <Elements.SubmitButton handleSubmit={handleSubmit} />
      {signInUrl && <Elements.Link href={signInUrl}>Sign in</Elements.Link>}
    </Elements.Container>
  );
};
