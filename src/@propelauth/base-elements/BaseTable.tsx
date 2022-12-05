import { BaseTableProps } from "./_types";
import { prepend } from "./_utils";

export const BaseTable = ({ columns, rows, className, ...rest }: BaseTableProps) => {
  return (
    <table className={prepend("BaseTable", className)} {...rest}>
      <tbody>
        <tr>
          {columns.map((col, i) => {
            return <th key={i}>{col}</th>;
          })}
        </tr>
        {!rows || !rows.length ? (
          <tr>
            <td>{"None"}</td>
          </tr>
        ) : (
          rows.map((row, i) => {
            return (
              <tr key={i}>
                {Object.values(row).map((data, j) => {
                  return <td key={j}>{data}</td>;
                })}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
