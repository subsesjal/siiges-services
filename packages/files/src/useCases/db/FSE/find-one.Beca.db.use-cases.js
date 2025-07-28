const { checkers, Logger } = require('@siiges-services/shared');

const findFileBeca = (
  findOneSolicitudBecaQuery,
  findAllSolicitudBecaAlumnoQuery,
  GenerarBeca,
) => async (solicitudBecaId) => {
  Logger.info('[files.findFileBeca.use-case]: Generando archivo de beca');
  const includePrograma = [
    {
      association: 'programa',
      include: [
        { association: 'programaTurnos' },
        { association: 'trayectoria' },
        { association: 'ciclo' },
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
      association: 'usuario',
      include: [{ association: 'persona' }],
    },
    { association: 'cicloEscolar' },
  ];

  const solicitudPrograma = await findOneSolicitudBecaQuery({ id: solicitudBecaId }, {
    include: includePrograma,
    strict: false,
  });

  // Validar que la solicitud de programa exista
  checkers.throwErrorIfDataIsFalsy(solicitudPrograma, 'solicitudPrograma', solicitudBecaId);

  // Buscar alumnos vinculados a la solicitud de servicio social
  const includeAlumnos = [
    { association: 'alumno', include: [{ association: 'persona' }] },
    { association: 'grado' },
    { association: 'estatusAlumnoBeca' },
    { association: 'solicitudBeca' },
    { association: 'tipoAlumnoBeca' },
  ];

  const solicitudAlumnos = await findAllSolicitudBecaAlumnoQuery({ solicitudBecaId }, {
    include: includeAlumnos,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitudAlumnos, 'solicitudBecas', solicitudBecaId);

  const file = await GenerarBeca(solicitudPrograma, solicitudAlumnos);
  return Buffer.from(file);
};

module.exports = { findFileBeca };
