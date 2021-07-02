import { getUtilidadTrabajo } from "../../utils/utils";

export const getNewUtilidad = async (lastVector, copyVectors) => {
  //Solo hay una utilidad diaria si hay un cambio de estado de Ocupada a Libre

  let stateFree =
    lastVector.estados.prensa1 === "Libre" &&
    lastVector.estados.prensa2 === "Libre"
      ? true
      : false;

  let newDailyUtility = 0;
  let utilityPrevious = lastVector.utilidad.acumulada;

  //Si las dos prensas estan libres no pasa nada por eso sigo la condición de si alguna esta Ocupada
  if (!stateFree) {
    //Alguna o las dos prensas estan ocupadas en el día anterior

    let utilityPrensa1 =
      lastVector.estados.prensa1 === "Libre"
        ? 0
        : Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1)
        ? getUtilidadTrabajo(lastVector.tiempoImpresion.tipoFin1)
        : 0;

    let utilityPrensa2 =
      lastVector.estados.prensa2 === "Libre"
        ? 0
        : Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
        ? getUtilidadTrabajo(lastVector.tiempoImpresion.tipoFin2)
        : 0;

    newDailyUtility = Number(utilityPrensa1) + Number(utilityPrensa2);
  }
  return {
    diaria: newDailyUtility,
    acumulada: Number(newDailyUtility) + Number(utilityPrevious),
  };
};
