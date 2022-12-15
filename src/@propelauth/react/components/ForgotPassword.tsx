import { ReactNode, SyntheticEvent, useState } from "react";
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
  Label,
} from "../elements";
import { useClient } from "../state/useClient";
import {
  BAD_REQUEST_FORGOT_PASSWORD,
  BAD_REQUEST_LOGIN_PASSWORDLESS,
  FORGOT_PASSWORD_SUCCESS,
  MAGIC_LINK_SUCCESS,
  NOT_FOUND_LOGIN_PASSWORDLESS,
  UNEXPECTED_ERROR,
} from "./shared/constants";

export type ForgotPasswordProps = {
  onRedirectToLogin?: VoidFunction;
  appearance?: ForgotPasswordAppearance;
};

export type ForgotPasswordAppearance = {
  options?: {
    headerContent?: ReactNode;
    displayLogo?: boolean;
    emailLabel?: ReactNode;
    resetPasswordButtonContent?: ReactNode;
    magicLinkButtonContent?: ReactNode;
    backButtonContent?: ReactNode;
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
    LoginButton?: ElementAppearance<ButtonProps>;
    ErrorMessage?: ElementAppearance<AlertProps>;
  };
};

export const ForgotPassword = ({ onRedirectToLogin, appearance }: ForgotPasswordProps) => {
  const { loginApi } = useClient();
  const { config } = useConfig();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  async function submitForgotPassword(e: SyntheticEvent) {
    try {
      e.preventDefault();
      setPasswordResetLoading(true);
      const response = await loginApi.forgotPassword({ email });
      if (response.ok) {
        setSuccessMessage(FORGOT_PASSWORD_SUCCESS);
      } else {
        response.error._visit({
          badRequestForgotPassword: () => setError(BAD_REQUEST_FORGOT_PASSWORD),
          _other: () => setError(UNEXPECTED_ERROR),
        });
      }
    } catch (e) {
      setError(UNEXPECTED_ERROR);
      console.error(e);
    } finally {
      setPasswordResetLoading(false);
    }
  }

  async function submitMagicLink(e: SyntheticEvent) {
    try {
      e.preventDefault();
      setMagicLinkLoading(true);
      const response = await loginApi.sendMagicLinkLogin({ email, createIfDoesntExist: false });
      if (response.ok) {
        setSuccessMessage(MAGIC_LINK_SUCCESS);
      } else {
        response.error._visit({
          notFoundLoginPasswordless: () => setError(NOT_FOUND_LOGIN_PASSWORDLESS),
          badRequestLoginPasswordless: () => setError(BAD_REQUEST_LOGIN_PASSWORDLESS),
          _other: () => setError(UNEXPECTED_ERROR),
        });
      }
    } catch (e) {
      setError(UNEXPECTED_ERROR);
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
            <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerContent || "Forgot Password"}</H3>
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
          <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerContent || "Forgot Password"}</H3>
        </div>
        <div data-contain="content">
          <ForgotPasswordDirections appearance={appearance} hasPasswordlessLogin={config.has_passwordless_login} />
        </div>
        <div data-contain="form">
          <form onSubmit={submitForgotPassword}>
            <div>
              <Label htmlFor="email">{appearance?.options?.emailLabel || "Email"}</Label>
              <Input
                required
                id={"email"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                appearance={appearance?.elements?.EmailInput}
              />
            </div>
            <Button loading={passwordResetLoading} appearance={appearance?.elements?.SubmitButton}>
              {appearance?.options?.resetPasswordButtonContent || "Reset Password"}
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
              {appearance?.options?.magicLinkButtonContent || "Send Magic Link"}
            </Button>
          </div>
        )}
        <BottomLinks onRedirectToLogin={onRedirectToLogin} appearance={appearance} />
        {error && (
          <Alert appearance={appearance?.elements?.ErrorMessage} type={"error"}>
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
        <Button onClick={onRedirectToLogin} appearance={appearance?.elements?.LoginButton}>
          {appearance?.options?.backButtonContent || "Back to login"}
        </Button>
      )}
    </div>
  );
};
