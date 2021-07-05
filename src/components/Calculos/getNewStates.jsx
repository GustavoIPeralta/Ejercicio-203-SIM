export const getNewEstados = async (
  tipoTrabajo,
  lastVector,
  copyVectors,
  aceptTipo2
) => {
  let stateOccupied =
    lastVector.estados.prensa1 === "Ocupada" &&
    lastVector.estados.prensa2 === "Ocupada"
      ? true
      : false;

  let newStatePrensas = { prensa1: "", prensa2: "" };

  if (aceptTipo2) {
    if (tipoTrabajo !== "No hay trabajo") {
      if (stateOccupied) {
        //Llegó un trabajo y las dos prensas en el día anterior estaban ocupadas. Tengo que ver si alguna prensa en este día se desocupó.

        //Valor que determina si algún trabajo anterior ya terminó
        let isFinish =
          Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1) ||
          Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
            ? true
            : false;

        if (isFinish) {
          //Alguna prensa o las dos se liberan en este nuevo vector
          let stateFree =
            Number(copyVectors.length) >=
              Number(lastVector.tiempoImpresion.fin1) &&
            Number(copyVectors.length) >=
              Number(lastVector.tiempoImpresion.fin2)
              ? true
              : false;

          let prensaToAssign =
            Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1)
              ? 1
              : 2;
          //Estado de las prensas en el nuevo vector

          newStatePrensas.prensa1 = stateFree
            ? "Ocupada"
            : prensaToAssign === 1
            ? "Ocupada"
            : Number(copyVectors.length) >=
              Number(lastVector.tiempoImpresion.fin1)
            ? "Libre"
            : lastVector.estados.prensa1;

          newStatePrensas.prensa2 = stateFree
            ? "Libre"
            : prensaToAssign === 2
            ? "Ocupada"
            : Number(copyVectors.length) >=
              Number(lastVector.tiempoImpresion.fin2)
            ? "Libre"
            : lastVector.estados.prensa2;
          // newStatePrensas.prensa1 =
          //   Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1)
          //     ? "Libre"
          //     : "Ocupada";
          // newStatePrensas.prensa2 =
          //   Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
          //     ? "Libre"
          //     : "Ocupada";
        } else {
          newStatePrensas.prensa1 = "Ocupada";
          newStatePrensas.prensa2 = "Ocupada";
        }
      } else {
        //Alguna prensa en el tiempo anterior esta libre. Tengo que buscar cual prensa es.

        let stateFree =
          lastVector.estados.prensa1 === "Libre" &&
          lastVector.estados.prensa2 === "Libre"
            ? true
            : false;
        let prensaToAssign = lastVector.estados.prensa1 === "Libre" ? 1 : 2;

        //Si las dos estaban libres se setea la primera prensa
        newStatePrensas.prensa1 = stateFree
          ? "Ocupada"
          : prensaToAssign === 1
          ? "Ocupada"
          : Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1)
          ? "Libre"
          : lastVector.estados.prensa1;

        newStatePrensas.prensa2 = stateFree
          ? "Libre"
          : prensaToAssign === 2
          ? "Ocupada"
          : Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin2)
          ? "Libre"
          : lastVector.estados.prensa2;
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
  } else {
    if (tipoTrabajo === "Tipo 1") {
      if (stateOccupied) {
        //Llegó un trabajo y las dos prensas en el día anterior estaban ocupadas. Tengo que ver si alguna prensa en este día se desocupó.

        //Valor que determina si algún trabajo anterior ya terminó
        let isFinish =
          Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1) ||
          Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
            ? true
            : false;

        if (isFinish) {
          //Alguna prensa o las dos se liberan en este nuevo vector
          let stateFree =
            Number(copyVectors.length) >=
              Number(lastVector.tiempoImpresion.fin1) &&
            Number(copyVectors.length) >=
              Number(lastVector.tiempoImpresion.fin2)
              ? true
              : false;

          let prensaToAssign =
            Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1)
              ? 1
              : 2;
          //Estado de las prensas en el nuevo vector

          newStatePrensas.prensa1 = stateFree
            ? "Ocupada"
            : prensaToAssign === 1
            ? "Ocupada"
            : Number(copyVectors.length) >=
              Number(lastVector.tiempoImpresion.fin1)
            ? "Libre"
            : lastVector.estados.prensa1;

          newStatePrensas.prensa2 = stateFree
            ? "Libre"
            : prensaToAssign === 2
            ? "Ocupada"
            : Number(copyVectors.length) >=
              Number(lastVector.tiempoImpresion.fin2)
            ? "Libre"
            : lastVector.estados.prensa2;
          // newStatePrensas.prensa1 =
          //   Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1)
          //     ? "Libre"
          //     : "Ocupada";
          // newStatePrensas.prensa2 =
          //   Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
          //     ? "Libre"
          //     : "Ocupada";
        } else {
          newStatePrensas.prensa1 = "Ocupada";
          newStatePrensas.prensa2 = "Ocupada";
        }
      } else {
        //Alguna prensa en el tiempo anterior esta libre. Tengo que buscar cual prensa es.

        let stateFree =
          lastVector.estados.prensa1 === "Libre" &&
          lastVector.estados.prensa2 === "Libre"
            ? true
            : false;
        let prensaToAssign = lastVector.estados.prensa1 === "Libre" ? 1 : 2;

        //Si las dos estaban libres se setea la primera prensa
        newStatePrensas.prensa1 = stateFree
          ? "Ocupada"
          : prensaToAssign === 1
          ? "Ocupada"
          : Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1)
          ? "Libre"
          : lastVector.estados.prensa1;

        newStatePrensas.prensa2 = stateFree
          ? "Libre"
          : prensaToAssign === 2
          ? "Ocupada"
          : Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin2)
          ? "Libre"
          : lastVector.estados.prensa2;
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
  }

  return newStatePrensas;
};
