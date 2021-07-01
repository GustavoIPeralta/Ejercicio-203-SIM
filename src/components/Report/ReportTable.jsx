import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import ReusableTable from "./ReusableTable";

const ReportTable = ({ items, columns, subColumns, loading }) => {
  return (
    <Grid container spacing={2} style={{ height: 536 }}>
      <Grid item sm={12} className={"text-center"}>
        <ReusableTable
          columns={columns}
          subColumns={subColumns}
          items={items}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default ReportTable;
