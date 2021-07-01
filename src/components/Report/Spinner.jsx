import React from "react";
import ReactLoading from "react-loading";
import { Grid } from "@material-ui/core";

export default function Spinner({ color, witdh, height, type, text }) {
  return (
    <Grid
      container
      spacing={2}
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <div>
        <Grid item className="col-12 col-md-12 d-flex justify-content-center">
          <div>
            <ReactLoading
              type={type}
              color={color}
              witdh={witdh}
              height={height}
            />
          </div>
        </Grid>
        <Grid item className="col-12 col-md-12 d-flex justify-content-center">
          <div>
            <p style={{ color: `${color}`, fontWeight: "bold" }}>{`${
              text || "Cargando..."
            }`}</p>
          </div>
        </Grid>
      </div>
    </Grid>
  );
}
