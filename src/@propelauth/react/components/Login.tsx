import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { LoginStateEnum } from "@propel-auth-fern/fe_v2-client/resources";
import { useClient } from "../state/useClient";
import { useConfig, ElementAppearance } from "../state";
import { SignInDivider } from "./shared/SignInDivider";
import { SignInOptions } from "./shared/SignInOptions";
import {
  Alert,
  Container,
  Image,
  Input,
  Button,
  H3,
  ContainerProps,
  ImageProps,
  H3Props,
  DividerProps,
  InputProps,
  ButtonProps,
  AlertProps,
  Label,
} from "../elements";
import {
  Verify,
  VerifyAppearance,
  UserMetadata,
  UserMetadataAppearance,
  ConfirmEmail,
  ConfirmEmailAppearance,
  CreateOrg,
  CreateOrgAppearance,
} from "../components";
import { BAD_REQUEST_LOGIN, UNEXPECTED_ERROR } from "./shared/constants";

export type LoginProps = {
  onSuccess: VoidFunction;
  onRedirectToSignup?: VoidFunction;
  onRedirectToForgotPassword?: VoidFunction;
  presetEmail?: string;
  appearance?: LoginAppearance;
  confirmEmailAppearance?: ConfirmEmailAppearance;
  verifyAppearance?: VerifyAppearance;
  userMetadataAppearance?: UserMetadataAppearance;
  createOrgAppearance?: CreateOrgAppearance;
};

export type LoginAppearance = {
  options?: {
    headerContent?: ReactNode;
    displayLogo?: boolean;
    divider?: ReactNode | boolean;
    emailLabel?: ReactNode;
    passwordLabel?: ReactNode;
    submitButtonContent?: ReactNode;
    signupButtonContent?: ReactNode;
    forgotPasswordButtonContent?: ReactNode;
  };
  elements?: {
    Container?: ElementAppearance<ContainerProps>;
    Logo?: ElementAppearance<ImageProps>;
    Header?: ElementAppearance<H3Props>;
    Divider?: ElementAppearance<DividerProps>;
    EmailInput?: ElementAppearance<InputProps>;
    PasswordInput?: ElementAppearance<InputProps>;
    SocialButton?: ElementAppearance<ButtonProps>;
    SubmitButton?: ElementAppearance<ButtonProps>;
    SignupButton?: ElementAppearance<ButtonProps>;
    ForgotPasswordButton?: ElementAppearance<ButtonProps>;
    ErrorMessage?: ElementAppearance<AlertProps>;
  };
};

export const Login = ({
  onSuccess,
  onRedirectToSignup,
  onRedirectToForgotPassword,
  presetEmail,
  appearance,
  confirmEmailAppearance,
  verifyAppearance,
  userMetadataAppearance,
  createOrgAppearance,
}: LoginProps) => {
  const { config } = useConfig();
  const [step, setStep] = useState<LoginStateEnum>(LoginStateEnum.LoginRequired);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(presetEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const { loginApi } = useClient();

  const login = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const options = { email, password };
      const response = await loginApi.login(options);
      if (response.ok) {
        setStep(response.body);
      } else {
        response.error._visit({
          badRequestLogin: () => setError(BAD_REQUEST_LOGIN),
          _other: () => setError(UNEXPECTED_ERROR),
        });
      }
    } catch (e) {
      setError(UNEXPECTED_ERROR);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === LoginStateEnum.Finished) {
      onSuccess();
    }
  }, [step, onSuccess]);

  switch (step) {
    case LoginStateEnum.LoginRequired:
      return (
        <div data-contain="component">
          <Container appearance={appearance?.elements?.Container}>
            {appearance?.options?.displayLogo !== false && (
              <div data-contain="logo">
                <Image src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
              </div>
            )}
            <div data-contain="header">
              <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerContent || "Welcome"}</H3>
            </div>
            {(config.has_passwordless_login || config.has_any_social_login) && (
              <SignInOptions buttonAppearance={appearance?.elements?.SocialButton} config={config} />
            )}
            {config.has_password_login && config.has_any_social_login && appearance?.options?.divider !== false && (
              <SignInDivider appearance={appearance?.elements?.Divider} options={appearance?.options?.divider} />
            )}
            {config.has_password_login && (
              <div data-contain="form">
                <form onSubmit={login}>
                  <div>
                    <Label htmlFor="email">{appearance?.options?.emailLabel || "Email"}</Label>
                    <Input
                      required
                      id="email"
                      type="email"
                      value={email}
                      readOnly={!!presetEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      appearance={appearance?.elements?.EmailInput}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">{appearance?.options?.passwordLabel || "Password"}</Label>
                    <Input
                      required
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      appearance={appearance?.elements?.PasswordInput}
                    />
                  </div>
                  <Button appearance={appearance?.elements?.SubmitButton} loading={loading}>
                    {appearance?.options?.submitButtonContent || "Login"}
                  </Button>
                  {error && (
                    <Alert appearance={appearance?.elements?.ErrorMessage} type={"error"}>
                      {error}
                    </Alert>
                  )}
                </form>
              </div>
            )}
            {(onRedirectToSignup || onRedirectToForgotPassword) && (
              <div data-contain="links">
                {onRedirectToSignup && (
                  <Button onClick={onRedirectToSignup} appearance={appearance?.elements?.SignupButton}>
                    {appearance?.options?.signupButtonContent || "Sign Up"}
                  </Button>
                )}
                {onRedirectToForgotPassword && (
                  <Button onClick={onRedirectToForgotPassword} appearance={appearance?.elements?.ForgotPasswordButton}>
                    {appearance?.options?.forgotPasswordButtonContent || "Forgot Password"}
                  </Button>
                )}
              </div>
            )}
          </Container>
        </div>
      );

    case LoginStateEnum.ConfirmEmailRequired:
      return <ConfirmEmail appearance={confirmEmailAppearance} />;

    case LoginStateEnum.TwoFactorRequired:
      return <Verify setStep={setStep} appearance={verifyAppearance} />;

    case LoginStateEnum.UserMetadataRequired:
      return <UserMetadata setStep={setStep} config={config} appearance={userMetadataAppearance} />;

    case LoginStateEnum.OrgCreationRequired:
      return <CreateOrg setStep={setStep} config={config} appearance={createOrgAppearance} />;

    default:
      return null;
  }
};
