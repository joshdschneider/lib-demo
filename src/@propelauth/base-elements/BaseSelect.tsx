import { BaseSelectProps } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>((props, ref) => {
  const { options, className, ...rest } = props;
  return (
    <select ref={ref} className={prepend("BaseSelect", className)} {...rest}>
      {options &&
        options.map((item, i) => {
          if ("options" in item) {
            return (
              <optgroup key={i} label={item.label}>
                {item.options.map((o, n) => {
                  return (
                    <option key={n} label={o.label || o.value} value={o.value}>
                      {o.label || o.value}
                    </option>
                  );
                })}
              </optgroup>
            );
          } else if ("value" in item) {
            return (
              <option key={i} label={item.label || item.value} value={item.value}>
                {item.label || item.value}
              </option>
            );
          } else {
            return null;
          }
        })}
    </select>
  );
});
