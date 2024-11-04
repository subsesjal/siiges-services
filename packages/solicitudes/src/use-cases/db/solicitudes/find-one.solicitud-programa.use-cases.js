const { checkers } = require('@siiges-services/shared');

const findOneSolicitudPrograma = (
  findOneSolicitudProgramaQuery,
  findOneProgramaQuery,
) => async (identifierObj) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
      { association: 'evaluacion' },
      {
        association: 'plantel',
        include: [{
          association: 'domicilio',
          include: [
            { association: 'estado' },
            { association: 'municipio' },
          ],
        }, {
          association: 'institucion',
        },
        ],
      }],
  },
  {
    association: 'estatusSolicitud',
  }];

  const { solicitudId: id } = await findOneProgramaQuery(identifierObj);
  const solicitud = await findOneSolicitudProgramaQuery({ id }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes', identifierObj.id);

  return solicitud;
};

module.exports = findOneSolicitudPrograma;
