import { SyntheticEvent, useEffect, useState } from "react";
import { LoginStateEnum } from "@propel-auth-fern/fe_v2-client/api";
import { apiLogin } from "../api";
import { useConfig } from "../state";
import { Appearance } from "../utils";
import { Alert, Container, Image, Input, Button, H3, Paragraph } from "../elements";
import {
  Verify,
  VerifyAppearance,
  CompleteAccount,
  CompleteAccountAppearance,
  CreateOrg,
  CreateOrgAppearance,
} from "../components";
import { SignInDivider } from "./shared/SignInDivider";
import { SignInOptions } from "./shared/SignInOptions";

export type LoginProps = {
  onSuccess: VoidFunction;
  onRedirectToSignup?: VoidFunction;
  onRedirectToForgotPassword?: VoidFunction;
  presetEmail?: string;
  appearance?: LoginAppearance;
  verifyAppearance?: VerifyAppearance;
  completeAccountAppearance?: CompleteAccountAppearance;
  createOrgAppearance?: CreateOrgAppearance;
};

export type LoginAppearance = {
  options?: {
    headerText?: string;
    displayLogo?: boolean;
    divider?: string | boolean;
  };
  elements?: {
    Container?: Appearance;
    Logo?: Appearance;
    Header?: Appearance;
    Divider?: Appearance;
    EmailInput?: Appearance;
    PasswordInput?: Appearance;
    SocialButton?: Appearance;
    SubmitButton?: Appearance;
    SignupLink?: Appearance;
    ForgotPasswordLink?: Appearance;
    Alert?: Appearance;
  };
};

export const Login = ({
  onSuccess,
  onRedirectToSignup,
  onRedirectToForgotPassword,
  presetEmail,
  appearance,
  verifyAppearance,
  completeAccountAppearance,
  createOrgAppearance,
}: LoginProps) => {
  const { config } = useConfig();
  const [step, setStep] = useState<LoginStateEnum>(LoginStateEnum.Login);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(presetEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const login = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const options = { email, password };
      // const response = await apiLogin(options);
      // if (response.ok) ..
      setStep(LoginStateEnum.TwoFactorRequired);
    } catch (e) {
      setError("Something went wrong");
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
    case LoginStateEnum.Login:
      return (
        <div data-contain="component">
          <Container appearance={appearance?.elements?.Container}>
            {appearance?.options?.displayLogo !== false && (
              <div data-contain="logo">
                <Image src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
              </div>
            )}
            <div data-contain="header">
              <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Welcome"}</H3>
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
                    <Input
                      required
                      type="email"
                      placeholder="Email"
                      value={email}
                      readOnly={!!presetEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      appearance={appearance?.elements?.EmailInput}
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
                    />
                  </div>
                  <Button appearance={appearance?.elements?.SubmitButton} loading={loading}>
                    Login
                  </Button>
                  {error && (
                    <Alert appearance={appearance?.elements?.Alert} type={"error"}>
                      {error}
                    </Alert>
                  )}
                </form>
              </div>
            )}
            {(onRedirectToSignup || onRedirectToForgotPassword) && (
              <div data-contain="links">
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
              </div>
            )}
          </Container>
        </div>
      );

    case LoginStateEnum.TwoFactorRequired:
      return <Verify setStep={setStep} appearance={verifyAppearance} />;

    case LoginStateEnum.UserMetadataRequired:
      return <CompleteAccount setStep={setStep} config={config} appearance={completeAccountAppearance} />;

    case LoginStateEnum.OrgCreationRequired:
      return <CreateOrg setStep={setStep} config={config} appearance={createOrgAppearance} />;

    case LoginStateEnum.Finished:
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
          <Button onClick={() => setStep(LoginStateEnum.Login)} className={"pa_button pa_button--action"}>
            Return to login
          </Button>
        </Container>
      );
  }
};
