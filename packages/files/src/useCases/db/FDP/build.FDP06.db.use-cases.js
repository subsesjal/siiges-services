const { checkers } = require('@siiges-services/shared');

const buildFileFDP06 = (
  findOneSolicitudProgramaQuery,
  createPhpFile,
) => async (solicitudId, tipoDocumento) => {
  // Solo incluir los datos necesarios para FDP06
  const include = [{
    association: 'programa',
    include: [
      { association: 'ciclo' },
      { association: 'nivel' },
      {
        association: 'docentes',
        include: [
          { association: 'persona' },
          {
            association: 'formacionesDocentes',
            include: [{ association: 'formacion' }],
          },
          {
            association: 'asignaturasDocentes',
            include: [{ association: 'asignatura' }],
          },
        ],
      },
      {
        association: 'plantel',
        include: [
          { association: 'domicilio' },
          { association: 'institucion' },
        ],
      },
    ],
  },
  {
    association: 'usuario',
    include: [{ association: 'persona' }],
  }];

  const solicitud = await findOneSolicitudProgramaQuery({ id: solicitudId }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud', solicitudId);

  const file = await createPhpFile(solicitud.toJSON(), tipoDocumento);
  return Buffer.from(file);
};

module.exports = { buildFileFDP06 };
