import { Dispatch, MouseEvent, SetStateAction, SyntheticEvent, useState } from "react";
import { apiVerifyMfa } from "../api/verifyMfa";
import { apiLogin } from "../api/login";
import { apiUpdateMetadata, UpdateMetadataOptions } from "../api/updateMetadata";
import { apiCreateOrg, CreateOrgOptions } from "../api/createOrg";
import { Config, useConfig } from "../state";
import { Appearance } from "../utils";
import { SigninOptions } from "./shared/SigninOptions";
import { Alert, Container, Divider, Image, Input, Label, Button, H3, Paragraph, Checkbox } from "../elements";

export type LoginProps = {
  onSuccess: VoidFunction;
  onRedirectToSignup?: VoidFunction;
  onRedirectToForgotPassword?: VoidFunction;
  presetEmail?: string;
  appearance?: LoginAppearance;
};

export type LoginAppearance = {
  options?: {
    // ideas:
    // - greeting text?
    // - transition?
    // - divider?
    // - logo position? / show logo?
    // - layout
  };
  elements?: {
    Container?: Appearance;
    Logo?: Appearance;
    EmailInput?: Appearance;
    PasswordInput?: Appearance;
    SubmitButton?: Appearance;
    SignupLink?: Appearance;
    ForgotPasswordLink?: Appearance;
  };
};

export type LoginState = "LOGIN" | "2FA_REQUIRED" | "USER_METADATA_REQUIRED" | "ORG_CREATION_REQUIRED" | "FINISHED";

export const Login = ({
  onSuccess,
  onRedirectToSignup,
  onRedirectToForgotPassword,
  presetEmail,
  appearance,
}: LoginProps) => {
  const { config } = useConfig();
  const [step, setStep] = useState<LoginState>("LOGIN");

  switch (step) {
    case "LOGIN":
      return (
        <LoginOptions
          config={config}
          setStep={setStep}
          onRedirectToSignup={onRedirectToSignup}
          onRedirectToForgotPassword={onRedirectToForgotPassword}
          presetEmail={presetEmail}
          appearance={appearance}
        />
      );

    case "2FA_REQUIRED":
      return <Verify setStep={setStep} />;

    case "USER_METADATA_REQUIRED":
      return <CompleteAccount setStep={setStep} config={config} />;

    case "ORG_CREATION_REQUIRED":
      return <CreateOrg setStep={setStep} config={config} />;

    case "FINISHED":
      onSuccess();
      return null;

    default:
      return <SomethingWentWrong setStep={setStep} />;
  }
};

type LoginOptionsProps = {
  config: Config;
  setStep: Dispatch<SetStateAction<LoginState>>;
  onRedirectToSignup?: VoidFunction;
  onRedirectToForgotPassword?: VoidFunction;
  presetEmail?: string;
  appearance?: LoginAppearance;
};

