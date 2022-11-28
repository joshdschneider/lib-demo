import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { BaseElements } from "../../../@propelauth/base-elements";
import {
  AlertProps,
  ContainerProps,
  ImageProps,
  InputProps,
  CheckboxProps,
  ButtonProps,
  LinkProps,
  H1Props,
  H3Props,
  H5Props,
  ParagraphProps,
} from "../elements";
import "../assets/elements.css";

export type Elements = {
  Alert: (props: AlertProps) => JSX.Element;
  Container: (props: ContainerProps) => JSX.Element;
  Image: (props: ImageProps) => JSX.Element;
  Input: (props: InputProps) => JSX.Element;
  Checkbox: (props: CheckboxProps) => JSX.Element;
  Button: (props: ButtonProps) => JSX.Element;
  Link: (props: LinkProps) => JSX.Element;
  H1: (props: H1Props) => JSX.Element;
  H3: (props: H3Props) => JSX.Element;
  H5: (props: H5Props) => JSX.Element;
  Paragraph: (props: ParagraphProps) => JSX.Element;
};

export type ElementsState = {
  elements: Elements;
  setElements: Dispatch<SetStateAction<Elements>>;
};

export const DEFAULT_ELEMENTS = BaseElements;

export const ElementsContext = createContext<ElementsState>({
  elements: DEFAULT_ELEMENTS,
  setElements: () => DEFAULT_ELEMENTS,
});

export type ElementsProviderProps = {
  elements?: Elements;
  children?: ReactNode;
};

export const ElementsProvider = ({ elements, children }: ElementsProviderProps) => {
  const [_elements, _setElements] = useState(elements || DEFAULT_ELEMENTS);

  return (
    <ElementsContext.Provider
      value={{
        elements: _elements,
        setElements: _setElements,
      }}
    >
      {children}
    </ElementsContext.Provider>
  );
};

export const useElements = () => {
  const { elements, setElements } = useContext(ElementsContext);
  return { elements, setElements };
};
