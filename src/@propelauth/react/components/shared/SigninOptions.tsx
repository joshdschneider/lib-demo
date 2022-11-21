import { useContext } from "react";
import { Button } from "../../elements";
import { AuthContext, Config } from "../../state";

export type SigninOptionsProps = {
  config: Config;
};

export const SigninOptions = ({ config }: SigninOptionsProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.authUrl) {
    throw new Error("Sign in options must be used within an AuthProvider");
  }

  const GOOGLE_LOGIN_PATH = "/google/login";
  const GITHUB_LOGIN_PATH = "/github/login";
  const SLACK_LOGIN_PATH = "/slack/login";
  const MICROSOFT_LOGIN_PATH = "/microsoft/login";
  const LINKEDIN_LOGIN_PATH = "/linkedin/login";
  const PASSWORDLESS_LOGIN_PATH = "/login_passwordless";

  const loginWithSocial = (path: string) => {
    const url = authContext.authUrl + path;
    return () => (window.location.href = url);
  };

  return (
    <div>
      {config.has_google_login && (
        <Button onClick={loginWithSocial(GOOGLE_LOGIN_PATH)}>
          <img src={""} alt={""} />
          <span>Sign in with Google</span>
        </Button>
      )}
      {config.has_github_login && (
        <Button onClick={loginWithSocial(GITHUB_LOGIN_PATH)}>
          <img src={""} alt={""} />
          <span>Sign in with Github</span>
        </Button>
      )}
      {config.has_slack_login && (
        <Button onClick={loginWithSocial(SLACK_LOGIN_PATH)}>
          <img src={""} alt={""} />
          <span>Sign in with Slack</span>
        </Button>
      )}
      {config.has_microsoft_login && (
        <Button onClick={loginWithSocial(MICROSOFT_LOGIN_PATH)}>
          <img src={""} alt={""} />
          <span>Sign in with Microsoft</span>
        </Button>
      )}
      {config.has_linkedin_login && (
        <Button onClick={loginWithSocial(LINKEDIN_LOGIN_PATH)}>
          <img src={""} alt={""} />
          <span>Sign in with LinkedIn</span>
        </Button>
      )}
      {config.has_passwordless_login && (
        <Button onClick={loginWithSocial(PASSWORDLESS_LOGIN_PATH)}>
          <img src={""} alt={""} />
          <span>Sign in with Email</span>
        </Button>
      )}
    </div>
  );
};
