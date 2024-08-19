const { checkers } = require('@siiges-services/shared');

const ATENDER_OBSERVACIONES_ESTATUS = 3;

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

    updatedData.estatusSolicitudFolioId = ATENDER_OBSERVACIONES_ESTATUS;
  }

  const solicitudFolioUpdated = await updateSolicitudFolioQuery(
    identifierObj,
    updatedData,
    { include },
  );

  return solicitudFolioUpdated;
};

module.exports = updateSolicitudFolio;
