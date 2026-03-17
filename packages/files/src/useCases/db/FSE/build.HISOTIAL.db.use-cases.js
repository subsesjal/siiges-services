const { checkers, Logger } = require('@siiges-services/shared');

function ordenarCalificacionesPorCurricula(calificaciones) {
  const calificacionesPorGrado = {};

  calificaciones.forEach((cal) => {
    const gradoNombre = cal.grupo?.grado?.nombre || 'SIN GRADO';

    if (!calificacionesPorGrado[gradoNombre]) {
      calificacionesPorGrado[gradoNombre] = [];
    }

    calificacionesPorGrado[gradoNombre].push(cal);
  });

  const calificacionesOrdenadas = [];

  Object.entries(calificacionesPorGrado).forEach(([gradoNombre, cals]) => {
    const gradoNombreUpper = gradoNombre.toUpperCase();
    const esFlexible = gradoNombreUpper.includes('FLEXIBLE');
    const esOptativa = gradoNombreUpper.includes('OPTATIVA');

    let calsOrdenadas = [...cals];

    if (esOptativa || esFlexible) {
      calsOrdenadas = calsOrdenadas.sort((a, b) => {
        const idA = a.id || 0;
        const idB = b.id || 0;
        return idA - idB;
      });
    } else {
      calsOrdenadas = calsOrdenadas.sort((a, b) => {
        const claveA = String(a.asignatura?.clave || '');
        const claveB = String(b.asignatura?.clave || '');
        return claveA.localeCompare(
          claveB,
          undefined,
          {
            numeric: true,
            sensitivity: 'base',
          },
        );
      });
    }

    calificacionesOrdenadas.push(...calsOrdenadas);
  });

  return calificacionesOrdenadas;
}

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
        { association: 'situacionValidacion' },
      ],
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

  const calificacionesJSON = calificaciones.map((calificacion) => calificacion.toJSON());
  const calificacionesOrdenadas = ordenarCalificacionesPorCurricula(calificacionesJSON);

  const file = await createPhpFile({
    alumno: alumno.toJSON(),
    calificaciones: calificacionesOrdenadas,
  }, tipoDocumento);

  return Buffer.from(file);
};

module.exports = { buildFileHistorial };
