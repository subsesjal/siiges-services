const findAllSolicitudesBecas = (findAllSolicitudesBecasQuery) => async () => {
  const include = [
    { association: 'estatusSolicitudBeca' },
    { association: 'cicloEscolar' },
    { association: 'programa' },
  ];

  const becas = await findAllSolicitudesBecasQuery(
    {},
    { include, strict: false },
  );

  return becas;
};

module.exports = findAllSolicitudesBecas;
