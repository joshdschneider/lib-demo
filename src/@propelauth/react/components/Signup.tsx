import { SyntheticEvent, useState } from "react";
import { apiSignup, SignupOptions } from "../api";
import { Alert, Container, Divider, Image, Input, Button, H3 } from "../elements";
import { Config, useConfig } from "../state";
import { Appearance, getTokenFromURL } from "../utils";
import { SigninOptions } from "./shared/SigninOptions";

export type SignupProps = {
  onSuccess: VoidFunction;
  onRedirectToLogin?: VoidFunction;
  presetEmail?: string;
  appearance?: SignupAppearance;
};

export type SignupAppearance = {
  options?: {
    headerText?: string;
    showDivider?: boolean;
    // layout?
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
    SubmitButton?: Appearance;
    LoginLink?: Appearance;
    Alert?: Appearance;
  };
};

export const Signup = ({ onSuccess, onRedirectToLogin, presetEmail, appearance }: SignupProps) => {
  const { config } = useConfig();

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
      <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Signup"}</H3>
      <SigninOptions config={config} />
      {config.has_password_login && config.has_any_social_login && appearance?.options?.showDivider !== false && (
        <Divider appearance={appearance?.elements?.Divider} className="pa_divider" />
      )}
      {config.has_password_login && <SignupForm config={config} onSuccess={onSuccess} presetEmail={presetEmail} />}
      <BottomLinks onRedirectToLogin={onRedirectToLogin} appearance={appearance} />
    </Container>
  );
};

type SignupFormProps = {
  config: Config;
  presetEmail?: string;
  onSuccess?: VoidFunction;
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
      const response = await apiSignup(options);
      if (response.ok) {
        // ??
      } else if (response.error.errorName === "NotFound") {
        setError("Email not found");
      } else if (response.error.errorName === "Unauthorized") {
        setError("Unauthorized");
      } else if (response.error.errorName === "TooManyRequests") {
        setError("Too many signup attempts");
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
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
              className={"pa_input"}
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
              className={"pa_input"}
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
          className={"pa_input"}
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
            className={"pa_input"}
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
          className={"pa_input"}
        />
      </div>
      <Button
        appearance={appearance?.elements?.SubmitButton}
        loading={loading}
        className={"pa_button pa_button--action"}
      >
        Sign up
      </Button>
      {error && (
        <Alert appearance={appearance?.elements?.Alert} type={"error"}>
          {error}
        </Alert>
      )}
    </form>
  );
};

type BottomLinksProps = {
  onRedirectToLogin?: VoidFunction;
  appearance?: SignupAppearance;
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
          Log in
        </Button>
      )}
    </>
  );
};
