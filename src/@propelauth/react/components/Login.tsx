import { useState } from "react";
import { Container, Logo, Input, Button, Link, Appearance } from "../elements";

export type LoginProps = {
  signupUrl?: string;
  redirectUrl?: string;
  appearance?: LoginAppearance;
};

export type LoginAppearance = {
  Container?: Appearance;
  Logo?: Appearance;
  EmailInput?: Appearance;
  PasswordInput?: Appearance;
  SubmitButton?: Appearance;
  SignupLink?: Appearance;
};

export const Login = ({ signupUrl, redirectUrl, appearance }: LoginProps) => {
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
      {signupUrl && (
        <Link href={signupUrl} appearance={appearance?.SignupLink}>
          Sign up
        </Link>
      )}
    </Container>
  );
};
