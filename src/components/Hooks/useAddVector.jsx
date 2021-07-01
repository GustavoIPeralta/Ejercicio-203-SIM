import React from "react";
import { useState, useEffect } from "react";
import {
  initialData,
  getTiempoImpresion,
  getDataVector,
} from "../../utils/utils";

const useAddVector = () => {
  const [vectores, setVectores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVectores(initialData);
  }, []);
  const getSimulation = async () => {
    let copyVectors = vectores.slice();

    for (let i = 0; i < 15; i++) {
      let newVector = await addNewVector(copyVectors);

      copyVectors.push(newVector);
    }
    setVectores(copyVectors);
  };

  const addNewVector = async (copyVectors) => {
    let lastVector = [...copyVectors].pop();
    let dataVector = await getDataVector(lastVector, copyVectors);

    const {
      rndTipo,
      tipoTrabajo,
      rndTiempo,
      tiempoImpresion,
      prensaToAssign,
      dailyUtility,
    } = dataVector;

    let newData = {
      id: copyVectors.length,
      t: copyVectors.length,
      llegadaTrabajo: { rnd: rndTipo, tipoTrabajo: tipoTrabajo },
      tiempoImpresion: {
        rnd: rndTiempo,
        tiempo: tiempoImpresion,
        fin1:
          tiempoImpresion && prensaToAssign === 1
            ? Number(tiempoImpresion) + copyVectors.length
            : lastVector.tiempoImpresion.fin1,
        fin2:
          tiempoImpresion && prensaToAssign === 2
            ? Number(tiempoImpresion) + copyVectors.length
            : lastVector.tiempoImpresion.fin2,
      },
      estados: {
        prensa1:
          tiempoImpresion && prensaToAssign === 1
            ? "Ocupada"
            : lastVector.estados.prensa1,
        prensa2:
          tiempoImpresion && prensaToAssign === 2
            ? "Ocupada"
            : lastVector.estados.prensa2,
      },
      utilidad: {
        diaria: dailyUtility,
        acumulada: lastVector.utilidad.acumulada + dailyUtility,
      },
    };
    return newData;
  };

  return { vectores, loading, getSimulation };
};

export default useAddVector;
