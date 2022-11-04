import { Container, ContainerProps } from "./Container";
import { Logo, LogoProps } from "./Logo";
import { EmailInput, EmailInputProps } from "./EmailInput";
import { PasswordInput, PasswordInputProps } from "./PasswordInput";
import { SubmitButton, SubmitButtonProps } from "./SubmitButton";
import { Link, LinkProps } from "./Link";

export type StyledElements = {
  Container: (props: ContainerProps) => JSX.Element;
  Logo: (props: LogoProps) => JSX.Element;
  EmailInput: (props: EmailInputProps) => JSX.Element;
  PasswordInput: (props: PasswordInputProps) => JSX.Element;
  SubmitButton: (props: SubmitButtonProps) => JSX.Element;
  Link: (props: LinkProps) => JSX.Element;
};

export default {
  Container,
  Logo,
  EmailInput,
  PasswordInput,
  SubmitButton,
  Link,
};
