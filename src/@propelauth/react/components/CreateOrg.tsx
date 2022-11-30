import { LoginStateEnum } from "@propel-auth-fern/fe_v2-client/api";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { apiCreateOrg } from "../api";
import { Alert, Container, Image, Input, Label, Button, H3, Checkbox } from "../elements";
import { Config } from "../state";
import { Appearance } from "../utils";

export type CreateOrgProps = {
  config: Config;
  setStep: Dispatch<SetStateAction<LoginStateEnum>>;
  appearance?: CreateOrgAppearance;
};

export type CreateOrgAppearance = {
  options?: {
    headerText?: string;
    displayLogo?: boolean;
  };
  elements?: {
    Container?: Appearance;
    Header?: Appearance;
    Logo?: Appearance;
    OrgNameInput?: Appearance;
    AutojoinByDomainCheckbox?: Appearance;
    RestrictToDomainCheckbox?: Appearance;
    SubmitButton?: Appearance;
    Alert?: Appearance;
  };
};

export const CreateOrg = ({ config, setStep, appearance }: CreateOrgProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [autojoinByDefault, setAutojoinByDefault] = useState(false);
  const [restrictToDomain, setRestrictToDomain] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const orgMetaname = config.orgs_metaname || "Organization";

  async function createOrg(e: SyntheticEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const options = {
        name,
        autojoinByDefault,
        restrictToDomain,
      };
      // const response = await apiCreateOrg(options);
      // if (response.ok) ..
      setStep(LoginStateEnum.Finished);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container appearance={appearance?.elements?.Container} className={"pa_container"}>
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
      <H3 appearance={appearance?.elements?.Header}>
        {appearance?.options?.headerText || `Create your ${orgMetaname}`}
      </H3>
      <form onSubmit={createOrg}>
        <div>
          <Input
            type={"text"}
            placeholder={orgMetaname + "name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={"pa_input"}
            appearance={appearance?.elements?.OrgNameInput}
            required
          />
        </div>
        <div>
          <Checkbox
            id={"autojoin_by_domain"}
            label={"Auto-join by domain"}
            checked={autojoinByDefault}
            onChange={(e) => setAutojoinByDefault(e.target.checked)}
            className={"pa_checkbox"}
            appearance={appearance?.elements?.AutojoinByDomainCheckbox}
            disabled={true}
          />
        </div>
        <div>
          <Checkbox
            id={"restrict_to_domain"}
            label={"Restrict to domain"}
            checked={restrictToDomain}
            onChange={(e) => setRestrictToDomain(e.target.checked)}
            className={"pa_checkbox"}
            appearance={appearance?.elements?.RestrictToDomainCheckbox}
            disabled={true}
          />
        </div>
        <Button
          loading={loading}
          appearance={appearance?.elements?.SubmitButton}
          className={"pa_button pa_button--action"}
        >
          {`Create ${orgMetaname}`}
        </Button>
        {error && (
          <Alert appearance={appearance?.elements?.Alert} type={"error"}>
            {error}
          </Alert>
        )}
        {/** handle joinable orgs & personal domains */}
      </form>
    </Container>
  );
};
