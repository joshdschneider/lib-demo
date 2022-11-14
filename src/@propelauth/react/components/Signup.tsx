import { useState } from "react";
import { Container, Logo, Input, Button, Link, Appearance } from "../elements";

export type SignupProps = {
  loginUrl?: string;
  redirectUrl?: string;
  appearance?: SignupAppearance;
};

export type SignupAppearance = {
  Container?: Appearance;
  Logo?: Appearance;
  EmailInput?: Appearance;
  PasswordInput?: Appearance;
  SubmitButton?: Appearance;
  LoginLink?: Appearance;
};

export const Signup = ({ loginUrl, redirectUrl, appearance }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    alert("Submit");
  }

  return (
    <Container appearance={appearance?.Container}>
      <Logo src={"getFromConfig"} alt={"getFromConfig"} appearance={appearance?.Logo} />
      <Input
        type={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        appearance={appearance?.EmailInput}
      />
      <Input
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        appearance={appearance?.PasswordInput}
      />
      <Button onClick={handleSubmit} appearance={appearance?.SubmitButton}>
        Submit
      </Button>
      {loginUrl && (
        <Link href={loginUrl} appearance={appearance?.LoginLink}>
          Log in
        </Link>
      )}
    </Container>
  );
};
