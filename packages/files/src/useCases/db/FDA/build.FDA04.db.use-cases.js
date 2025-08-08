const { checkers } = require('@siiges-services/shared');

const buildFileFDA04 = (
  findOneSolicitudProgramaQuery,
  createPhpFile,
) => async (solicitudId, tipoDocumento) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'ciclo' },
      { association: 'nivel' },
      { association: 'modalidad' },
      {
        association: 'plantel',
        include: [
          {
            association: 'plantelEdificioNiveles',
            include: [{ association: 'edificioNivel' }],
          },
          { association: 'plantelSeguridadSistemas' },
          { association: 'plantelHigienes' },
          { association: 'saludInstituciones' },
          {
            association: 'infraestructuras',
            include: [{
              association: 'asignaturasInfraestructura',
              include: [{ association: 'asignatura' }],
            }],
          },
          {
            association: 'domicilio',
            include: [
              { association: 'estado' },
              { association: 'municipio' },
            ],
          },
          { association: 'institucion' },
        ],
      }],
  },
  {
    association: 'usuario',
    include: [{ association: 'persona' }],
  },
  { association: 'estatusSolicitud' }];

  const solicitud = await findOneSolicitudProgramaQuery({ id: solicitudId }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud', solicitudId);

  const file = await createPhpFile(solicitud.toJSON(), tipoDocumento);
  return Buffer.from(file);
};

module.exports = { buildFileFDA04 };
