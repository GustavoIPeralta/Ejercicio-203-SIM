import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

const BodyReportTable = ({ items }) => {
  return (
    <TableBody>
      {items.map((item, index) => {
        return (
          <TableRow hover key={index}>
            <TableCell align={"center"}>{item.t}</TableCell>
            <TableCell align={"center"}>
              {item.llegadaTrabajo.rnd || "--"}
            </TableCell>
            <TableCell align={"center"}>
              {item.llegadaTrabajo.tipoTrabajo || "--"}
            </TableCell>
            <TableCell align={"center"}>
              {item.tiempoImpresion.rnd || "--"}
            </TableCell>
            <TableCell align={"center"}>
              {item.tiempoImpresion.tiempo || "--"}
            </TableCell>
            <TableCell align={"center"}>
              {item.tiempoImpresion.fin1 || "--"}
            </TableCell>
            <TableCell align={"center"}>
              {item.tiempoImpresion.fin2 || "--"}
            </TableCell>
            <TableCell align={"center"}>
              {item.estados.prensa1 || "--"}
            </TableCell>
            <TableCell align={"center"}>
              {item.estados.prensa2 || "--"}
            </TableCell>
            <TableCell align={"center"}>{item.utilidad.diaria}</TableCell>
            <TableCell align={"center"}>{item.utilidad.acumulada}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default BodyReportTable;
