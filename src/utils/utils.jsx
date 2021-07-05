export const initialData = [
  {
    id: 0,
    t: 0,
    llegadaTrabajo: { rnd: null, tipoTrabajo: null },
    tiempoImpresion: {
      rnd: null,
      tiempo: null,
      fin1: null,
      fin2: null,
      tipoFin1: null,
      tipoFin2: null,
    },
    estados: { prensa1: "Libre", prensa2: "Libre" },
    utilidad: { diaria: 0, acumulada: 0 },
  },
];

export const getTipoTrabajo = (rnd, tiposTrabajos) => {
  let probInter = Number(
    (
      Number(Number(tiposTrabajos[0].prob).toFixed(2)) +
      Number(Number(tiposTrabajos[1].prob).toFixed(2))
    ).toFixed(2)
  );

  if (rnd >= 0 && rnd < Number(Number(tiposTrabajos[0].prob).toFixed(2))) {
    return "Tipo 1";
  } else {
    if (
      rnd >= Number(Number(tiposTrabajos[0].prob).toFixed(2)) &&
      rnd < probInter
    ) {
      return "Tipo 2";
    } else {
      return "No hay trabajo";
    }
  }
};

export const getTiempoImpresion = (rnd, min, max) => {
  let dif = Number(max) - Number(min);
  return (rnd * dif + Number(min)).toFixed(2);
};

export const getUtilidadTrabajo = (tipo, tiposTrabajos) => {
  if (tipo === 1) {
    return tiposTrabajos[0].precio;
  } else {
    if (tipo === 2) {
      return tiposTrabajos[1].precio;
    } else {
      return 0;
    }
  }
};
