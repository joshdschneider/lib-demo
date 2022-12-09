import { TableProps } from "../@propelauth/react";

export const CoolTable = (props: TableProps) => {
  const { columns, rows, className, ...rest } = props;
  return (
    <table className={"cool-table"} {...rest}>
      <tbody>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
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
