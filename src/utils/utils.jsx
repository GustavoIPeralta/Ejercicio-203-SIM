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
    if (tipo === 2) {
      return 200;
    } else {
      return 0;
    }
  }
};
