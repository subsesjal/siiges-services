const findAllSolicitudesBeca = (findAllSolicitudesBecaQuery) => async () => {
  const include = [
    { association: 'estatusSolicitudBeca' },
    { association: 'cicloEscolar' },
    { association: 'programa' },
  ];

  const becas = await findAllSolicitudesBecaQuery(
    {},
    { include, strict: false },
  );

  return becas;
};

module.exports = findAllSolicitudesBeca;
