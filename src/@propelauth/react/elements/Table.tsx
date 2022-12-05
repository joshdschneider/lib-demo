import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ReactNode, CSSProperties } from "react";

export type Column = ReactNode;

export type Row = {
  [key: string]: ReactNode;
};

export type TableProps = {
  columns: Column[];
  rows?: Row[];
  className?: string;
  style?: CSSProperties;
};

export type TablePropsWithAppearance = { appearance?: ElementAppearance<TableProps> } & TableProps;

export const Table = ({ columns, rows, appearance }: TablePropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Table;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return (
      <joinedProps.Element columns={columns} rows={rows} className={joinedProps.classes} style={joinedProps.styles} />
    );
  }

  return <elements.Table columns={columns} rows={rows} className={joinedProps.classes} style={joinedProps.styles} />;
};
