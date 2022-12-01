import { SyntheticEvent, useState } from "react";
import { apiSignup } from "../api";
import { Alert, Container, Image, Input, Button, H3 } from "../elements";
import { Config, useConfig } from "../state";
import { Appearance, getTokenFromURL } from "../utils";
import { SignInDivider } from "./shared/SignInDivider";
import { SignInOptions } from "./shared/SignInOptions";

export type SignupProps = {
  onSuccess: VoidFunction;
  onRedirectToLogin?: VoidFunction;
  presetEmail?: string;
  appearance?: SignupAppearance;
};

export type SignupAppearance = {
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
    FirstNameInput?: Appearance;
    LastNameInput?: Appearance;
    UsernameInput?: Appearance;
    EmailInput?: Appearance;
    PasswordInput?: Appearance;
    SocialButton?: Appearance;
    SubmitButton?: Appearance;
    LoginLink?: Appearance;
    Alert?: Appearance;
  };
};

export const Signup = ({ onSuccess, onRedirectToLogin, presetEmail, appearance }: SignupProps) => {
  const { config } = useConfig();

  return (
    <div data-contain="component">
      <Container appearance={appearance?.elements?.Container}>
        {appearance?.options?.displayLogo !== false && (
          <div data-contain="logo">
            <Image src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
          </div>
        )}
        <div data-contain="header">
          <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Signup"}</H3>
        </div>
        <SignInOptions config={config} buttonAppearance={appearance?.elements?.SocialButton} />
        {config.has_password_login && config.has_any_social_login && appearance?.options?.divider !== false && (
          <SignInDivider appearance={appearance?.elements?.Divider} options={appearance?.options?.divider} />
        )}
        {config.has_password_login && <SignupForm config={config} onSuccess={onSuccess} presetEmail={presetEmail} />}
        <BottomLinks onRedirectToLogin={onRedirectToLogin} appearance={appearance} />
      </Container>
    </div>
  );
};

export type SignupOptions = {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  inviteToken?: string;
};

type SignupFormProps = {
  onSuccess: VoidFunction;
  config: Config;
  presetEmail?: string;
  appearance?: SignupAppearance;
};

const SignupForm = ({ config, presetEmail, onSuccess, appearance }: SignupFormProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(presetEmail || "");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const signup = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const options: SignupOptions = {
        email: email,
        password: password,
      };
      if (config.require_name) {
        options.firstName = firstName;
        options.lastName = lastName;
      }
      if (config.require_username) {
        options.username = username;
      }
      const inviteToken = getTokenFromURL();
      if (inviteToken) {
        options.inviteToken = inviteToken;
      }
      // const response = await apiSignup(options);
      // if (response.ok) ..
      onSuccess();
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-contain="form">
      <form onSubmit={signup}>
        {config.require_name && (
          <>
            <div>
              <Input
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                appearance={appearance?.elements?.FirstNameInput}
              />
            </div>
            <div>
              <Input
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                appearance={appearance?.elements?.LastNameInput}
              />
            </div>
          </>
        )}
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
        {config.require_username && (
          <div>
            <Input
              required
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              appearance={appearance?.elements?.UsernameInput}
            />
          </div>
        )}
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
          Sign up
        </Button>
        {error && (
          <Alert appearance={appearance?.elements?.Alert} type={"error"}>
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
};

type BottomLinksProps = {
  onRedirectToLogin?: VoidFunction;
  appearance?: SignupAppearance;
};

const BottomLinks = ({ onRedirectToLogin, appearance }: BottomLinksProps) => {
  return (
    <div data-contain="link">
      {onRedirectToLogin && (
        <Button onClick={onRedirectToLogin} appearance={appearance?.elements?.LoginLink}>
          Log in
        </Button>
      )}
    </div>
  );
};
