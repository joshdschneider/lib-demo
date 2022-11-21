import { SyntheticEvent, useState } from "react";
import { apiLogin } from "../api/login";
import { Container, Logo, Input, Button, H3 } from "../elements";
import { useConfig } from "../state";
import { Appearance } from "../utils";
import { ErrorMessage } from "./shared/ErrorMessage";
import { SigninOptions } from "./shared/SigninOptions";

export type LoginProps = {
  onSuccess?: VoidFunction;
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
  onSuccess,
  onRedirectToSignup,
  onRedirectToForgotPassword,
  presetEmail,
  appearance,
}: LoginProps) => {
  const { config } = useConfig();

  return (
    <Container appearance={appearance?.elements?.Container} className={"pa_container"}>
      <Logo
        src={config.logo_url}
        alt={config.site_display_name}
        appearance={appearance?.elements?.Logo}
        className={"pa_logo"}
      />
      <H3>{appearance?.options?.greetingText || "Welcome"}</H3>
      <SigninOptions config={config} />
      {config.has_password_login && config.has_any_social_login && <hr className="pa_divider" />}
      {config.has_password_login && <LoginForm onSuccess={onSuccess} presetEmail={presetEmail} />}
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
  onSuccess?: VoidFunction;
  appearance?: LoginAppearance;
};

const LoginForm = ({ presetEmail, appearance, onSuccess }: LoginFormProps) => {
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
      if (onSuccess) {
        onSuccess();
      } else {
        // TODO: DEFAULT ACTION
        console.error("No onSuccess prop found 😵");
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
          appearance={appearance?.elements?.EmailInput}
          className={"pa_input"}
        />
      </div>
      <div>
        <Input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          appearance={appearance?.elements?.PasswordInput}
          className={"pa_input"}
        />
      </div>
      <Button loading={loading} className={"pa_button pa_button--action"}>
        Login
      </Button>
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
    <div className="pa_bottom-links">
      {onRedirectToSignup && (
        <Button
          onClick={onRedirectToSignup}
          appearance={appearance?.elements?.SignupLink}
          className={"pa_button pa_button--minimal"}
        >
          Sign up
        </Button>
      )}
      {onRedirectToForgotPassword && (
        <Button
          onClick={onRedirectToForgotPassword}
          appearance={appearance?.elements?.ForgotPasswordLink}
          className={"pa_button pa_button--minimal"}
        >
          Forgot password
        </Button>
      )}
    </div>
  );
};
