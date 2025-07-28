const { checkers } = require('@siiges-services/shared');

const buildFileFDA01 = (
  findOneSolicitudProgramaQuery,
  createPhpFile,
) => async (solicitudId) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'nivel' },
      { association: 'modalidad' },
      {
        association: 'programaTurnos',
        include: [{ association: 'turno' }],
      },
      { association: 'ciclo' },
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
          include: [
            { association: 'persona' },
            {
              association: 'formacionesDirectores',
              include: [{ association: 'formacion' }],
            },
          ],
        },
        {
          association: 'institucion',
          include: [
            { association: 'ratificacionesNombre' },
            {
              association: 'rector',
              include: [
                { association: 'persona' },
                {
                  association: 'formacionesRectores',
                  include: [{ association: 'formacion' }],
                },
              ],
            },
          ],
        }],
      }],
  },
  {
    association: 'diligencias',
    include: [{ association: 'persona' }],
  },
  {
    association: 'usuario',
    include: [
      {
        association: 'persona',
        include: [
          {
            association: 'domicilio',
            include: [
              { association: 'municipio' },
            ],
          },
        ],
      },
    ],
  },
  { association: 'estatusSolicitud' }];

  const solicitud = await findOneSolicitudProgramaQuery({ id: solicitudId }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud', solicitudId);

  const file = await createPhpFile(solicitud.toJSON());
  return Buffer.from(file);
};

module.exports = { buildFileFDA01 };
