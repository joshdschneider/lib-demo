import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ReactNode, CSSProperties, Dispatch, SetStateAction } from "react";

export type ModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type ModalPropsWithAppearance = { appearance?: ElementAppearance<ModalProps> } & ModalProps;

export const Modal = ({ show, setShow, onClose, appearance, children }: ModalPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Modal;
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
        show={show}
        setShow={setShow}
        onClose={onClose}
        className={joinedProps.classes}
        style={joinedProps.styles}
      >
        {children}
      </joinedProps.Element>
    );
  }

  return (
    <elements.Modal
      show={show}
      setShow={setShow}
      onClose={onClose}
      className={joinedProps.classes}
      style={joinedProps.styles}
    >
      {children}
    </elements.Modal>
  );
};
