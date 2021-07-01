import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

const HeaderReportTable = ({ columns, subColumns }) => {
  const propColSpan = (column) => {
    switch (column) {
      case "t":
        return 1;
        break;
      case "Llegada trabajo":
        return 2;
        break;
      case "Tiempo impresión":
        return 4;
        break;
      case "Utilidad":
        return 2;
        break;
      default:
    }
  };

  const propRowSpan = (column) => {
    if (column === "t") {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <TableHead style={{ maxHeight: 15 }}>
      <TableRow>
        {columns.map((column, index) => {
          return (
            <TableCell
              colSpan={propColSpan(column)}
              rowSpan={propRowSpan(column)}
              align="center"
              style={{
                backgroundColor: "#348AC7",
                color: "#fff",
                fontWeight: "bolder",
              }}
              key={index}
            >
              {column}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        {subColumns.map((column, index) => {
          return (
            <TableCell
              align="center"
              style={{
                backgroundColor: "#348AC7",
                color: "#fff",
                fontWeight: "bolder",
              }}
              key={index}
            >
              {column}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default HeaderReportTable;
