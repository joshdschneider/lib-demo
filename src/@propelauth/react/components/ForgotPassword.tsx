import { SyntheticEvent, useState } from "react";
import { apiForgotPassword, apiLoginPasswordless } from "../api";
import { Alert, Container, Image, Input, Button, H3, Paragraph } from "../elements";
import { useConfig } from "../state";
import { Appearance } from "../utils";

export type ForgotPasswordProps = {
  onRedirectToLogin?: VoidFunction;
  appearance?: ForgotPasswordAppearance;
};

export type ForgotPasswordAppearance = {
  options?: {
    logoPosition?: "inside" | "outside" | "none";
    headerText?: string | null;
    paragraphText?: string | null;
    showDivider?: boolean;
  };
  elements?: {
    Container?: Appearance;
    Logo?: Appearance;
    Header?: Appearance;
    SuccessText?: Appearance;
    EmailInput?: Appearance;
    PasswordInput?: Appearance;
    SubmitButton?: Appearance;
    MagicLinkButton?: Appearance;
    LoginLink?: Appearance;
  };
};

export const ForgotPassword = ({ onRedirectToLogin, appearance }: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
  const { config } = useConfig();

  async function submitForgotPassword(e: SyntheticEvent) {
    try {
      e.preventDefault();
      setPasswordResetLoading(true);
      const response = await apiForgotPassword({ email });
      if (response.ok) {
        const message = `If that email address is in our database, we will send you an email to reset your password.`;
        setSuccessMessage(message);
      } else if (response.error.errorName === "NotFound") {
        setError("Email not found");
      } else if (response.error.errorName === "Unauthorized") {
        setError("Unauthorized");
      } else if (response.error.errorName === "TooManyRequests") {
        setError("Too many login attempts");
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setPasswordResetLoading(false);
    }
  }

  async function submitMagicLink(e: SyntheticEvent) {
    try {
      e.preventDefault();
      setMagicLinkLoading(true);
      const response = await apiLoginPasswordless({ email, createIfDoesntExist: false });
      if (response.ok) {
        const message = `If that email address is in our database, we will send you an email to login to your account.`;
        setSuccessMessage(message);
      } else if (response.error.errorName === "NotFound") {
        setError("Email not found");
      } else if (response.error.errorName === "Unauthorized") {
        setError("Unauthorized");
      } else if (response.error.errorName === "TooManyRequests") {
        setError("Too many login attempts");
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setMagicLinkLoading(false);
    }
  }

  if (successMessage) {
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
        <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Forgot Password"}</H3>
        <Paragraph appearance={appearance?.elements?.SuccessText}>{successMessage}</Paragraph>
      </Container>
    );
  }

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
      <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Forgot Password"}</H3>
      <ForgotPasswordDirections appearance={appearance} hasPasswordlessLogin={config.has_passwordless_login} />
      <form onSubmit={submitForgotPassword}>
        <div>
          <Input
            required
            type={"email"}
            placeholder={"email@example.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            appearance={appearance?.elements?.EmailInput}
            className={"pa_input"}
          />
        </div>
        <Button
          loading={passwordResetLoading}
          appearance={appearance?.elements?.SubmitButton}
          className={"pa_button pa_button--action"}
        >
          Reset Password
        </Button>
      </form>
      {config.has_passwordless_login && (
        <Button
          loading={magicLinkLoading}
          onClick={submitMagicLink}
          appearance={appearance?.elements?.MagicLinkButton}
          className={"pa_button pa_button--action"}
        >
          Send Magic Link
        </Button>
      )}
      <BottomLinks onRedirectToLogin={onRedirectToLogin} appearance={appearance} />
      {error && <Alert type={"error"}>{error}</Alert>}
    </Container>
  );
};

type ForgotPasswordDirectionsProps = {
  appearance?: ForgotPasswordAppearance;
  hasPasswordlessLogin: boolean;
};

const ForgotPasswordDirections = ({ appearance, hasPasswordlessLogin }: ForgotPasswordDirectionsProps) => {
  const passwordMessage = `Enter your email address and we will send you an email with a link that will let you reset your password.`;
  const passwordlessMessage = `You can choose between receiving an email to reset your password or receiving an email with a magic link that will log you in.`;

  if (hasPasswordlessLogin) {
    return <Paragraph>{passwordlessMessage}</Paragraph>;
  }

  return <Paragraph>{passwordMessage}</Paragraph>;
};

type BottomLinksProps = {
  onRedirectToLogin?: VoidFunction;
  appearance?: ForgotPasswordAppearance;
};

const BottomLinks = ({ onRedirectToLogin, appearance }: BottomLinksProps) => {
  return (
    <>
      {onRedirectToLogin && (
        <Button
          onClick={onRedirectToLogin}
          appearance={appearance?.elements?.LoginLink}
          className={"pa_button pa_button--minimal"}
        >
          Back to login
        </Button>
      )}
    </>
  );
};
