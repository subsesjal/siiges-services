const { checkers } = require('@siiges-services/shared');

const buildFileFDP02 = (
  findOneSolicitudProgramaQuery,
  createPhpFile,
) => async (solicitudId, tipoDocumento) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'ciclo' },
      { association: 'nivel' },
      { association: 'modalidad' },
      { association: 'asignaturas' },
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
          association: 'institucion',
          include: [{ association: 'ratificacionesNombre' }],
        }],
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

module.exports = { buildFileFDP02 };
