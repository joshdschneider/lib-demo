import { SyntheticEvent, useState } from "react";
import { apiForgotPassword, apiLoginPasswordless } from "../api";
import { useConfig, ElementAppearance } from "../state";
import {
  Alert,
  Container,
  Image,
  Input,
  Button,
  H3,
  Paragraph,
  AlertProps,
  ContainerProps,
  ImageProps,
  InputProps,
  ButtonProps,
  H3Props,
  ParagraphProps,
} from "../elements";

export type ForgotPasswordProps = {
  onRedirectToLogin?: VoidFunction;
  appearance?: ForgotPasswordAppearance;
};

export type ForgotPasswordAppearance = {
  options?: {
    headerText?: string;
    displayLogo?: boolean;
  };
  elements?: {
    Container?: ElementAppearance<ContainerProps>;
    Logo?: ElementAppearance<ImageProps>;
    Header?: ElementAppearance<H3Props>;
    SuccessText?: ElementAppearance<ParagraphProps>;
    InstructionsText?: ElementAppearance<ParagraphProps>;
    EmailInput?: ElementAppearance<InputProps>;
    PasswordInput?: ElementAppearance<InputProps>;
    SubmitButton?: ElementAppearance<ButtonProps>;
    MagicLinkButton?: ElementAppearance<ButtonProps>;
    Alert?: ElementAppearance<AlertProps>;
    LoginLink?: ElementAppearance<ButtonProps>;
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
      <div data-contain="component">
        <Container appearance={appearance?.elements?.Container}>
          {appearance?.options?.displayLogo && (
            <div data-contain="logo">
              <Image src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
            </div>
          )}
          <div data-contain="header">
            <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Forgot Password"}</H3>
          </div>
          <div data-contain="content">
            <Paragraph appearance={appearance?.elements?.SuccessText}>{successMessage}</Paragraph>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div data-contain="component">
      <Container appearance={appearance?.elements?.Container}>
        {appearance?.options?.displayLogo && (
          <div data-contain="logo">
            <Image src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
          </div>
        )}
        <div data-contain="header">
          <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Forgot Password"}</H3>
        </div>
        <div data-contain="content">
          <ForgotPasswordDirections appearance={appearance} hasPasswordlessLogin={config.has_passwordless_login} />
        </div>
        <div data-contain="form">
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
        </div>
        {config.has_passwordless_login && (
          <div data-contain="form">
            <Button
              loading={magicLinkLoading}
              onClick={submitMagicLink}
              appearance={appearance?.elements?.MagicLinkButton}
            >
              Send Magic Link
            </Button>
          </div>
        )}
        <BottomLinks onRedirectToLogin={onRedirectToLogin} appearance={appearance} />
        {error && (
          <Alert appearance={appearance?.elements?.Alert} type={"error"}>
            {error}
          </Alert>
        )}
      </Container>
    </div>
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
    return <Paragraph appearance={appearance?.elements?.InstructionsText}>{passwordlessMessage}</Paragraph>;
  } else {
    return <Paragraph appearance={appearance?.elements?.InstructionsText}>{passwordMessage}</Paragraph>;
  }
};

type BottomLinksProps = {
  onRedirectToLogin?: VoidFunction;
  appearance?: ForgotPasswordAppearance;
};

const BottomLinks = ({ onRedirectToLogin, appearance }: BottomLinksProps) => {
  return (
    <div data-contain="link">
      {onRedirectToLogin && (
        <Button onClick={onRedirectToLogin} appearance={appearance?.elements?.LoginLink}>
          Back to login
        </Button>
      )}
    </div>
  );
};
