const findOneSolicitudServSoc = (findOneSolicitudServSocQuery) => async (id) => {
  const include = [
    { association: 'estatusSolicitudServicioSocial' },
    { association: 'cicloEscolar' },
    { association: 'domicilio' },
  ];

  return findOneSolicitudServSocQuery({ id }, { include });
};

module.exports = findOneSolicitudServSoc;
