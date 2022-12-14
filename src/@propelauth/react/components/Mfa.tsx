import { useEffect, useState } from "react";
import {
  Alert,
  AlertProps,
  Button,
  ButtonProps,
  Container,
  ContainerProps,
  H3,
  H3Props,
  Image,
  ImageProps,
  Input,
  InputProps,
  Label,
  LabelProps,
  Modal,
  ModalProps,
  Paragraph,
  ParagraphProps,
} from "../elements";
import { ElementAppearance, useClient } from "../state";

export type MfaProps = {
  appearance?: MfaAppearance;
};

export type MfaAppearance = {
  options?: {
    //..
  };
  elements?: {
    Container?: ElementAppearance<ContainerProps>;
    EnableMfaButton?: ElementAppearance<ButtonProps>;
    EnableMfaModal?: ElementAppearance<ModalProps>;
    EnableMfaModalHeader?: ElementAppearance<H3Props>;
    EnableMfaModalText?: ElementAppearance<ParagraphProps>;
    EnableMfaModalButton?: ElementAppearance<ButtonProps>;
    QrCodeImage?: ElementAppearance<ImageProps>;
    QrSecretInput?: ElementAppearance<InputProps>;
    CodeLabel?: ElementAppearance<LabelProps>;
    CodeInput?: ElementAppearance<InputProps>;
    DisableMfaButton?: ElementAppearance<ButtonProps>;
    DisableMfaModal?: ElementAppearance<ModalProps>;
    DisableMfaModalText?: ElementAppearance<ParagraphProps>;
    DisableMfaModalButton?: ElementAppearance<ButtonProps>;
    ShowBackupCodesButton?: ElementAppearance<ButtonProps>;
    BackupCodesModal?: ElementAppearance<ModalProps>;
    BackupCodesHeader?: ElementAppearance<H3Props>;
    BackupCodesText?: ElementAppearance<ParagraphProps>;
    BackupCodeInput?: ElementAppearance<InputProps>;
    DownloadBackupCodesButton?: ElementAppearance<ButtonProps>;
    CloseEnableMfaModalButton?: ElementAppearance<ButtonProps>;
    CloseDisableMfaModalButton?: ElementAppearance<ButtonProps>;
    CloseBackupCodesButton?: ElementAppearance<ButtonProps>;
    ErrorMessage?: ElementAppearance<AlertProps>;
  };
};

export type MfaStatus = "Loading" | "Error" | "Enabled" | "Disabled";

