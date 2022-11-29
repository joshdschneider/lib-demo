import { SyntheticEvent, useEffect, useState } from "react";
import { apiLogin } from "../api";
import { useConfig } from "../state";
import { Appearance } from "../utils";
import { SigninOptions } from "./shared/SigninOptions";
import { Alert, Container, Divider, Image, Input, Button, H3, Paragraph } from "../elements";
import { CompleteAccount, CreateOrg, Verify } from "../components";

export type LoginProps = {
  onSuccess: VoidFunction;
  onRedirectToSignup?: VoidFunction;
  onRedirectToForgotPassword?: VoidFunction;
  presetEmail?: string;
  appearance?: LoginAppearance;
};

export type LoginAppearance = {
  options?: {
    headerText?: string;
    showDivider?: boolean;
    // layout?
  };
  elements?: {
    Container?: Appearance;
    Logo?: Appearance;
    Header?: Appearance;
    Divider?: Appearance;
    EmailInput?: Appearance;
    PasswordInput?: Appearance;
    SubmitButton?: Appearance;
    SignupLink?: Appearance;
    ForgotPasswordLink?: Appearance;
    Alert?: Appearance;
  };
};

export type LoginState = "LOGIN" | "2FA_REQUIRED" | "USER_METADATA_REQUIRED" | "ORG_CREATION_REQUIRED" | "FINISHED";

export const Login = ({
  onSuccess,
  onRedirectToSignup,
  onRedirectToForgotPassword,
  presetEmail,
  appearance,
}: LoginProps) => {
  const { config } = useConfig();
  const [step, setStep] = useState<LoginState>("LOGIN");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(presetEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const login = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const response = await apiLogin({
        email: email,
        password: password,
      });
      if (response.ok) {
        // ??
      } else if (response.error.errorName === "NotFound") {
        setError("Email not found");
      } else if (response.error.errorName === "Unauthorized") {
        setError("Incorrect password");
      } else if (response.error.errorName === "TooManyRequests") {
        setError("Too many login attempts");
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === "FINISHED") {
      onSuccess();
    }
  }, [step, onSuccess]);

  switch (step) {
    case "LOGIN":
      return (
        <Container appearance={appearance?.elements?.Container} className={"pa_container"}>
          <div className="pa_logo-container">
            <Image
              src={config.logo_url}
              alt={config.site_display_name}
              appearance={appearance?.elements?.Logo}
              className={"pa_logo"}
            />
          </div>
          <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Welcome"}</H3>
          {(config.has_passwordless_login || config.has_any_social_login) && <SigninOptions config={config} />}
          {config.has_password_login && config.has_any_social_login && appearance?.options?.showDivider !== false && (
            <Divider appearance={appearance?.elements?.Divider} className="pa_divider" />
          )}
          {config.has_password_login && (
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
              <Button
                appearance={appearance?.elements?.SubmitButton}
                loading={loading}
                className={"pa_button pa_button--action"}
              >
                Login
              </Button>
              {error && (
                <Alert appearance={appearance?.elements?.Alert} type={"error"}>
                  {error}
                </Alert>
              )}
            </form>
          )}
          {(onRedirectToSignup || onRedirectToForgotPassword) && (
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
          )}
        </Container>
      );

    case "2FA_REQUIRED":
      return <Verify setStep={setStep} />;

    case "USER_METADATA_REQUIRED":
      return <CompleteAccount setStep={setStep} config={config} />;

    case "ORG_CREATION_REQUIRED":
      return <CreateOrg setStep={setStep} config={config} />;

    case "FINISHED":
      return (
        <Container>
          <H3>Login successful</H3>
          <Paragraph>Redirecting...</Paragraph>
        </Container>
      );

    default:
      return (
        <Container>
          <H3>Something went wrong</H3>
          <Paragraph>Looks like something went wrong. Please return to login.</Paragraph>
          <Button onClick={() => setStep("LOGIN")} className={"pa_button pa_button--action"}>
            Return to login
          </Button>
        </Container>
      );
  }
};
