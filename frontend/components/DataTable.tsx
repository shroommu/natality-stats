import type { ReactNode } from "react";
import { Card } from "./Card";
import { cx, ui } from "./uiStyles";

type CellValue = string | number | ReactNode;
type TableRow = Record<string, CellValue>;

type TableColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

type DataTableProps = {
  title: string;
  description?: string;
  columns: TableColumn[];
  rows: TableRow[];
  emptyMessage?: string;
};

export function DataTable({
  title,
  description,
  columns,
  rows,
  emptyMessage = "No rows to display.",
}: DataTableProps) {
  return (
    <Card title={title} description={description}>
      <div className={cx("overflow-x-auto", ui.radius, ui.border)}>
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-foreground/5 text-foreground/80">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cx(
                    "px-3 py-2 text-xs font-semibold uppercase tracking-wide",
                    column.align === "right" ? "text-right" : "text-left",
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-3 py-8 text-center text-sm text-foreground/60" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={`${String(row[columns[0]?.key] ?? "row")}-${index}`} className="border-t border-foreground/10">
                  {columns.map((column) => (
                    <td
                      key={`${column.key}-${index}`}
                      className={cx(
                        "px-3 py-2.5 text-foreground/90",
                        column.align === "right" ? "text-right" : "text-left",
                      )}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
