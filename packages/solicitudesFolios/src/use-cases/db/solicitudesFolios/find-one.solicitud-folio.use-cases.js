const { checkers } = require('@siiges-services/shared');

const findOneSolicitudFolio = (findOneSolicitudFolioQuery) => async (identifierObj) => {
  const include = [
    {
      association: 'programa',
      include: [{
        association: 'plantel',
        include: [
          { association: 'institucion' },
          { association: 'domicilio' },
        ],
      }],
    },
    { association: 'estatusSolicitudFolio' },
    { association: 'tipoDocumento' },
    { association: 'tipoSolicitudFolio' },
  ];

  const solicitudFolio = await findOneSolicitudFolioQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudes-folios', identifierObj.id);

  return solicitudFolio;
};

module.exports = findOneSolicitudFolio;
