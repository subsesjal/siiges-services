const { checkers } = require('@siiges-services/shared');

const ESTATUS_ATENDER_OBSERVACIONES = 4;

const updateSolicitudFolio = (
  findOneSolicitudFolioQuery,
  updateSolicitudFolioQuery,
) => async (identifierObj, data) => {
  let include = {};
  const solicitud = await findOneSolicitudFolioQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes-folios', identifierObj.id);

  const updatedData = { ...data };

  if (data?.observaciones) {
    include = [
      {
        association: 'programa',
        include: [{
          association: 'plantel',
          include: [
            {
              association: 'institucion',
              include: [{ association: 'usuario' }],
            },
          ],
        }],
      },
    ];

    updatedData.estatusSolicitudFolioId = ESTATUS_ATENDER_OBSERVACIONES;
  }

  const solicitudFolioUpdated = await updateSolicitudFolioQuery(
    identifierObj,
    updatedData,
    { include },
  );

  return solicitudFolioUpdated;
};

module.exports = updateSolicitudFolio;
