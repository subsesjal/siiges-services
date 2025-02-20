const { checkers } = require('@siiges-services/shared');

const findOneSolicitudServSoc = (findOneSolicitudServSocQuery) => async (id) => {
  const include = [
    { association: 'estatusSolicitudServicioSocial' },
    { association: 'cicloEscolar' },
    { association: 'domicilio' },
  ];

  const solicitudServSoc = await findOneSolicitudServSocQuery({ id }, { include, strict: false });

  checkers.throwErrorIfDataIsFalsy(
    solicitudServSoc,
    'solicitud-serv-soc',
    id,
  );

  return solicitudServSoc;
};

module.exports = findOneSolicitudServSoc;
