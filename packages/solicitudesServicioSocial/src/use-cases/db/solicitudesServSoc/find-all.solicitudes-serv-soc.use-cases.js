const findAllSolicitudesServSoc = (findAllSolicitudServSocQuery) => async () => {
  const include = [
    { association: 'estatusSolicitudServicioSocial' },
    { association: 'cicloEscolar' },
    { association: 'domicilio' },
    {
      association: 'programa',
      attributes: ['id', 'nombre'],
    },
  ];

  const servSoc = await findAllSolicitudServSocQuery(
    {},
    { include, strict: false },
  );

  return servSoc;
};

module.exports = findAllSolicitudesServSoc;
