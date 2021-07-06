import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import ReusableTable from "./ReusableTable";

const ReportTable = ({ items, columns, subColumns, loading, rango }) => {
  const filtrarItems = (data) => {
    let newItems = [];

    if (rango.i) {
      if (rango.j) {
        if (Number(rango.j) > Number(rango.i)) {
          newItems = data.filter((r) => r.id >= rango.i && r.id <= rango.j);
        } else {
          newItems = data.filter((r) => r.id >= rango.i);
        }
      } else {
        newItems = data.filter((r) => r.id >= rango.i);
      }
    } else {
      if (rango.j) {
        newItems = data.filter((r) => r.id <= rango.j);
      }
    }
    return newItems;
  };
  return (
    <Grid container spacing={2} style={{ height: 536 }}>
      <Grid item sm={12} className={"text-center"}>
        <ReusableTable
          columns={columns}
          subColumns={subColumns}
          items={!rango.i && !rango.j ? items : filtrarItems(items)}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default ReportTable;
