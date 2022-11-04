import { HTMLAttributes, ReactNode } from "react";

export type NativeDivProps = HTMLAttributes<HTMLDivElement>;

export type BaseContainerProps = NativeDivProps & {
  children: ReactNode;
};

export const BaseContainer = ({ children, ...rest }: BaseContainerProps) => {
  return <div {...rest}>{children}</div>;
};
