const { checkers } = require('@siiges-services/shared');

const findOneSolicitudPrograma = (findOneSolicitudProgramaQuery) => async (identifierObj) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
      { association: 'trayectoria' },
      {
        association: 'plantel',
        include: [{
          association: 'domicilio',
          include: [
            { association: 'estado' },
            { association: 'municipio' },
          ],
        },
        {
          association: 'directores',
          include: [{ association: 'persona' }],
        },
        {
          association: 'institucion',
          include: [
            { association: 'ratificacionesNombre' },
            {
              association: 'rector',
              include: [{ association: 'persona' }],
            },
          ],
        }],
      }],
  },
  {
    association: 'diligencias',
    include: [{ association: 'persona' }],
  },
  { association: 'estatusSolicitud' }];

  const solicitud = await findOneSolicitudProgramaQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes', identifierObj.id);

  return solicitud;
};

module.exports = findOneSolicitudPrograma;
