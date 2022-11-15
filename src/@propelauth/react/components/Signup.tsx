import { SyntheticEvent, useState } from "react";
import { apiSignup, SignupOptions } from "../api/signup";
import { Container, Logo, Input, Button, Link, Appearance } from "../elements";
import { Config, useConfig } from "../state";
import { ErrorMessage } from "./shared/ErrorMessage";
import { Greeting } from "./shared/Greeting";
import { SigninOptions } from "./shared/SigninOptions";

export type SignupProps = {
  loginUrl?: string;
  redirectUrl?: string;
  presetEmail?: string;
  appearance?: SignupAppearance;
};

export type SignupAppearance = {
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
    LoginLink?: Appearance;
  };
};

export const Signup = ({ loginUrl, redirectUrl, presetEmail, appearance }: SignupProps) => {
  const { config } = useConfig();

  return (
    <Container appearance={appearance?.elements?.Container}>
      <Logo src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
      <Greeting text={appearance?.layout?.greetingText || "Create an account"} />
      <SigninOptions config={config} />
      {config.has_password_login && config.has_any_social_login && <hr />}
      {config.has_password_login && (
        <PasswordSignupForm config={config} redirectUrl={redirectUrl} presetEmail={presetEmail} />
      )}
      {loginUrl && (
        <Link href={loginUrl} appearance={appearance?.elements?.LoginLink}>
          Log in
        </Link>
      )}
    </Container>
  );
};

export type PasswordSignupFormProps = {
  config: Config;
  presetEmail?: string;
  redirectUrl?: string;
};

export const PasswordSignupForm = ({ config, presetEmail, redirectUrl }: PasswordSignupFormProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(presetEmail || "");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const signup = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const options: SignupOptions = {
      email: email,
      password: password,
    };

    if (config.require_name) {
      options.firstName = firstName;
      options.lastName = lastName;
    }

    if (config.require_username) {
      options.username = username;
    }

    const signupResult = await apiSignup(options);
    if (signupResult.success) {
      window.location.href = redirectUrl || "/";
    } else {
      setError(signupResult.error_message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={signup}>
      {config.require_name && (
        <div>
          <Input
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
          />
          <Input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
      )}
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
      {config.require_username && (
        <div>
          <Input
            required
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      <div>
        <Input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button loading={loading}>Sign up</Button>
      <ErrorMessage error={error} />
    </form>
  );
};
