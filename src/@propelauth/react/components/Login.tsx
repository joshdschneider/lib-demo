import { SyntheticEvent, useState } from "react";
import { apiLogin } from "../api/login";
import { Container, Logo, Input, Button, H3 } from "../elements";
import { useConfig } from "../state";
import { Appearance } from "../utils";
import { ErrorMessage } from "./shared/ErrorMessage";
import { SigninOptions } from "./shared/SigninOptions";

export type LoginProps = {
  afterLogin?: VoidFunction;
  onRedirectToSignup?: VoidFunction;
  onRedirectToForgotPassword?: VoidFunction;
  presetEmail?: string;
  appearance?: LoginAppearance;
};

export type LoginAppearance = {
  options?: {
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
    ForgotPasswordLink?: Appearance;
  };
};

export const Login = ({
  afterLogin,
  onRedirectToSignup,
  onRedirectToForgotPassword,
  presetEmail,
  appearance,
}: LoginProps) => {
  const { config } = useConfig();

  return (
    <Container appearance={appearance?.elements?.Container}>
      <Logo src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
      <H3>{appearance?.options?.greetingText || "Welcome"}</H3>
      <SigninOptions config={config} />
      {config.has_password_login && config.has_any_social_login && <hr />}
      {config.has_password_login && <LoginForm afterLogin={afterLogin} presetEmail={presetEmail} />}
      <BottomLinks
        onRedirectToSignup={onRedirectToSignup}
        onRedirectToForgotPassword={onRedirectToForgotPassword}
        appearance={appearance}
      />
    </Container>
  );
};

type LoginFormProps = {
  presetEmail?: string;
  afterLogin?: VoidFunction;
};

const LoginForm = ({ presetEmail, afterLogin }: LoginFormProps) => {
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
      if (afterLogin) {
        afterLogin();
      } else {
        // Some default function?
        // Render account component?
        // Push window location to home?
      }
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

type BottomLinksProps = {
  onRedirectToSignup?: VoidFunction;
  onRedirectToForgotPassword?: VoidFunction;
  appearance?: LoginAppearance;
};

const BottomLinks = ({ onRedirectToSignup, onRedirectToForgotPassword, appearance }: BottomLinksProps) => {
  return (
    <>
      {onRedirectToSignup && (
        <Button onClick={onRedirectToSignup} appearance={appearance?.elements?.SignupLink}>
          Sign up
        </Button>
      )}
      {onRedirectToForgotPassword && (
        <Button onClick={onRedirectToForgotPassword} appearance={appearance?.elements?.ForgotPasswordLink}>
          Forgot password
        </Button>
      )}
    </>
  );
};
