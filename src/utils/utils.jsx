export const initialData = [
  {
    id: 0,
    t: 0,
    llegadaTrabajo: { rnd: null, tipoTrabajo: null },
    tiempoImpresion: { rnd: null, tiempo: null, fin1: null, fin2: null },
    estados: { prensa1: "Libre", prensa2: "Libre" },
    utilidad: { diaria: 0, acumulada: 0 },
  },
];

export const getDataVector = async (lastVector, copyVectors) => {
  let stateOccupied =
    lastVector.estados.prensa1 === "Ocupada" &&
    lastVector.estados.prensa2 === "Ocupada"
      ? true
      : false;

  let stateFree =
    lastVector.estados.prensa1 === "Libre" &&
    lastVector.estados.prensa2 === "Libre"
      ? true
      : false;

  let prensaToAssign = stateFree
    ? 1
    : lastVector.estados.prensa1 === "Libre"
    ? 1
    : lastVector.estados.prensa2 === "Libre"
    ? 2
    : null;

  let isFinishJob1 =
    lastVector.tiempoImpresion.fin1 &&
    copyVectors.length >= Number(lastVector.tiempoImpresion.fin1)
      ? true
      : false;

  let isFinishJob2 =
    lastVector.tiempoImpresion.fin2 &&
    copyVectors.length >= Number(lastVector.tiempoImpresion.fin2)
      ? true
      : false;

  let dailyUtility =
    isFinishJob1 && isFinishJob2
      ? getUtilidadTrabajo(1) + getUtilidadTrabajo(2)
      : isFinishJob1
      ? getUtilidadTrabajo(1)
      : isFinishJob2
      ? getUtilidadTrabajo(2)
      : 0;

  let rndTipo = Math.random().toFixed(2);

  let tipoTrabajo = getTipoTrabajo(rndTipo);

  let rndTiempo =
    tipoTrabajo !== "No hay trabajo"
      ? !stateOccupied
        ? Math.random().toFixed(2)
        : null
      : null;

  let tiempoImpresion = rndTiempo ? getTiempoImpresion(rndTiempo) : null;

  return {
    rndTipo,
    tipoTrabajo,
    rndTiempo,
    tiempoImpresion,
    prensaToAssign,
    dailyUtility,
  };
};

export const getTipoTrabajo = (rnd) => {
  if (rnd >= 0 && rnd < 0.5) {
    return "Tipo 1";
  } else {
    if (rnd >= 0.5 && rnd < 0.7) {
      return "Tipo 2";
    } else {
      return "No hay trabajo";
    }
  }
};

export const getTiempoImpresion = (rnd) => {
  return (rnd * 3 + 2).toFixed(2);
};

export const getUtilidadTrabajo = (tipo) => {
  if (tipo === 1) {
    return 400;
  } else {
    return 200;
  }
};
