import React, { useState, useEffect } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import ReportTable from "./Report/ReportTable";
import useAddVector from "./Hooks/useAddVector";
import { initialData } from "../utils/utils";

export default function Principal({}) {
  const [columns, setColumns] = useState([
    "t",
    "Llegada trabajo",
    "Tiempo impresión",
    "Prensa 1",
    "Prensa 2",
    "Utilidad",
  ]);
  const [subColumns, setSubColumns] = useState([
    "RND",
    "Tipo",
    "RND",
    "t_impresión",
    "fin 1",
    "fin 2",
    "Estado",
    "Estado",
    "Diaria",
    "Acumulada",
  ]);
  const { vectores, loading, getSimulation, setVectores } = useAddVector();
  const [generateSimulacion, setGenerateSimulacion] = useState(false);

  useEffect(() => {
    if (generateSimulacion) {
      getSimulation();
      setGenerateSimulacion(false);
    }
  }, [generateSimulacion]);

  return (
    <Grid container spacing={2} style={{ backgroundColor: "gray" }}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <span>EJERCICIO 203</span>
      </Grid>

      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <span>Objetos</span>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <span>Eventos</span>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setVectores(initialData);
            setGenerateSimulacion(true);
          }}
        >
          Simular
        </Button>
      </Grid>

      <Grid item xs={12} style={{ textAlign: "center" }}>
        <ReportTable
          items={vectores}
          columns={columns}
          subColumns={subColumns}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
}
