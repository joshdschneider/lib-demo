import { Dispatch, ReactNode, SetStateAction, SyntheticEvent, useState } from "react";
import { Config, ElementAppearance, useClient } from "../state";
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
  Label,
} from "../elements";
import { BAD_REQUEST_UPDATE_METADATA, NOT_FOUND_UPDATE_METADATA, UNEXPECTED_ERROR } from "./shared/constants";

export type UserMetadataProps = {
  config: Config;
  setStep: Dispatch<SetStateAction<LoginStateEnum>>;
  appearance?: UserMetadataAppearance;
};

export type UserMetadataAppearance = {
  options?: {
    headerContent?: ReactNode;
    displayLogo?: boolean;
    firstNameLabel?: ReactNode;
    lastNameLabel?: ReactNode;
    usernameLabel?: ReactNode;
    SubmitButtonContent?: ReactNode;
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

export const UserMetadata = ({ config, setStep, appearance }: UserMetadataProps) => {
  const { userApi, loginApi } = useClient();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  async function updateMetadata(e: SyntheticEvent) {
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
      const response = await userApi.updateMetadata(options);
      if (response.ok) {
        const status = await loginApi.loginState();
        if (status.ok) {
          setStep(status.body.loginState);
        } else {
          setError(UNEXPECTED_ERROR);
        }
      } else {
        response.error._visit({
          notFoundUpdateMetadata: () => setError(NOT_FOUND_UPDATE_METADATA),
          badRequestUpdateMetadata: () => setError(BAD_REQUEST_UPDATE_METADATA),
          _other: () => setError(UNEXPECTED_ERROR),
        });
      }
    } catch (e) {
      setError(UNEXPECTED_ERROR);
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
            {appearance?.options?.headerContent || "Complete your account"}
          </H3>
        </div>
        <div data-contain="form">
          <form onSubmit={updateMetadata}>
            {config.require_name && (
              <>
                <div>
                  <Label htmlFor="first_name">{appearance?.options?.firstNameLabel || "First name"}</Label>
                  <Input
                    id={"first_name"}
                    type={"text"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    appearance={appearance?.elements?.FirstNameInput}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">{appearance?.options?.lastNameLabel || "Last name"}</Label>
                  <Input
                    id={"last_name"}
                    type={"text"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    appearance={appearance?.elements?.LastNameInput}
                  />
                </div>
              </>
            )}
            {config.require_username && (
              <div>
                <Label htmlFor="username">{appearance?.options?.usernameLabel || "Username"}</Label>
                <Input
                  id={"username"}
                  type={"text"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  appearance={appearance?.elements?.UsernameInput}
                />
              </div>
            )}
            <Button loading={loading} appearance={appearance?.elements?.SubmitButton}>
              {appearance?.options?.SubmitButtonContent || "Continue"}
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
