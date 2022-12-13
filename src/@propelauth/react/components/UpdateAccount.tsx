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
} from "../elements";
import { ElementAppearance, useClient } from "../state";

export type UpdateAccountProps = {
  appearance?: UpdateAccountAppearance;
};

export type UpdateAccountAppearance = {
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

export const UpdateAccount = ({ appearance }: UpdateAccountProps) => {
  return (
    <div data-contain="component">
      <Container>
        <UpdatePassword appearance={appearance} />
      </Container>
    </div>
  );
};

export type UpdatePasswordOptions = {
  password: string;
  currentPassword?: string;
};

export type UpdatePasswordProps = {
  appearance?: UpdateAccountAppearance;
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
