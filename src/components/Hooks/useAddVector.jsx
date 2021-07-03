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

  const getSimulation = async () => {
    let copyVectors = vectores.slice();

    for (let i = 0; i < 20; i++) {
      let aleatorios = {
        tipo: [0.24, 0.9, 0.21, 0.73, 0.21, 0.82, 0.43, 0.05, 0.12],
        tiempo: [0.26, 0.1, 0.87, 0.1, 0.33, 0.1, 0.1, 0.65, 0.1],
      };
      let newVector = await addNewVector(copyVectors, aleatorios, i);

      copyVectors.push(newVector);
    }
    setVectores(copyVectors);
  };

  const addNewVector = async (copyVectors, aleatorios, i) => {
    let lastVector = [...copyVectors].pop();

    // let rndTipo = Math.random().toFixed(2);
    let rndTipo = aleatorios.tipo[i];
    let tipoTrabajo = getTipoTrabajo(rndTipo);

    //Nuevos datos
    let newImpresion = await getNewImpresion(
      tipoTrabajo,
      lastVector,
      copyVectors,
      aleatorios,
      i
    );

    let newEstados = await getNewEstados(tipoTrabajo, lastVector, copyVectors);

    let newUtilidad = await getNewUtilidad(lastVector, copyVectors);

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

  return { vectores, loading, getSimulation };
};

export default useAddVector;
