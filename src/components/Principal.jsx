import React, { useState, useEffect } from "react";
import { Grid, Button, Checkbox } from "@material-ui/core";
import ReportTable from "./Report/ReportTable";
import useAddVector from "./Hooks/useAddVector";
import DataEjercicio from "../data";
import { initialData } from "../utils/utils";

export default function Principal({}) {
  const [columns, setColumns] = useState([
    "t",
    "Llegada trabajo",
    "Fin impresión",
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
  const [distribImpresion, setDistribImpresion] = useState({ min: 2, max: 5 });
  const [tiposTrabajos, setTiposTrabajos] = useState([
    { id: 0, tipo: "TIPO 1", prob: 0.5, precio: 400 },
    { id: 1, tipo: "TIPO 2", prob: 0.2, precio: 200 },
    { id: 2, tipo: "SIN TRABAJO", prob: 0.3, precio: null },
  ]);
  const [diasSim, setDiasSim] = useState(100);
  const [aceptTipo2, setAceptTipo2] = useState(true);

  useEffect(() => {
    if (generateSimulacion) {
      getSimulation(distribImpresion, tiposTrabajos, diasSim, aceptTipo2);
      setGenerateSimulacion(false);
    }
  }, [generateSimulacion]);

  return (
    <Grid container spacing={2} style={{ backgroundColor: "gray" }}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <span>EJERCICIO 203</span>
      </Grid>

      <DataEjercicio
        distribImpresion={distribImpresion}
        setDistribImpresion={setDistribImpresion}
        tiposTrabajos={tiposTrabajos}
        setTiposTrabajos={setTiposTrabajos}
      />

      <Grid item xs={12} style={{ textAlign: "center" }}>
        <label>Simulación: </label>
        <input
          value={diasSim}
          style={{ width: "5%", textAlign: "center" }}
          onChange={(e) => setDiasSim(Number(e.target.value))}
        ></input>
        <label> semanas</label>
        <br></br>
        <label>Acepta tipo 2: </label>
        <Checkbox
          checked={aceptTipo2}
          color="default"
          onChange={() => setAceptTipo2(!aceptTipo2)}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <br></br>
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
