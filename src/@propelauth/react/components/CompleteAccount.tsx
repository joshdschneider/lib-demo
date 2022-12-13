import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { Config, ElementAppearance } from "../state";
import { LoginStateEnum } from "@propel-auth-fern/fe_v2-client/resources";
import {
  Alert,
  Container,
  Image,
  Input,
  Button,
  H3,
  AlertProps,
  ContainerProps,
  ImageProps,
  InputProps,
  ButtonProps,
  H3Props,
} from "../elements";

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
    Container?: ElementAppearance<ContainerProps>;
    Header?: ElementAppearance<H3Props>;
    Logo?: ElementAppearance<ImageProps>;
    FirstNameInput?: ElementAppearance<InputProps>;
    LastNameInput?: ElementAppearance<InputProps>;
    UsernameInput?: ElementAppearance<InputProps>;
    SubmitButton?: ElementAppearance<ButtonProps>;
    ErrorMessage?: ElementAppearance<AlertProps>;
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
    <div data-contain="component">
      <Container appearance={appearance?.elements?.Container}>
        {appearance?.options?.displayLogo && (
          <div data-contain="logo">
            <Image src={config.logo_url} alt={config.site_display_name} appearance={appearance?.elements?.Logo} />
          </div>
        )}
        <div data-contain="header">
          <H3 appearance={appearance?.elements?.Header}>
            {appearance?.options?.headerText || "Complete your account"}
          </H3>
        </div>
        <div data-contain="form">
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
                  />
                </div>
                <div>
                  <Input
                    type={"text"}
                    placeholder={"Last name"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    appearance={appearance?.elements?.LastNameInput}
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
                />
              </div>
            )}
            <Button loading={loading} appearance={appearance?.elements?.SubmitButton}>
              Continue
            </Button>
            {error && (
              <Alert appearance={appearance?.elements?.ErrorMessage} type={"error"}>
                {error}
              </Alert>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
};
