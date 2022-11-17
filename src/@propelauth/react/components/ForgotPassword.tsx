import { SyntheticEvent, useState } from "react";
import { apiForgotPassword } from "../api/forgotPassword";
import { apiLoginPasswordless } from "../api/loginPasswordless";
import { Container, Logo, Input, Button, H3, Paragraph } from "../elements";
import { useConfig } from "../state";
import { Appearance } from "../utils";
import { ErrorMessage } from "./shared/ErrorMessage";

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
    e.preventDefault();
    setPasswordResetLoading(true);

    const response = await apiForgotPassword({ email });
    if (response.success) {
      const message = `If that email address is in our database, we will send you an email to reset your password.`;
      setSuccessMessage(message);
    } else if (response.error) {
      setError(response.error.message);
    }

    setPasswordResetLoading(false);
  }

  async function submitMagicLink(e: SyntheticEvent) {
    e.preventDefault();
    setMagicLinkLoading(true);

    const response = await apiLoginPasswordless({ email, create_if_doesnt_exist: false });
    if (response.success) {
      const message = `If that email address is in our database, we will send you an email to login to your account.`;
      setSuccessMessage(message);
    } else if (response.error) {
      setError(response.error.message);
    }

    setMagicLinkLoading(false);
  }

  if (successMessage) {
    return (
      <Container appearance={appearance?.elements?.Container}>
        <Logo src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
        <H3>{appearance?.options?.headerText || "Forgot password"}</H3>
        <Paragraph>{successMessage}</Paragraph>
      </Container>
    );
  }

  return (
    <Container appearance={appearance?.elements?.Container}>
      <Logo src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
      <H3>{appearance?.options?.headerText || "Forgot password"}</H3>
      <ForgotPasswordDirections hasPasswordlessLogin={config.has_passwordless_login} />
      <form onSubmit={submitForgotPassword}>
        <div>
          <Input
            required
            type={"email"}
            placeholder={"email@example.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            appearance={appearance?.elements?.EmailInput}
          />
        </div>
        <Button loading={passwordResetLoading} appearance={appearance?.elements?.SubmitButton}>
          Reset Password
        </Button>
      </form>
      {config.has_passwordless_login && (
        <Button loading={magicLinkLoading} onClick={submitMagicLink} appearance={appearance?.elements?.MagicLinkButton}>
          Send Magic Link
        </Button>
      )}
      <BottomLinks onRedirectToLogin={onRedirectToLogin} appearance={appearance} />
      <ErrorMessage error={error} />
    </Container>
  );
};

type ForgotPasswordDirectionsProps = {
  hasPasswordlessLogin: boolean;
};

const ForgotPasswordDirections = ({ hasPasswordlessLogin }: ForgotPasswordDirectionsProps) => {
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
        <Button onClick={onRedirectToLogin} appearance={appearance?.elements?.LoginLink}>
          Back to login
        </Button>
      )}
    </>
  );
};
