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
      // let aleatorios = {
      //   tipo: [0.3, 0.52, 0.5, 0.9, 0.9],
      //   tiempo: [0.1, 0.05, 0.1, 0.8, 0.5],
      // };
      let newVector = await addNewVector(copyVectors);

      copyVectors.push(newVector);
    }
    setVectores(copyVectors);
  };

  const addNewVector = async (copyVectors) => {
    let lastVector = [...copyVectors].pop();

    let rndTipo = Math.random().toFixed(2);
    // let rndTipo = aleatorios.tipo[i];
    let tipoTrabajo = getTipoTrabajo(rndTipo);

    //Nuevos datos
    let newImpresion = await getNewImpresion(
      tipoTrabajo,
      lastVector,
      copyVectors
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