const LoginOptions = ({
  config,
  setStep,
  onRedirectToSignup,
  onRedirectToForgotPassword,
  presetEmail,
  appearance,
}: LoginOptionsProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(presetEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const login = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const loginResult = await apiLogin({
        email: email,
        password: password,
      });
      setStep(loginResult.next_step);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

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
      <H3>Welcome</H3>
      {(config.has_passwordless_login || config.has_any_social_login) && <SigninOptions config={config} />}
      {config.has_password_login && config.has_any_social_login && <Divider className="pa_divider" />}
      {config.has_password_login && (
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
              className={"pa_input"}
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
              className={"pa_input"}
            />
          </div>
          <Button loading={loading} className={"pa_button pa_button--action"}>
            Login
          </Button>
          {error && <Alert type={"error"}>{error}</Alert>}
        </form>
      )}
      {(onRedirectToSignup || onRedirectToForgotPassword) && (
        <div className="pa_bottom-links">
          {onRedirectToSignup && (
            <Button
              onClick={onRedirectToSignup}
              appearance={appearance?.elements?.SignupLink}
              className={"pa_button pa_button--minimal"}
            >
              Sign up
            </Button>
          )}
          {onRedirectToForgotPassword && (
            <Button
              onClick={onRedirectToForgotPassword}
              appearance={appearance?.elements?.ForgotPasswordLink}
              className={"pa_button pa_button--minimal"}
            >
              Forgot password
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};

type VerifyProps = {
  setStep: Dispatch<SetStateAction<LoginState>>;
  // verifyAppearance?
};

const Verify = ({ setStep }: VerifyProps) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const codeLabel = `Enter the 6 digit code generated by your authenticator app:`;
  const backupCodeLabel = `Enter an unused backup code:`;
  const inputLabel = useBackupCode ? backupCodeLabel : codeLabel;

  const codeButtonText = `Enter a code from your authenticator app`;
  const backupCodeButtonText = `Lost your device? Enter a backup code`;
  const buttonText = useBackupCode ? codeButtonText : backupCodeButtonText;

  function toggleCodeType(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCode("");
    setError(undefined);
    setUseBackupCode(!useBackupCode);
  }

  async function verifyMfa(e: SyntheticEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const verifyMfaResult = await apiVerifyMfa({
        code,
        isBackupCode: useBackupCode,
      });
      setStep(verifyMfaResult.next_step);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className={"pa_container"}>
      <H3>{useBackupCode ? "Verify Backup Code" : "Verify"}</H3>
      <form onSubmit={verifyMfa}>
        <Paragraph>{inputLabel}</Paragraph>
        <div>
          <Input
            type={"text"}
            placeholder={"123456"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={"pa_input"}
          />
        </div>
        <Button loading={loading} className={"pa_button pa_button--action"}>
          {useBackupCode ? "Verify Backup Code" : "Verify"}
        </Button>
        {error && <Alert type={"error"}>{error}</Alert>}
      </form>
      <div className="pa_bottom-links">
        <Button onClick={toggleCodeType} className={"pa_button pa_button--minimal"}>
          {buttonText}
        </Button>
      </div>
    </Container>
  );
};

type CompleteAccountProps = {
  config: Config;
  setStep: Dispatch<SetStateAction<LoginState>>;
  // completeAccountAppearance?
};

const CompleteAccount = ({ config, setStep }: CompleteAccountProps) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  async function completeAccount(e: SyntheticEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const options: UpdateMetadataOptions = {};
      if (config.require_name) {
        options.firstName = firstName;
        options.lastName = lastName;
      }
      if (config.require_username) {
        options.username = username;
      }
      const completeAccountResult = await apiUpdateMetadata(options);
      setStep(completeAccountResult.next_step);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className={"pa_container"}>
      <H3>Complete your account</H3>
      <form onSubmit={completeAccount}>
        {config.require_name && (
          <>
            <div>
              <Input
                type={"text"}
                placeholder={"First name"}
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                className={"pa_input"}
              />
            </div>
            <div>
              <Input
                type={"text"}
                placeholder={"Last name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={"pa_input"}
              />
            </div>
          </>
        )}
        {config.require_username && (
          <div>
            <Input
              type={"text"}
              placeholder={"Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={"pa_input"}
            />
          </div>
        )}
        <Button loading={loading} className={"pa_button pa_button--action"}>
          Continue
        </Button>
        {error && <Alert type={"error"}>{error}</Alert>}
      </form>
    </Container>
  );
};

type CreateOrgProps = {
  config: Config;
  setStep: Dispatch<SetStateAction<LoginState>>;
  // createOrgAppearance?
};

const CreateOrg = ({ config, setStep }: CreateOrgProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [autojoinByDomain, setAutojoinByDomain] = useState(false);
  const [restrictToDomain, setRestrictToDomain] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const orgMetaname = config.orgs_metaname || "Organization";

  async function createOrg(e: SyntheticEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const options: CreateOrgOptions = {
        name,
        autojoinByDomain,
        restrictToDomain,
      };
      const createOrgResult = await apiCreateOrg(options);
      setStep(createOrgResult.next_step);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <H3>{`Create your ${orgMetaname}`}</H3>
      <form onSubmit={createOrg}>
        <div>
          <Input
            type={"text"}
            placeholder={orgMetaname + "name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor={"autojoin_by_domain"}>Auto-join by domain</Label>
          <Checkbox
            id={"autojoin_by_domain"}
            label={"Auto-join by domain"}
            checked={autojoinByDomain}
            onChange={(e) => setAutojoinByDomain(e.target.checked)}
            disabled={true}
          />
        </div>
        <div>
          <Checkbox
            id={"restrict_to_domain"}
            label={"Restrict to domain"}
            checked={restrictToDomain}
            onChange={(e) => setRestrictToDomain(e.target.checked)}
            disabled={true}
          />
        </div>
        <Button loading={loading} className={"pa_button pa_button--action"}>
          {`Create ${orgMetaname}`}
        </Button>
        {error && <Alert type={"error"}>{error}</Alert>}
        {/** handle joinable orgs & personal domains */}
      </form>
    </Container>
  );
};

type SomethingWentWrongProps = {
  setStep: Dispatch<SetStateAction<LoginState>>;
  // somethingWentWrongAppearance?
};

const SomethingWentWrong = ({ setStep }: SomethingWentWrongProps) => {
  return (
    <Container>
      <H3>Something went wrong</H3>
      <Paragraph>Looks like something went wrong. Please return to login.</Paragraph>
      <Button onClick={() => setStep("LOGIN")} className={"pa_button pa_button--action"}>
        Return to login
      </Button>
    </Container>
  );
};
