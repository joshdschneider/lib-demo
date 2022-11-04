import { AnchorHTMLAttributes, ReactNode } from "react";

export type NativeAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export type LinkProps = NativeAnchorProps & {
  href: string;
  children: ReactNode;
};

export const Link = ({ href, children, ...rest }: LinkProps) => {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};
