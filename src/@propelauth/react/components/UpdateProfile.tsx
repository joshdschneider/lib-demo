import { FormEvent, useState } from "react";
import {
  Alert,
  AlertProps,
  Button,
  ButtonProps,
  Container,
  ContainerProps,
  H3,
  H3Props,
  Input,
  InputProps,
  Label,
  LabelProps,
  Modal,
  ModalProps,
  Paragraph,
} from "../elements";
import { ElementAppearance, useClient, useConfig } from "../state";

export type UpdateProfileProps = {
  appearance?: UpdateProfileAppearance;
};

export type UpdateProfileAppearance = {
  options?: {
    //..
  };
  elements?: {
    Container?: ElementAppearance<ContainerProps>;
    PasswordButton?: ElementAppearance<ButtonProps>;
    PasswordModal?: ElementAppearance<ModalProps>;
    PasswordModalHeader?: ElementAppearance<H3Props>;
    OldPasswordLabel?: ElementAppearance<LabelProps>;
    OldPasswordInput?: ElementAppearance<InputProps>;
    NewPasswordLabel?: ElementAppearance<LabelProps>;
    NewPasswordInput?: ElementAppearance<InputProps>;
    SubmitPasswordButton?: ElementAppearance<ButtonProps>;
    ClosePasswordModalButton?: ElementAppearance<ButtonProps>;
    Alert?: ElementAppearance<AlertProps>;
  };
};

export const UpdateProfile = ({ appearance }: UpdateProfileProps) => {
  const { config } = useConfig();
  return (
    <div data-contain="component">
      <Container>
        <UpdateEmail appearance={appearance} />
        {config.require_name && <UpdateName appearance={appearance} />}
        {config.require_username && <UpdateUsername appearance={appearance} />}
        <UpdatePassword appearance={appearance} />
      </Container>
    </div>
  );
};

export type UpdateEmailProps = {
  appearance?: UpdateProfileAppearance;
};

export const UpdateEmail = ({ appearance }: UpdateEmailProps) => {
  const { userApi } = useClient();
  const [email, setEmail] = useState(""); // get from user metadata
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      setLoading(true);
      const res = await userApi.updateEmail({ newEmail: email });
      if (res.ok) {
        setShowConfirmationModal(true);
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-contain="section">
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor={"email"}>Email</Label>
          <Input id={"email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button loading={loading}>Update Email</Button>
        {error && <Alert type={"error"}>{error}</Alert>}
      </form>
      <Modal show={showConfirmationModal} setShow={setShowConfirmationModal}>
        <Paragraph>
          {`We sent a confirmation email to ${email}. Please check your inbox to verify your email.`}
        </Paragraph>
        <Button onClick={() => setShowConfirmationModal(false)}>Ok</Button>
      </Modal>
    </div>
  );
};

export type UpdateNameProps = {
  appearance?: UpdateProfileAppearance;
};

export const UpdateName = ({ appearance }: UpdateNameProps) => {
  const { userApi } = useClient();
  const [firstName, setFirstName] = useState(""); // get from user metadata
  const [lastName, setLastName] = useState(""); // get from user metadata
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      setLoading(true);
      const res = await userApi.updateName({ firstName, lastName });
      if (res.ok) {
        setSuccess("Name updated successfully");
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-contain="section">
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor={"first_name"}>First name</Label>
          <Input
            id={"first_name"}
            type={"text"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={"Jane"}
          />
        </div>
        <div>
          <Label htmlFor={"last_name"}>First name</Label>
          <Input
            id={"last_name"}
            type={"text"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={"Doe"}
          />
        </div>
        <Button loading={loading}>Update Name</Button>
        {success && <Alert type={"success"}>{success}</Alert>}
        {error && <Alert type={"error"}>{error}</Alert>}
      </form>
    </div>
  );
};

export type UpdateUsernameProps = {
  appearance?: UpdateProfileAppearance;
};

export const UpdateUsername = ({ appearance }: UpdateUsernameProps) => {
  const { userApi } = useClient();
  const [username, setUsername] = useState(""); // get from user metadata
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      setLoading(true);
      const res = await userApi.updateUsername({ username });
      if (res.ok) {
        setSuccess("Username updated successfully");
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-contain="section">
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor={"username"}>Username</Label>
          <Input id={"username"} type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <Button loading={loading}>Update Username</Button>
        {success && <Alert type={"success"}>{success}</Alert>}
        {error && <Alert type={"error"}>{error}</Alert>}
      </form>
    </div>
  );
};

export type UpdatePasswordOptions = {
  password: string;
  currentPassword?: string;
};

export type UpdatePasswordProps = {
  appearance?: UpdateProfileAppearance;
};

export const UpdatePassword = ({ appearance }: UpdatePasswordProps) => {
  const { userApi } = useClient();
  const [hasPassword, setHasPassword] = useState(true); // get from user metadata
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const callToAction = hasPassword ? "Update Password" : "Set Password";
  const passwordLabel = hasPassword ? "New password" : "Password";

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();
      setLoading(true);
      let options: UpdatePasswordOptions = { password: newPassword };
      if (hasPassword) {
        options.currentPassword = oldPassword;
      }
      const res = await userApi.updatePassword(options);
      if (res.ok) {
        setOldPassword("");
        setNewPassword("");
        setHasPassword(true);
        setShowModal(false);
      } else {
        setError("Something went wrong");
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-contain="section">
      <Button onClick={() => setShowModal(true)} appearance={appearance?.elements?.PasswordButton}>
        {callToAction}
      </Button>
      <Modal show={showModal} setShow={setShowModal} appearance={appearance?.elements?.PasswordModal}>
        <form onSubmit={handleSubmit}>
          <H3 appearance={appearance?.elements?.PasswordModalHeader}>{callToAction}</H3>
          {hasPassword && (
            <div>
              <Label htmlFor={"old_password"} appearance={appearance?.elements?.OldPasswordLabel}>
                Old password
              </Label>
              <Input
                type={"password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                appearance={appearance?.elements?.OldPasswordInput}
              />
            </div>
          )}
          <div>
            <Label htmlFor={"new_password"} appearance={appearance?.elements?.NewPasswordLabel}>
              {passwordLabel}
            </Label>
            <Input
              type={"password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              appearance={appearance?.elements?.NewPasswordInput}
            />
          </div>
          <Button loading={loading} appearance={appearance?.elements?.SubmitPasswordButton}>
            {callToAction}
          </Button>
          <Button onClick={() => setShowModal(false)} appearance={appearance?.elements?.ClosePasswordModalButton}>
            Cancel
          </Button>
          {error && (
            <Alert type={"error"} appearance={appearance?.elements?.Alert}>
              {error}
            </Alert>
          )}
        </form>
      </Modal>
    </div>
  );
};