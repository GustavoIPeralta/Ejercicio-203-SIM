import React from "react";
import { useState, useEffect } from "react";
import { initialData, getTipoTrabajo } from "../../utils/utils";
import { getNewImpresion } from "../Calculos/getNewPrint";
import { getNewEstados } from "../Calculos/getNewStates";
import { getNewUtilidad } from "../Calculos/getNewUtility";

const useAddVector = () => {
  const [vectores, setVectores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVectores(initialData);
  }, []);

  const getSimulation = async (
    distribImpresion,
    tiposTrabajos,
    diasSim,
    aceptTipo2
  ) => {
    setLoading(true);
    let copyVectors = vectores.slice();
    let fin = diasSim * 5;
    for (let i = 0; i < fin; i++) {
      let newVector = await addNewVector(
        copyVectors,
        distribImpresion,
        tiposTrabajos,
        aceptTipo2
      );

      copyVectors.push(newVector);
    }
    setVectores(copyVectors);
    setLoading(false);
  };

  const addNewVector = async (
    copyVectors,
    distribImpresion,
    tiposTrabajos,
    aceptTipo2
  ) => {
    let lastVector = [...copyVectors].pop();

    let rndTipo = Math.random().toFixed(2);
    let tipoTrabajo = getTipoTrabajo(rndTipo, tiposTrabajos);

    //Nuevos datos
    let newImpresion = await getNewImpresion(
      tipoTrabajo,
      lastVector,
      copyVectors,
      distribImpresion,
      aceptTipo2
    );

    let newEstados = await getNewEstados(
      tipoTrabajo,
      lastVector,
      copyVectors,
      aceptTipo2
    );

    let newUtilidad = await getNewUtilidad(
      lastVector,
      copyVectors,
      tiposTrabajos
    );

    let newData = {
      id: copyVectors.length,
      t: copyVectors.length,
      llegadaTrabajo: { rnd: rndTipo, tipoTrabajo: tipoTrabajo },
      tiempoImpresion: newImpresion,
      estados: newEstados,
      utilidad: newUtilidad,
    };

    return newData;
  };

  return { vectores, loading, getSimulation, setVectores };
};

export default useAddVector;
