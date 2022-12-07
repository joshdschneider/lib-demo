import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { BaseElements } from "../../../@propelauth/base-elements";
import {
  AlertProps,
  ButtonProps,
  CheckboxProps,
  ContainerProps,
  DividerProps,
  H1Props,
  H3Props,
  H5Props,
  ImageProps,
  InputProps,
  LabelProps,
  LinkProps,
  ModalProps,
  ParagraphProps,
  PopoverProps,
  ProgressProps,
  SelectProps,
  TableProps,
} from "../elements";
import "../assets/base-styles.css";

export type Elements = {
  Alert: ForwardRefExoticComponent<AlertProps & RefAttributes<HTMLDivElement>>;
  Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;
  Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>>;
  Container: ForwardRefExoticComponent<ContainerProps & RefAttributes<HTMLDivElement>>;
  Divider: ForwardRefExoticComponent<DividerProps & RefAttributes<HTMLDivElement>>;
  H1: ForwardRefExoticComponent<H1Props & RefAttributes<HTMLHeadingElement>>;
  H3: ForwardRefExoticComponent<H3Props & RefAttributes<HTMLHeadingElement>>;
  H5: ForwardRefExoticComponent<H5Props & RefAttributes<HTMLHeadingElement>>;
  Image: ForwardRefExoticComponent<ImageProps & RefAttributes<HTMLImageElement>>;
  Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;
  Label: ForwardRefExoticComponent<LabelProps & RefAttributes<HTMLLabelElement>>;
  Link: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>;
  Modal: (props: ModalProps) => JSX.Element;
  Paragraph: ForwardRefExoticComponent<ParagraphProps & RefAttributes<HTMLParagraphElement>>;
  Popover: (props: PopoverProps) => JSX.Element;
  Progress: ForwardRefExoticComponent<ProgressProps & RefAttributes<HTMLSpanElement>>;
  Select: ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLSelectElement>>;
  Table: ForwardRefExoticComponent<TableProps & RefAttributes<HTMLTableElement>>;
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
  const [el, setEl] = useState(elements || DEFAULT_ELEMENTS);
  return <ElementsContext.Provider value={{ elements: el, setElements: setEl }}>{children}</ElementsContext.Provider>;
};

export const useElements = () => {
  const { elements, setElements } = useContext(ElementsContext);
  return { elements, setElements };
};
