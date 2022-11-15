import { SyntheticEvent, useState } from "react";
import { apiLogin } from "../api/login";
import { Container, Logo, Input, Button, Link } from "../elements";
import { Config, useConfig } from "../state";
import { Appearance } from "../utils";
import { ErrorMessage } from "./shared/ErrorMessage";
import { Greeting } from "./shared/Greeting";
import { SigninOptions } from "./shared/SigninOptions";

export type LoginProps = {
  signupUrl?: string;
  redirectUrl?: string;
  presetEmail?: string; ///
  appearance?: LoginAppearance;
};

export type LoginAppearance = {
  layout?: {
    logoPosition?: "inside" | "outside" | "none";
    greetingText?: string | null;
    showDivider?: boolean;
  };
  elements?: {
    Container?: Appearance;
    Logo?: Appearance;
    EmailInput?: Appearance;
    PasswordInput?: Appearance;
    SubmitButton?: Appearance;
    SignupLink?: Appearance;
  };
};

export const Login = ({ signupUrl, redirectUrl, presetEmail, appearance }: LoginProps) => {
  const { config } = useConfig();

  return (
    <Container appearance={appearance?.elements?.Container}>
      <Logo src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
      <Greeting text={appearance?.layout?.greetingText || "Welcome"} />
      <SigninOptions config={config} />
      {config.has_password_login && config.has_any_social_login && <hr />}
      {config.has_password_login && (
        <PasswordLoginForm config={config} redirectUrl={redirectUrl} presetEmail={presetEmail} />
      )}
      {signupUrl && (
        <Link href={signupUrl} appearance={appearance?.elements?.SignupLink}>
          Sign up
        </Link>
      )}
    </Container>
  );
};

export type PasswordLoginFormProps = {
  config: Config;
  presetEmail?: string;
  redirectUrl?: string;
};

export const PasswordLoginForm = ({ config, presetEmail, redirectUrl }: PasswordLoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(presetEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginResult = await apiLogin({
      email: email,
      password: password,
    });

    if (loginResult.success) {
      window.location.href = redirectUrl || "/";
    } else {
      setError(loginResult.error_message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={login}>
      <div>
        <Input
          required
          type="email"
          placeholder="Email"
          value={email}
          readOnly={!!presetEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button loading={loading}>Login</Button>
      <ErrorMessage error={error} />
    </form>
  );
};
