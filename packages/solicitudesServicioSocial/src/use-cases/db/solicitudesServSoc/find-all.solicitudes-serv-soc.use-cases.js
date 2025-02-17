const findAllSolicitudesServSoc = (findAllSolicitudServSocQuery) => async () => {
  const include = [
    { association: 'estatusSolicitudServicioSocial' },
    { association: 'cicloEscolar' },
    { association: 'domicilio' },
  ];

  return findAllSolicitudServSocQuery({}, { include });
};

module.exports = findAllSolicitudesServSoc;
