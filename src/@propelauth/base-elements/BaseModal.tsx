import { useEffect, useState } from "react";
import { BaseModalProps } from "./_types";
import { prepend } from "./_utils";

export const BaseModal = ({ show, setShow, onClose, className, children, ...rest }: BaseModalProps) => {
  const [modalElement, setModalElement] = useState<HTMLDivElement | null>(null);
  const [innerElement, setInnerElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    function outsideClickHandler(e: MouseEvent) {
      if (e.target) {
        const m = modalElement;
        const i = innerElement;
        const t = e.target as Element;
        if (m?.contains(t) && !i?.contains(t)) {
          setShow(false);
        }
      }
    }

    if (show) {
      animateModal("in", modalElement, innerElement);
      document.addEventListener("click", outsideClickHandler);
    } else {
      animateModal("out", modalElement, innerElement);
      if (onClose) {
        onClose();
      }
      return;
    }

    return () => document.removeEventListener("click", outsideClickHandler);
  }, [show, innerElement, modalElement, onClose, setShow]);

  return (
    <div ref={setModalElement} className={prepend("BaseModal", className)}>
      <div ref={setInnerElement} className={"BaseModal--inner"} {...rest}>
        {children}
      </div>
    </div>
  );
};

function animateModal(dir: "in" | "out", el: Element | null, inner: Element | null) {
  switch (dir) {
    case "in":
      document.body.setAttribute("data-lock", "");
      el?.setAttribute("data-show", "");
      setTimeout(() => el?.setAttribute("data-animate", ""), 10);
      setTimeout(() => inner?.setAttribute("data-show", ""), 10);
      return;
    case "out":
      document.body.removeAttribute("data-lock");
      inner?.removeAttribute("data-show");
      el?.removeAttribute("data-animate");
      setTimeout(() => el?.removeAttribute("data-show"), 200);
      return;
  }
}
