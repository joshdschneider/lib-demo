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
        <Button onClick={loginWithSocial(GOOGLE_LOGIN_PATH)} className={"pa_button pa_button--social"}>
          <GoogleLogo />
          <span>Sign in with Google</span>
        </Button>
      )}
      {config.has_github_login && (
        <Button onClick={loginWithSocial(GITHUB_LOGIN_PATH)} className={"pa_button pa_button--social"}>
          <GithubLogo />
          <span>Sign in with Github</span>
        </Button>
      )}
      {config.has_slack_login && (
        <Button onClick={loginWithSocial(SLACK_LOGIN_PATH)} className={"pa_button pa_button--social"}>
          <SlackLogo />
          <span>Sign in with Slack</span>
        </Button>
      )}
      {config.has_microsoft_login && (
        <Button onClick={loginWithSocial(MICROSOFT_LOGIN_PATH)} className={"pa_button pa_button--social"}>
          <img src={""} alt={"Microsoft logo"} className={"pa_social-icon"} />
          <span>Sign in with Microsoft</span>
        </Button>
      )}
      {config.has_linkedin_login && (
        <Button onClick={loginWithSocial(LINKEDIN_LOGIN_PATH)} className={"pa_button pa_button--social"}>
          <img src={""} alt={"LinkedIn logo"} className={"pa_social-icon"} />
          <span>Sign in with LinkedIn</span>
        </Button>
      )}
      {config.has_passwordless_login && (
        <Button onClick={loginWithSocial(PASSWORDLESS_LOGIN_PATH)} className={"pa_button pa_button--social"}>
          <img src={""} alt={"Email icon"} className={"pa_social-icon"} />
          <span>Sign in with Email</span>
        </Button>
      )}
    </div>
  );
};

export const GoogleLogo = () => {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92">
      <path
        d="M90.0004 47.0998C90.0004 43.9998 89.7004 40.7998 89.2004 37.7998H45.9004V55.4998H70.7004C69.7004 61.1998 66.4004 66.1998 61.5004 69.3998L76.3004 80.8998C85.0004 72.7998 90.0004 60.9998 90.0004 47.0998Z"
        fill="#4280EF"
      />
      <path
        d="M45.9004 91.8999C58.3004 91.8999 68.7004 87.7999 76.3004 80.7999L61.5004 69.3999C57.4004 72.1999 52.1004 73.7999 45.9004 73.7999C33.9004 73.7999 23.8004 65.6999 20.1004 54.8999L4.90039 66.5999C12.7004 82.0999 28.5004 91.8999 45.9004 91.8999Z"
        fill="#34A353"
      />
      <path
        d="M20.1004 54.7999C18.2004 49.0999 18.2004 42.8999 20.1004 37.1999L4.90039 25.3999C-1.59961 38.3999 -1.59961 53.6999 4.90039 66.5999L20.1004 54.7999Z"
        fill="#F6B704"
      />
      <path
        d="M45.9004 18.2999C52.4004 18.1999 58.8004 20.6999 63.5004 25.1999L76.6004 11.9999C68.3004 4.19989 57.3004 -0.000110182 45.9004 0.0998898C28.5004 0.0998898 12.7004 9.89989 4.90039 25.3999L20.1004 37.1999C23.8004 26.2999 33.9004 18.2999 45.9004 18.2999Z"
        fill="#E54335"
      />
    </svg>
  );
};

export const GithubLogo = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C24.2763 30.1077 27.0363 28.0664 28.9917 25.3432C30.947 22.6201 31.9991 19.3524 32 16C32 7.16 24.84 0 16 0Z"
        fill="black"
      />
    </svg>
  );
};

export const SlackLogo = () => {
  return <svg></svg>;
};

export const MicrosoftLogo = () => {
  return <svg></svg>;
};

export const LinkedinLogo = () => {
  return <svg></svg>;
};

export const PasswordlessLogo = () => {
  return <svg></svg>;
};
