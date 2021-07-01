import React, { useState, useEffect } from "react";
import ReportTable from "./Report/ReportTable";
import { Button } from "@material-ui/core";
import { initialData } from "../utils/utils";
import {
  generateLlegadaAuto,
  generateTipoAuto,
  generateTiempoAtencion,
} from "../utils/generadores";
import { truncateValue } from "./Distributions/utils";
import { NewLlegadaAuto } from "./Eventos/NewLlegadaAuto";
import { NewAtencion } from "./Eventos/NewAtencion";

export default function Principal({}) {
  const [nroCabina, setNroCabina] = useState(1);
  const [vectores, setVectores] = useState(initialData);
  const [action, setAction] = useState({ tipo: "", tiempo: "" });
  const [columns, setColumns] = useState([
    "t",
    "Llegada auto",
    "Tipo auto",
    "Tiempo atención",
    "Cabina N",
    "Auxiliares",
  ]);
  const [subColumns, setSubColumns] = useState([
    "rnd",
    "tell",
    "prox_llegada",
    "rnd",
    "Tipo",
    "Costo",
    "rnd",
    "t_atención",
    "fin_atención",
    "Estado",
    "Cola",
    "Cant cabinas habil.",
    "Monto recaudado",
  ]);
  const [loading, setLoading] = useState(false);

  const addCabina = () => {
    let newVector = vectores.slice();

    newVector[0].cabinas.push({ id: nroCabina, estado: "L", cola: 0 });

    let newSubColumns = subColumns.slice(0, -2);
    newSubColumns.push(
      "Estado",
      "Cola",
      "Cant cabinas habil.",
      "Monto recaudado"
    );
    setSubColumns(newSubColumns);
    setNroCabina(nroCabina + 1);
    setVectores(newVector);
  };

  useEffect(() => {
    setLoading(true);
    let result = generateLlegadaAuto();
    let copyVectors = vectores.slice();

    copyVectors[0].llegada_auto.rnd = result.rnd;
    copyVectors[0].llegada_auto.tell = result.newTime;
    copyVectors[0].llegada_auto.prox_llegada = result.newTime;

    setVectores(copyVectors);
    setAction({ tipo: "llegada_auto", tiempo: result.newTime });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (action.tipo !== "") {
      switch (action.tipo) {
        case "llegada_auto":
          NewLlegadaAuto(vectores, setVectores, action, setAction);
          break;
        case "inicio_atencion":
          NewAtencion(vectores, setVectores, action, setAction);
          break;
        case "transicion":
          getNewEvento();
          break;
        default:
      }
    }
  }, [action]);

  const getNewEvento = () => {
    let id = vectores.length - 1;
    let copyVectors = vectores.slice();

    copyVectors.map((c) => {
      if (c.id === id) {
        if (c.llegada_auto.prox_llegada < c.tiempo_atencion.fin_atencion) {
          setAction({
            tipo: "llegada_auto",
            tiempo: c.llegada_auto.prox_llegada,
          });
        } else {
          // if (c.llegada_auto.prox_llegada >= c.tiempo_atencion.fin_atencion) {
          //   setAction({
          //     tipo: "inicio_atencion",
          //     tiempo: c.tiempo_atencion.fin_atencion,
          //   });
          // }
        }
      }
    });
  };

  return (
    <ReportTable
      items={vectores}
      columns={columns}
      subColumns={subColumns}
      loading={loading}
      nroCabina={nroCabina}
    >
      <Button variant="contained" onClick={addCabina}>
        Default
      </Button>
    </ReportTable>
  );
}
