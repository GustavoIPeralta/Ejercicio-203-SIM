import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

const BodyReportTable = ({ items }) => {
  const getColorRow = (trabajo, tiempo, id) => {
    let tipoTrabajo = trabajo.tipoTrabajo !== "No hay trabajo" ? true : false;
    let newTiempo = tiempo.tiempo ? true : false;
    if (!newTiempo && tipoTrabajo && id !== 0) {
      return { backgroundColor: "#ef473a" };
    } else {
      return { backgroundColor: "#d4d3dd" };
    }
  };
  return (
    <TableBody>
      {items.map((item, index) => {
        return (
          <TableRow
            hover
            key={index}
            style={getColorRow(
              item.llegadaTrabajo,
              item.tiempoImpresion,
              item.id
            )}
          >
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
              {item.tiempoImpresion.fin1
                ? item.tiempoImpresion.fin1 +
                  " (" +
                  item.tiempoImpresion.tipoFin1 +
                  ") "
                : "--"}
            </TableCell>
            <TableCell align={"center"}>
              {item.tiempoImpresion.fin2
                ? item.tiempoImpresion.fin2 +
                  " (" +
                  item.tiempoImpresion.tipoFin2 +
                  ") "
                : "--"}
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
