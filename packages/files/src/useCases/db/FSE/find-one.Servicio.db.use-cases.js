const { checkers, Logger } = require('@siiges-services/shared');

const findFileServicio = (
  findOneSolicitudServSocQuery,
  findAllSolicitudServSocAlumnoQuery,
  GenerarServicio,
) => async (solicitudServicioSocialId) => {
  Logger.info('[files.findFileServicio.use-case]: Generando archivo de servicio social');
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
    { association: 'cicloEscolar' },
  ];

  const solicitudPrograma = await findOneSolicitudServSocQuery({
    id: solicitudServicioSocialId,
  }, {
    include: includePrograma,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitudPrograma, 'solicitudServicioSocial', solicitudServicioSocialId);

  const includeAlumnos = [
    { association: 'alumno', include: [{ association: 'persona' }] },
    { association: 'grado' },
    { association: 'modalidadServicioSocial' },
    { association: 'sectorServicioSocial' },
    { association: 'ejeServicioSocial', include: [{ association: 'dimensionServicioSocial' }] },
  ];

  const solicitudAlumnos = await findAllSolicitudServSocAlumnoQuery(
    { solicitudServicioSocialId },
    {
      include: includeAlumnos,
      strict: false,
    },
  );
  checkers.throwErrorIfDataIsFalsy(solicitudAlumnos, 'solicitudServSoc', solicitudServicioSocialId);

  const file = await GenerarServicio(solicitudPrograma, solicitudAlumnos);
  return Buffer.from(file);
};

module.exports = { findFileServicio };
