import { getTiempoImpresion } from "../../utils/utils";

export const getNewImpresion = async (
  tipoTrabajo,
  lastVector,
  copyVectors,
  aleatorios,
  i
) => {
  let stateOccupied =
    lastVector.estados.prensa1 === "Ocupada" &&
    lastVector.estados.prensa2 === "Ocupada"
      ? true
      : false;

  let rndImpresion = null;
  let tiempoImpresion = null;
  let prensaToAssign = null;
  let newStatePrensas = { prensa1: "", prensa2: "" };

  console.log(stateOccupied);

  if (tipoTrabajo !== "No hay trabajo") {
    alert("Hay trabajo");
    if (stateOccupied) {
      alert("Prensas ocupadas");
      //Llegó un trabajo y las dos prensas en el día anterior estaban ocupadas. Tengo que ver si alguna prensa en este día se desocupó.

      //Valor que determina si algún trabajo anterior ya terminó
      let isFinish =
        Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1) ||
        Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
          ? true
          : false;

      if (isFinish) {
        alert("Alguna se desocupa ahora");
        //Alguna prensa o las dos se liberan en este nuevo vector
        let stateFree =
          Number(copyVectors.length) >=
            Number(lastVector.tiempoImpresion.fin1) &&
          Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
            ? true
            : false;

        prensaToAssign =
          Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1)
            ? 1
            : 2;
        alert(prensaToAssign);
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
          ? "Ocupada"
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
        console.log(newStatePrensas);
      } else {
        alert("Ninguna se desocupa");
        newStatePrensas.prensa1 = "Ocupada";
        newStatePrensas.prensa2 = "Ocupada";
      }
    } else {
      // alert("Alguna prensa esta Libre");
      //Alguna prensa en el tiempo anterior esta libre. Tengo que buscar cual prensa es.
      let stateFree =
        lastVector.estados.prensa1 === "Libre" &&
        lastVector.estados.prensa2 === "Libre"
          ? true
          : false;
      // alert(stateFree);
      prensaToAssign = lastVector.estados.prensa1 === "Libre" ? 1 : 2;

      //Si las dos estaban libres se setea la primera prensa
      // alert(prensaToAssign);
      newStatePrensas.prensa1 = stateFree
        ? "Ocupada"
        : prensaToAssign === 1
        ? "Ocupada"
        : Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1)
        ? "Libre"
        : lastVector.estados.prensa1;

      newStatePrensas.prensa2 = stateFree
        ? "Libre"
        : prensaToAssign === 2
        ? "Ocupada"
        : Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
        ? "Libre"
        : lastVector.estados.prensa2;

      console.log(newStatePrensas);
    }
  } else {
    // alert("No llega trabajo");
    //No llegan trabajos
    if (stateOccupied) {
      // alert("Prensas ocupadas");
      //Las dos prensas en el vector anterior estan ocupadas pero puede que en el nuevo vector se desocupen
      newStatePrensas.prensa1 =
        Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin1)
          ? "Libre"
          : "Ocupada";
      newStatePrensas.prensa2 =
        Number(copyVectors.length) >= Number(lastVector.tiempoImpresion.fin2)
          ? "Libre"
          : "Ocupada";
      console.log(newStatePrensas);
    } else {
      // alert("Alguna esta libre");
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
      console.log(newStatePrensas);
    }
  }

  //Si tengo definido alguna prensa significa que tengo un trabajo y que puedo recibirlo
  if (prensaToAssign) {
    let newTipoTrabajo =
      tipoTrabajo === "Tipo 1" ? 1 : tipoTrabajo === "Tipo 2" ? 2 : null;
    // rndImpresion = Math.random().toFixed(2);
    rndImpresion = aleatorios.tiempo[i];
    tiempoImpresion = getTiempoImpresion(rndImpresion);
    return {
      rnd: rndImpresion,
      tiempo: tiempoImpresion,
      fin1:
        prensaToAssign === 1
          ? (copyVectors.length + Number(tiempoImpresion)).toFixed(2)
          : newStatePrensas.prensa1 === "Ocupada"
          ? lastVector.tiempoImpresion.fin1
          : null,
      fin2:
        prensaToAssign === 2
          ? (copyVectors.length + Number(tiempoImpresion)).toFixed(2)
          : newStatePrensas.prensa2 === "Ocupada"
          ? lastVector.tiempoImpresion.fin2
          : null,
      tipoFin1:
        prensaToAssign === 1
          ? newTipoTrabajo
          : newStatePrensas.prensa1 === "Ocupada"
          ? lastVector.tiempoImpresion.tipoFin1
          : null,
      tipoFin2:
        prensaToAssign === 2
          ? newTipoTrabajo
          : newStatePrensas.prensa2 === "Ocupada"
          ? lastVector.tiempoImpresion.tipoFin2
          : null,
    };
  } else {
    //No tengo ninguna prensa asignada
    return {
      rnd: null,
      tiempo: null,
      fin1:
        newStatePrensas.prensa1 === "Ocupada"
          ? lastVector.tiempoImpresion.fin1
          : null,
      fin2:
        newStatePrensas.prensa2 === "Ocupada"
          ? lastVector.tiempoImpresion.fin2
          : null,
      tipoFin1:
        newStatePrensas.prensa1 === "Ocupada"
          ? lastVector.tiempoImpresion.tipoFin1
          : null,
      tipoFin2:
        newStatePrensas.prensa2 === "Ocupada"
          ? lastVector.tiempoImpresion.tipoFin2
          : null,
    };
  }
};
