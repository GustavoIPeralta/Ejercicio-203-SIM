import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";

const DataEjercicio = ({
  distribImpresion,
  setDistribImpresion,
  tiposTrabajos,
  setTiposTrabajos,
}) => {
  const handleChangeTipo = (e, id, name) => {
    let newTipos = tiposTrabajos.slice();
    if (name === "prob") {
      newTipos.forEach((tipo) => {
        if (tipo.id === id) {
          tipo.prob = e.target.value;
        }
      });
    } else {
      newTipos.forEach((tipo) => {
        if (tipo.id === id) {
          tipo.precio = e.target.value;
        }
      });
    }
    setTiposTrabajos(newTipos);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Grid container spacing={1} style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <span>OBJETOS:</span>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "end", paddingTop: 15 }}>
            <span style={{ fontWeight: "bold" }}>- Prensa 1</span>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "left" }}>
            <span>- Libre</span>
            <br></br>
            <span>- Ocupada</span>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "end", paddingTop: 15 }}>
            <span style={{ fontWeight: "bold" }}>- Prensa 2</span>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "left" }}>
            <span>- Libre</span>
            <br></br>
            <span>- Ocupada</span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={1} style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <span>EVENTOS:</span>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "end" }}>
            <span style={{ fontWeight: "bold" }}>- Llegada trabajo</span>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "left" }}>
            <span>- Todos los días</span>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "end" }}>
            <span style={{ fontWeight: "bold" }}>- Fin impresión</span>
          </Grid>
          <Grid item xs={2} style={{ textAlign: "left" }}>
            <span>- Uniforme</span>
            <br></br>
            <span>MIN </span>
            <input
              value={distribImpresion.min}
              style={{ width: "40%", textAlign: "center" }}
              onChange={(e) =>
                setDistribImpresion({
                  ...distribImpresion,
                  min: e.target.value,
                })
              }
            ></input>
            <br></br>
            <span>MAX </span>
            <input
              value={distribImpresion.max}
              style={{ width: "40%", textAlign: "center" }}
              onChange={(e) =>
                setDistribImpresion({
                  ...distribImpresion,
                  max: e.target.value,
                })
              }
            ></input>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid container spacing={1} style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <span>TIPOS TRABAJOS:</span>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold" }}>TIPOS</span>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold" }}>PROB</span>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold" }}>PRECIO</span>
          </Grid>
          {tiposTrabajos.map((item, index) => {
            return (
              <React.Fragment>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>-{item.tipo}</span>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <input
                    value={item.prob}
                    style={{ width: "40%", textAlign: "center" }}
                    onChange={(e) => handleChangeTipo(e, item.id, "prob")}
                  ></input>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  {index !== 2 && (
                    <input
                      value={item.precio}
                      style={{ width: "40%", textAlign: "center" }}
                      onChange={(e) => handleChangeTipo(e, item.id, "precio")}
                    ></input>
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DataEjercicio;
