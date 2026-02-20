const { checkers, Logger } = require('@siiges-services/shared');

const buildFileHistorial = (
  findOneAlumnoQuery,
  findAllCalificacionesQuery,
  createPhpFile,
) => async (alumnoId, tipoDocumento) => {
  Logger.info('[files.buildFileHistorial.use-case]: Generando archivo de historial académico');
  const include = [
    { association: 'persona' },
    { association: 'situacion' },
    { association: 'alumnoTipoTramites' },
    { 
      association: 'validacion', 
      include: [
        { association: 'situacionValidacion' }
      ] 
    },
    {
      association: 'programa',
      include: [
        { association: 'nivel' },
        { association: 'modalidad' },
        {
          association: 'programaTurnos',
          include: [{ association: 'turno' }],
        },
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
          { association: 'institucion' }],
        }],
    },
  ];
  const alumno = await findOneAlumnoQuery({ id: alumnoId }, {
    include,
    strict: false,
  });

  const includeCalificaciones = [
    { association: 'alumno' },
    { association: 'asignatura' },
    {
      association: 'grupo',
      include: [
        { association: 'cicloEscolar' },
        { association: 'grado' },
      ],
    },
  ];
  const calificaciones = await findAllCalificacionesQuery({ alumnoId }, {
    include: includeCalificaciones,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(calificaciones, 'calificaciones', alumnoId);

  const file = await createPhpFile({
    alumno: alumno.toJSON(), // Primer argumento un objeto
    calificaciones: calificaciones.map((calificacion) => calificacion.toJSON()),
  }, tipoDocumento); // Tipo de documento
  return Buffer.from(file);
};

module.exports = { buildFileHistorial };
