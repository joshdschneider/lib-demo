import { ChangeEventHandler, CSSProperties, MouseEventHandler, ReactNode } from "react";

export type ContainerProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type LogoProps = {
  src: string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
};

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  className?: string;
};

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type LinkProps = {
  href: string;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type Appearance = string | CSSProperties;
