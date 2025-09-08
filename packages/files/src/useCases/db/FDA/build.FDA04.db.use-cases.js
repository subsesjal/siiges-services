const { checkers } = require('@siiges-services/shared');

const buildFileFDA04 = (
  findOneSolicitudProgramaQuery,
  createPhpFile,
) => async (solicitudId, tipoDocumento) => {
  const include = [{
    association: 'programa',
    attributes: [
      'id',
      'duracionPeriodos',
      'nombre',
    ],
    include: [
      { association: 'ciclo', attributes: ['id'] },
      { association: 'nivel', attributes: ['id', 'descripcion'] },
      { association: 'modalidad', attributes: ['id', 'nombre', 'descripcion'] },
      {
        association: 'plantel',
        attributes: [
          'id',
          'tipoInmuebleId',
          'correo1',
          'correo2',
          'correo3',
          'telefono1',
          'telefono2',
          'telefono3',
          'paginaWeb',
          'redesSociales',
          'especificaciones',
          'dimensiones',
        ],
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
              include: [
                {
                  association: 'asignatura',
                  attributes: ['id', 'clave'],
                }],
            }],
          },
          {
            association: 'domicilio',
            include: [
              { association: 'estado' },
              { association: 'municipio' },
            ],
          },
          { association: 'institucion', attributes: ['id', 'nombre'] },
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
