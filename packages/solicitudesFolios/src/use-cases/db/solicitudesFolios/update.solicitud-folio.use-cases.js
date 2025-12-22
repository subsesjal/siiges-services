const { checkers } = require('@siiges-services/shared');

const ESTATUS_FOLIOS_ASIGNADOS = 3;
const ESTATUS_ATENDER_OBSERVACIONES = 4;

const includeUsuario = [
  {
    association: 'programa',
    include: [
      {
        association: 'plantel',
        include: [
          {
            association: 'institucion',
            include: [{ association: 'usuario' }],
          },
        ],
      },
    ],
  },
];

const updateSolicitudFolio = (
  findOneSolicitudFolioQuery,
  updateSolicitudFolioQuery,
) => async (identifierObj, data) => {
  const solicitud = await findOneSolicitudFolioQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes-folios', identifierObj.id);

  const updatedData = { ...data };
  let include = [];

  if (data?.observaciones) {
    updatedData.estatusSolicitudFolioId = ESTATUS_ATENDER_OBSERVACIONES;
    include = includeUsuario;
  }

  if (data?.estatusSolicitudFolioId === ESTATUS_FOLIOS_ASIGNADOS) {
    include = includeUsuario;
  }

  const solicitudFolioUpdated = await updateSolicitudFolioQuery(
    identifierObj,
    updatedData,
    { include },
  );

  return solicitudFolioUpdated;
};

module.exports = updateSolicitudFolio;
