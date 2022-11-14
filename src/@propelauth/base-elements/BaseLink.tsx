import { BaseLinkProps } from "./_types";

export const BaseLink = ({ href, style, className, children }: BaseLinkProps) => {
  return (
    <a href={href} style={style} className={className}>
      {children}
    </a>
  );
};
