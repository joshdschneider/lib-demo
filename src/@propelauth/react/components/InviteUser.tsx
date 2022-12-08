import { FormEvent, useState } from "react";
import { Container, H3, Label, Input, Select, Button, Alert } from "../elements";
import { useClient } from "../state/useClient";
import { Invitation, useSelectedOrg } from "./ManageOrg";

export type InviteUserProps = {
  orgId: string;
  onSuccess: (invitation: Invitation) => void;
};

export const InviteUser = ({ orgId, onSuccess }: InviteUserProps) => {
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
        <Container>
          <H3>Invite User</H3>
          <Alert type={"error"}>{unauthorized}</Alert>
        </Container>
      </div>
    );
  }

  return (
    <div data-contain="component">
      <Container>
        <div data-contain="header">
          <H3>Invite User</H3>
        </div>
        <div data-contain="form">
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor={"email"}>Email</Label>
              <Input
                type={"email"}
                id={"email"}
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor={"role"}>Role</Label>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={inviteePossibleRoles.map((role) => {
                  return { label: role, value: role };
                })}
              />
            </div>
            <Button loading={loading} disabled={disabled}>
              Invite User
            </Button>
            {error && <Alert type={"error"}>{error}</Alert>}
          </form>
        </div>
      </Container>
    </div>
  );
};