export const Mfa = ({ appearance }: MfaProps) => {
  const { mfaApi } = useClient();
  const [mfaStatus, setMfaStatus] = useState<MfaStatus>("Loading");
  const [showQr, setShowQr] = useState(true);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [code, setCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [newQr, setNewQr] = useState("");
  const [newSecret, setNewSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await mfaApi.mfaStatus();
        if (res.ok) {
          if (res.body.type === "Enabled") {
            setMfaStatus(res.body.type);
            setBackupCodes(res.body.backupCodes);
          } else if (res.body.type === "Disabled") {
            setMfaStatus(res.body.type);
            setNewSecret(res.body.newSecret);
            setNewQr(res.body.newQr);
          }
        } else {
          setMfaStatus("Error");
        }
      } catch (e) {
        setMfaStatus("Error");
        console.error(e);
      }
    }

    fetchStatus();
  }, [mfaStatus, mfaApi]);

  async function enableMfa() {
    try {
      setLoading(true);
      const res = await mfaApi.mfaEnable({ code });
      if (res.ok) {
        setShowEnableModal(false);
        setCode("");
        setError(undefined);
        setMfaStatus("Enabled");
      } else {
        res.error._visit({
          notFoundMfaEnable: () => setError("Not found"),
          badRequestMfaEnable: () => setError("Something went wrong"),
          forbiddenMfaEnable: () => setError("Forbidden"),
          unauthorized: () => setError("Unauthorized"),
          _other: () => setError("Something went wrong"),
        });
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function disableMfa() {
    try {
      setLoading(true);
      const res = await mfaApi.mfaDisable();
      if (res.ok) {
        setShowDisableModal(false);
        setError(undefined);
        setMfaStatus("Disabled");
      } else {
        res.error._visit({
          notFoundMfaDisable: () => setError("Not found"),
          unauthorized: () => setError("Unauthorized"),
          _other: () => setError("Something went wrong"),
        });
      }
    } catch (e) {
      setError("Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function downloadBackupCodes() {
    try {
      const codesToText = backupCodes.join(" ");
      const blob = new Blob([codesToText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "backup-codes.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      setError("Download failed");
      console.error(e);
    }
  }

  if (mfaStatus === "Loading") {
    return (
      <div data-contain="component">
        <Container appearance={appearance?.elements?.Container}>
          <Button appearance={appearance?.elements?.EnableMfaButton}>Loading...</Button>
        </Container>
      </div>
    );
  }

  if (mfaStatus === "Error") {
    return (
      <div data-contain="component">
        <Container appearance={appearance?.elements?.Container}>
          <Alert type={"error"} appearance={appearance?.elements?.ErrorMessage}>
            2FA failed to load
          </Alert>
        </Container>
      </div>
    );
  }

  if (mfaStatus === "Enabled") {
    return (
      <div data-contain="component">
        <Container appearance={appearance?.elements?.Container}>
          <Button onClick={() => setShowDisableModal(true)} appearance={appearance?.elements?.DisableMfaButton}>
            Disable 2FA
          </Button>
          <Button onClick={() => setShowBackupModal(true)} appearance={appearance?.elements?.ShowBackupCodesButton}>
            Show Backup Codes
          </Button>
        </Container>
        <Modal
          show={showDisableModal}
          setShow={setShowDisableModal}
          appearance={appearance?.elements?.DisableMfaModal}
          onClose={() => setError(undefined)}
        >
          <Paragraph appearance={appearance?.elements?.DisableMfaModalText}>
            Are you sure you want to disable 2FA?
          </Paragraph>
          <Button loading={loading} onClick={disableMfa} appearance={appearance?.elements?.DisableMfaModalButton}>
            Disable 2FA
          </Button>
          <Button
            onClick={() => setShowDisableModal(false)}
            appearance={appearance?.elements?.CloseEnableMfaModalButton}
          >
            Cancel
          </Button>
          {error && (
            <Alert type={"error"} appearance={appearance?.elements?.ErrorMessage}>
              {error}
            </Alert>
          )}
        </Modal>
        <Modal show={showBackupModal} setShow={setShowBackupModal} appearance={appearance?.elements?.BackupCodesModal}>
          <H3 appearance={appearance?.elements?.BackupCodesHeader}>Backup Codes</H3>
          <Paragraph appearance={appearance?.elements?.BackupCodesText}>
            Backup codes are one-time codes you can use to login if you can't access your authenticator app.
          </Paragraph>
          <div data-contain="backup_codes">
            {backupCodes.map((code, i) => {
              return <Input key={i} value={code} readOnly appearance={appearance?.elements?.BackupCodeInput} />;
            })}
          </div>
          <Button onClick={downloadBackupCodes} appearance={appearance?.elements?.DownloadBackupCodesButton}>
            Download Backup Codes
          </Button>
          <Button onClick={() => setShowBackupModal(false)} appearance={appearance?.elements?.CloseBackupCodesButton}>
            Close
          </Button>
          {error && (
            <Alert type={"error"} appearance={appearance?.elements?.ErrorMessage}>
              {error}
            </Alert>
          )}
        </Modal>
      </div>
    );
  }

  return (
    <div data-contain="component">
      <Container appearance={appearance?.elements?.Container}>
        <Button onClick={() => setShowEnableModal(true)} appearance={appearance?.elements?.EnableMfaButton}>
          Enable 2FA
        </Button>
        <Modal
          show={showEnableModal}
          setShow={setShowEnableModal}
          appearance={appearance?.elements?.EnableMfaButton}
          onClose={() => setError(undefined)}
        >
          <H3 appearance={appearance?.elements?.EnableMfaModalHeader}>Enable 2FA</H3>
          <Paragraph appearance={appearance?.elements?.EnableMfaModalText}>
            Two-Factor Authentication makes your account more secure by requiring a code in addition to your normal
            login. You&#39;ll need an Authenticator app like Google Authenticator or Authy.
          </Paragraph>
          <div data-contain="qr_code">
            {showQr ? (
              <>
                <Image
                  src={`data:image/png;base64,${newQr}`}
                  alt={"qr code"}
                  appearance={appearance?.elements?.QrCodeImage}
                />
                <div onClick={() => setShowQr(false)}>
                  <small>Not working? Enter a code instead</small>
                </div>
              </>
            ) : (
              <>
                <Input
                  onChange={() => null}
                  type="text"
                  value={newSecret}
                  readOnly
                  appearance={appearance?.elements?.QrSecretInput}
                />
                <div onClick={() => setShowQr(true)}>
                  <small>Prefer an image? Scan a QR code instead</small>
                </div>
              </>
            )}
          </div>
          <div>
            <Label htmlFor={"code"} appearance={appearance?.elements?.CodeLabel}>
              Enter the 6-digit code from the app
            </Label>
            <Input
              id={"code"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              appearance={appearance?.elements?.CodeInput}
            />
          </div>
          <Button
            onClick={() => setShowEnableModal(false)}
            appearance={appearance?.elements?.CloseDisableMfaModalButton}
          >
            Cancel
          </Button>
          <Button onClick={enableMfa} appearance={appearance?.elements?.EnableMfaModalButton}>
            Enable 2FA
          </Button>
          {error && (
            <Alert type={"error"} appearance={appearance?.elements?.ErrorMessage}>
              {error}
            </Alert>
          )}
        </Modal>
      </Container>
    </div>
  );
};
