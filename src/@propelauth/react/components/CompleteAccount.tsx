import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { Alert, Container, Image, Input, Button, H3 } from "../elements";
import { Config } from "../state";
import { LoginStateEnum } from "@propel-auth-fern/fe_v2-client/api";
import { Appearance } from "../utils";

export type CompleteAccountProps = {
  config: Config;
  setStep: Dispatch<SetStateAction<LoginStateEnum>>;
  appearance?: CompleteAccountAppearance;
};

export type CompleteAccountAppearance = {
  options?: {
    headerText?: string;
    displayLogo?: boolean;
  };
  elements?: {
    Container?: Appearance;
    Header?: Appearance;
    Logo?: Appearance;
    FirstNameInput?: Appearance;
    LastNameInput?: Appearance;
    UsernameInput?: Appearance;
    SubmitButton?: Appearance;
    Alert?: Appearance;
  };
};

export interface UpdateMetadataOptions {
  username?: string;
  firstName?: string;
  lastName?: string;
}

export const CompleteAccount = ({ config, setStep, appearance }: CompleteAccountProps) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
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
      // const response = await apiUpdateMetadata(options);
      // if (response.ok) ..
      setStep(LoginStateEnum.OrgCreationRequired);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className={"pa_container"}>
      {appearance?.options?.displayLogo && (
        <div className="pa_logo-container">
          <Image
            src={config.logo_url}
            alt={config.site_display_name}
            appearance={appearance?.elements?.Logo}
            className={"pa_logo"}
          />
        </div>
      )}
      <H3 appearance={appearance?.elements?.Header}>{appearance?.options?.headerText || "Complete your account"}</H3>
      <form onSubmit={completeAccount}>
        {config.require_name && (
          <>
            <div>
              <Input
                type={"text"}
                placeholder={"First name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                appearance={appearance?.elements?.FirstNameInput}
                className={"pa_input"}
              />
            </div>
            <div>
              <Input
                type={"text"}
                placeholder={"Last name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                appearance={appearance?.elements?.LastNameInput}
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
              appearance={appearance?.elements?.UsernameInput}
              className={"pa_input"}
            />
          </div>
        )}
        <Button
          loading={loading}
          appearance={appearance?.elements?.SubmitButton}
          className={"pa_button pa_button--action"}
        >
          Continue
        </Button>
        {error && (
          <Alert appearance={appearance?.elements?.Alert} type={"error"}>
            {error}
          </Alert>
        )}
      </form>
    </Container>
  );
};
