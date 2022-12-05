import { useEffect, useState } from "react";
import { BasePopoverProps } from "./_types";
import { prepend } from "./_utils";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

export const BasePopover = ({
  referenceElement,
  show,
  setShow,
  placement,
  className,
  style,
  children,
}: BasePopoverProps) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [innerElement, setInnerElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: placement as Placement,
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
  });

  useEffect(() => {
    function outsideClickHandler(e: MouseEvent) {
      if (e.target) {
        const p = popperElement;
        const t = e.target as Element;
        const r = referenceElement as Element;
        if (!p?.contains(t) && !r.contains(t)) {
          setShow(false);
        }
      }
    }

    if (show) {
      if (update) {
        update();
        animatePopover("in", popperElement, innerElement);
        document.addEventListener("click", outsideClickHandler);
      }
    } else {
      animatePopover("out", popperElement, innerElement);
      return;
    }

    return () => document.removeEventListener("click", outsideClickHandler);
  }, [show, innerElement, popperElement, referenceElement, setShow, update]);

  return (
    <div
      ref={setPopperElement}
      className={prepend("BasePopover", className)}
      style={{ ...styles.popper, ...style }}
      {...attributes.popper}
    >
      <div ref={setInnerElement} className={"BasePopover--inner"}>
        {children}
      </div>
    </div>
  );
};

function animatePopover(dir: "in" | "out", el: Element | null, inner: Element | null) {
  switch (dir) {
    case "in":
      el?.setAttribute("data-show", "");
      setTimeout(() => inner?.setAttribute("data-show", ""), 10);
      return;
    case "out":
      inner?.removeAttribute("data-show");
      setTimeout(() => el?.removeAttribute("data-show"), 100);
      return;
  }
}
