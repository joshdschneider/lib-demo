import { FormEvent, useState } from "react";
import { ElementAppearance } from "../state";
import { useClient } from "../state/useClient";
import { Invitation, useSelectedOrg } from "./ManageOrg";
import {
  Container,
  H3,
  Label,
  Input,
  Select,
  Button,
  Alert,
  ContainerProps,
  H3Props,
  LabelProps,
  InputProps,
  SelectProps,
  ButtonProps,
  AlertProps,
} from "../elements";

export type InviteUserProps = {
  orgId: string;
  onSuccess: (invitation: Invitation) => void;
  appearance?: InviteUserAppearance;
};

export type InviteUserAppearance = {
  options?: {
    //..
  };
  elements?: {
    Container?: ElementAppearance<ContainerProps>;
    Header?: ElementAppearance<H3Props>;
    EmailLabel?: ElementAppearance<LabelProps>;
    EmailInput?: ElementAppearance<InputProps>;
    RoleLabel?: ElementAppearance<LabelProps>;
    RoleSelect?: ElementAppearance<SelectProps>;
    SubmitButton?: ElementAppearance<ButtonProps>;
    ErrorMessage?: ElementAppearance<AlertProps>;
  };
};

export const InviteUser = ({ orgId, onSuccess, appearance }: InviteUserProps) => {
  const { orgUserApi } = useClient();
  const { inviteePossibleRoles } = useSelectedOrg({ orgId });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const disabled = !email;

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      setError(undefined);
      const options = { email, role, orgId };
      // const response = await orgUserApi.inviteUser(options)
      // if (response.ok) ..
      onSuccess({ email, role, status: "pending" });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (!inviteePossibleRoles || inviteePossibleRoles.length === 0) {
    const unauthorized = `You are not authorized to perform this action`;
    return (
      <div data-contain="component">
        <Container appearance={appearance?.elements?.Container}>
          <H3 appearance={appearance?.elements?.Header}>Invite User</H3>
          <Alert type={"error"} appearance={appearance?.elements?.ErrorMessage}>
            {unauthorized}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div data-contain="component">
      <Container appearance={appearance?.elements?.Container}>
        <div data-contain="header">
          <H3 appearance={appearance?.elements?.Header}>Invite User</H3>
        </div>
        <div data-contain="form">
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor={"email"} appearance={appearance?.elements?.EmailLabel}>
                Email
              </Label>
              <Input
                type={"email"}
                id={"email"}
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                appearance={appearance?.elements?.EmailInput}
              />
            </div>
            <div>
              <Label htmlFor={"role"} appearance={appearance?.elements?.RoleLabel}>
                Role
              </Label>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={inviteePossibleRoles.map((role) => {
                  return { label: role, value: role };
                })}
                appearance={appearance?.elements?.RoleSelect}
              />
            </div>
            <Button loading={loading} disabled={disabled} appearance={appearance?.elements?.SubmitButton}>
              Invite User
            </Button>
            {error && (
              <Alert type={"error"} appearance={appearance?.elements?.ErrorMessage}>
                {error}
              </Alert>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
};
