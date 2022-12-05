import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ReactNode, CSSProperties, Dispatch, SetStateAction } from "react";

export type PopoverProps = {
  referenceElement: HTMLElement | null;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  placement?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type PopoverPropsWithAppearance = { appearance?: ElementAppearance<PopoverProps> } & PopoverProps;

export const Popover = ({
  referenceElement,
  show,
  setShow,
  placement,
  appearance,
  children,
}: PopoverPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Popover;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return (
      <joinedProps.Element
        referenceElement={referenceElement}
        show={show}
        setShow={setShow}
        placement={placement}
        className={joinedProps.classes}
        style={joinedProps.styles}
      >
        {children}
      </joinedProps.Element>
    );
  }

  return (
    <elements.Popover
      referenceElement={referenceElement}
      show={show}
      setShow={setShow}
      placement={placement}
      className={joinedProps.classes}
      style={joinedProps.styles}
    >
      {children}
    </elements.Popover>
  );
};
