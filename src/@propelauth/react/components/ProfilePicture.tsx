import { ChangeEvent, ReactNode, useState } from "react";
import { ElementAppearance, useConfig } from "../state";
import {
  Container,
  Modal,
  Image,
  Button,
  Paragraph,
  Alert,
  ContainerProps,
  ImageProps,
  ModalProps,
  ButtonProps,
  ParagraphProps,
  AlertProps,
} from "../elements";

export type ProfilePictureProps = {
  appearance?: ProfilePictureAppearance;
};

export type ProfilePictureAppearance = {
  options?: {
    selectImageButtonContent?: ReactNode;
    saveImageButtonContent?: ReactNode;
  };
  elements?: {
    Container?: ElementAppearance<ContainerProps>;
    ProfilePicture?: ElementAppearance<ImageProps>;
    UploadModal?: ElementAppearance<ModalProps>;
    FileName?: ElementAppearance<ParagraphProps>;
    SelectImageButton?: ElementAppearance<ButtonProps>;
    SaveImageButton?: ElementAppearance<ButtonProps>;
    ErrorMessage?: ElementAppearance<AlertProps>;
  };
};

export const ProfilePicture = ({ appearance }: ProfilePictureProps) => {
  const { config } = useConfig();
  const [imageUrl, setImageUrl] = useState(config.profile_picture_url);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  async function handleSave() {
    try {
      setLoading(true);
      setError(undefined);
      // const response = await userApi.updateProfileImage(files[0])
      // if (response.ok) ..
      setImageUrl("https://img.propelauth.com/0c22cebe-681f-4725-a8f5-b81963484eb9.png");
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function clickFileInput() {
    const files = document.getElementById("files");
    if (files) {
      files.click();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFiles(e.target.files);
  }

  function onClose() {
    setShowUploadModal(false);
    setFiles(null);
  }

  return (
    <div data-contain="component">
      <Container appearance={appearance?.elements?.Container}>
        <div data-contain="profile_picture" onClick={() => setShowUploadModal(true)}>
          <Image src={imageUrl} alt={"profile picture"} appearance={appearance?.elements?.ProfilePicture} />
        </div>
      </Container>
      <Modal
        show={showUploadModal}
        setShow={setShowUploadModal}
        onClose={onClose}
        appearance={appearance?.elements?.UploadModal}
      >
        <div data-contain="upload">
          <input
            id={"files"}
            type={"file"}
            onChange={handleChange}
            accept={"image/*"}
            multiple={false}
            style={{ display: "none" }}
          />
          {!files ? (
            <Button onClick={clickFileInput} appearance={appearance?.elements?.SelectImageButton}>
              {appearance?.options?.selectImageButtonContent || "Select Image"}
            </Button>
          ) : (
            <Paragraph appearance={appearance?.elements?.FileName}>{files[0].name}</Paragraph>
          )}
          <Button
            loading={loading}
            onClick={handleSave}
            disabled={!files}
            appearance={appearance?.elements?.SaveImageButton}
          >
            {appearance?.options?.saveImageButtonContent || "Save Image"}
          </Button>
        </div>
        {error && (
          <Alert type={"error"} appearance={appearance?.elements?.ErrorMessage}>
            {error}
          </Alert>
        )}
      </Modal>
    </div>
  );
};
