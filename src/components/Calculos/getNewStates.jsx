export const getNewEstados = async (tipoTrabajo, lastVector, copyVectors) => {
  let stateOccupied =
    lastVector.estados.prensa1 === "Ocupada" &&
    lastVector.estados.prensa2 === "Ocupada"
      ? true
      : false;

  let newStatePrensas = { prensa1: "", prensa2: "" };

  if (tipoTrabajo !== "No hay trabajo") {
    if (stateOccupied) {
      //Llegó un trabajo y las dos prensas en el día anterior estaban ocupadas. Tengo que ver si alguna prensa en este día se desocupó.

      //Valor que determina si algún trabajo anterior ya terminó
      let isFinish =
        Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1) ||
        Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
          ? true
          : false;

      if (isFinish) {
        //Alguna prensa o las dos se liberan en este nuevo vector

        //Estado de las prensas en el nuevo vector
        newStatePrensas.prensa1 =
          Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1)
            ? "Libre"
            : "Ocupada";
        newStatePrensas.prensa2 =
          Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
            ? "Libre"
            : "Ocupada";
      } else {
        newStatePrensas.prensa1 = "Ocupada";
        newStatePrensas.prensa2 = "Ocupada";
      }
    } else {
      //Alguna prensa en el tiempo anterior esta libre. Tengo que buscar cual prensa es.

      newStatePrensas.prensa1 =
        lastVector.estados.prensa1 === "Libre"
          ? "Libre"
          : Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1)
          ? "Libre"
          : "Ocupada";
      newStatePrensas.prensa2 =
        lastVector.estados.prensa2 === "Libre"
          ? "Libre"
          : Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin2)
          ? "Libre"
          : "Ocupada";
    }
  } else {
    //No llegan trabajos
    if (stateOccupied) {
      //Las dos prensas en el vector anterior estan ocupadas pero puede que en el nuevo vector se desocupen
      newStatePrensas.prensa1 =
        Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1)
          ? "Libre"
          : "Ocupada";
      newStatePrensas.prensa2 =
        Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
          ? "Libre"
          : "Ocupada";
    } else {
      newStatePrensas.prensa1 =
        lastVector.estados.prensa1 === "Libre"
          ? "Libre"
          : Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1)
          ? "Libre"
          : "Ocupada";
      newStatePrensas.prensa2 =
        lastVector.estados.prensa2 === "Libre"
          ? "Libre"
          : Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin2)
          ? "Libre"
          : "Ocupada";
    }
  }
  return newStatePrensas;
};
