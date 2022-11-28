import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { apiUpdateMetadata, UpdateMetadataOptions } from "../api/updateMetadata";
import { Alert, Container, Input, Button, H3 } from "../elements";
import { LoginState } from "../components";
import { Config } from "../state";

export type CompleteAccountProps = {
  config: Config;
  setStep: Dispatch<SetStateAction<LoginState>>;
  // completeAccountAppearance?
};

export const CompleteAccount = ({ config, setStep }: CompleteAccountProps) => {
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
