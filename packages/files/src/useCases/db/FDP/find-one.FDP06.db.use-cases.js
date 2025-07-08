const { checkers } = require('@siiges-services/shared');

const findFileFDP06 = (
  findOneSolicitudProgramaQuery,
  GenerarFDP06,
) => async (solicitudId) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
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
      { association: 'asignaturas' },
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
    include: [{ association: 'persona' }],
  },
  { association: 'estatusSolicitud' }];

  const solicitud = await findOneSolicitudProgramaQuery({ id: solicitudId }, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud', solicitudId);

  const file = await GenerarFDP06(solicitud);
  return Buffer.from(file);
};

module.exports = { findFileFDP06 };
