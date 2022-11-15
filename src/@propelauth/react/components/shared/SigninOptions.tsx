import { Button } from "../../elements";
import { Config } from "../../state";

export type SigninOptionsProps = {
  config: Config;
};

export const SigninOptions = ({ config }: SigninOptionsProps) => {
  return (
    <div>
      {config.has_google_login && (
        <Button onClick={() => null}>
          <img src={""} />
          <span>Sign in with Google</span>
        </Button>
      )}
      {config.has_github_login && (
        <Button onClick={() => null}>
          <img src={""} />
          <span>Sign in with Github</span>
        </Button>
      )}
      {config.has_slack_login && (
        <Button onClick={() => null}>
          <img src={""} />
          <span>Sign in with Slack</span>
        </Button>
      )}
      {config.has_microsoft_login && (
        <Button onClick={() => null}>
          <img src={""} />
          <span>Sign in with Microsoft</span>
        </Button>
      )}
      {config.has_linkedin_login && (
        <Button onClick={() => null}>
          <img src={""} />
          <span>Sign in with LinkedIn</span>
        </Button>
      )}
      {config.has_passwordless_login && (
        <Button onClick={() => null}>
          <img src={""} />
          <span>Sign in with Email</span>
        </Button>
      )}
    </div>
  );
};
