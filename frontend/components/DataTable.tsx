import type { ReactNode } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";

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
    <Card variant="outlined">
      <TableContainer>
        <Table size="small" aria-label={title}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align || "left"}
                  sx={{ fontWeight: 600, textTransform: "uppercase", fontSize: 12, letterSpacing: 1 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={columns.length} sx={{ color: "text.secondary", py: 4 }}>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={`${String(row[columns[0]?.key] ?? "row")}-${index}`}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${column.key}-${index}`}
                      align={column.align || "left"}
                    >
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
