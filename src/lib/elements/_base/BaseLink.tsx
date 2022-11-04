import { AnchorHTMLAttributes, ReactNode } from "react";

export type NativeAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export type BaseLinkProps = NativeAnchorProps & {
  href: string;
  children: ReactNode;
};

export const BaseLink = ({ href, children, ...rest }: BaseLinkProps) => {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};
