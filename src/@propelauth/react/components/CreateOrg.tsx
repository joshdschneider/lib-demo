import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { apiCreateOrg, CreateOrgOptions } from "../api/createOrg";
import { Alert, Container, Input, Label, Button, H3, Checkbox } from "../elements";
import { LoginState } from "../components";
import { Config } from "../state";

export type CreateOrgProps = {
  config: Config;
  setStep: Dispatch<SetStateAction<LoginState>>;
  // createOrgAppearance?
};

export const CreateOrg = ({ config, setStep }: CreateOrgProps) => {
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
