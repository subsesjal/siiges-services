const { checkers } = require('@siiges-services/shared');

const findFileFDA04 = (
  findOneSolicitudProgramaQuery,
  GenerarFDA04,
) => async (solicitudId) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
      { association: 'trayectoria' },
      {
        association: 'plantel',
        include: [
          { association: 'plantelEdificioNiveles' },
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
          { association: 'tipoInmueble' },
          {
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

  // eslint-disable-next-line no-console
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud', solicitudId);

  const file = await GenerarFDA04(solicitud);
  return Buffer.from(file);
};

module.exports = { findFileFDA04 };
