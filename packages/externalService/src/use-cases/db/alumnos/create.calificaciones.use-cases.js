const boom = require('@hapi/boom');

const OPTATIVA = 25; // Clave de asignatura optativa
/*
  * Estatus de calificación:
  * RC: Recurza
  * NS: No solicitó
  * NP: No presentó
  * SD: Sin derecho
*/
const ESTATUS_CALIFICACION = ['RC', 'NS', 'NP', 'SD'];

const validateGrupo = async ({
  findOneGrupoQuery, grupo, grado, cicloEscolar, turno, rvoe,
}) => {
  const include = [{
    association: 'cicloEscolar',
    where: { nombre: cicloEscolar },
    include: [{
      association: 'programa',
      where: { acuerdoRvoe: rvoe },
    }],
  },
  { association: 'turno', where: { nombre: turno } },
  { association: 'grado', where: { nombre: grado } },
  ];

  return findOneGrupoQuery({ descripcion: grupo }, {
    include,
    strict: true,
  });
};

const createCalificaciones = (
  findUserUsersQuery,
  findOneGrupoQuery,
  findOneProgramaQuery,
  findOneAlumnoGrupoQuery,
  findOneAsignaturaQuery,
  findOneCalificacionQuery,
  createCalificacionQuery,
  updateCalificacionQuery,
) => async (identifiers, dataArray) => {
  const {
    rvoe, grupo, cicloEscolar, turno, grado, userId, asignatura,
  } = identifiers;
  const usuarios = await findUserUsersQuery({ secundarioId: userId });

  if (!usuarios || !usuarios.principalId) {
    throw boom.badRequest('El usuario no tiene un usuario principal asociado');
  }
  const { principalId } = usuarios;

  const includePrograma = [{
    association: 'plantel',
    include: [
      { association: 'institucion' },
    ],
  }];

  const programa = await findOneProgramaQuery({ acuerdoRvoe: rvoe }, { include: includePrograma });

  if (programa?.plantel?.institucion?.usuarioId !== principalId) {
    throw boom.forbidden(`El usuario no tiene acceso a la institucion del programa ${rvoe}`);
  }

  // Validar que el grupo exista en el programa
  let grupoFound = await validateGrupo({
    findOneGrupoQuery, grupo, grado, cicloEscolar, turno, rvoe,
  });

  if (!grupoFound) {
    throw boom.notFound(`El grupo no existe en el programa ${rvoe}`);
  }

  grupoFound = grupoFound.toJSON();

  let failures = 0;
  let successes = 0;
  const alumnosError = [];
  const calificacionesError = [];
  const calificacionesSuccess = [];

  const asigFound = await findOneAsignaturaQuery({
    clave: asignatura,
    programaId: programa.id,
    gradoId: grupoFound.gradoId,
  });

  const asigOptFound = await findOneAsignaturaQuery({
    clave: asignatura,
    programaId: programa.id,
    gradoId: OPTATIVA,
  });

  if (!asigFound && !asigOptFound) {
    throw boom.notFound(`La asignatura con clave ${asignatura} no existe en el programa ${rvoe}, grado ${grado}`);
  }

  // Validar que los alumnos existan en el programa
  await Promise.all(dataArray.map(async (data) => {
    const { matricula, calificaciones } = data;
    const alumnoGrupo = await findOneAlumnoGrupoQuery(
      { grupoId: grupoFound.id },
      { include: [{ association: 'alumno', where: { matricula, programaId: programa.id } }], strict: true },
    );

    // Validar que el alumno exista
    if (!alumnoGrupo) {
      alumnosError.push({
        success: false,
        error: `Alumno con matrícula ${matricula} no encontrado en el grupo ${grupo}`,
        alumno: { matricula },
      });

      failures += 1;
      return;
    }

    const calificacionFound = await findOneCalificacionQuery({
      alumnoId: alumnoGrupo.alumnoId,
      asignaturaId: asigFound ? asigFound.id : asigOptFound.id,
      grupoId: grupoFound.id,
      tipo: 1,
    });

    if (!calificacionFound) {
      alumnosError.push({
        success: false,
        error: `El alumno con matrícula ${matricula} no está inscrito en la asignatura ${asignatura} del grupo ${grupo}`,
        alumno: { matricula },
      });
      failures += 1;
      return;
    }

    if (calificacionFound.calificacion && calificacionFound.calificacion > 0) {
      calificacionesError.push({
        success: false,
        error: `Ya existe una calificación para el alumno con matrícula ${matricula} en la asignatura ${asignatura}`,
        alumno: { matricula },
        calificaciones: {
          ordinaria: {
            calificacion: calificacionFound.calificacion,
            fechaExamen: calificacionFound.fechaExamen,
          },
        },
      });
      failures += 1;
      return;
    }

    // Validar que las calificaciones sean correctas
    const { ordinaria, extraordinaria } = calificaciones;
    const {
      calificacionMinima, calificacionMaxima, calificacionDecimal, calificacionAprobatoria,
    } = programa;

    if (ordinaria?.calificacion < calificacionMinima
      || ordinaria?.calificacion > calificacionMaxima
      || (!calificacionDecimal && !Number.isInteger(ordinaria?.calificacion))
    ) {
      calificacionesError.push({
        success: false,
        error: `Calificación ordinaria ${ordinaria?.calificacion} no válida para el alumno con matrícula ${matricula}`,
        alumno: { matricula },
        calificaciones: { ordinaria },
      });
      failures += 1;
      return;
    }

    if (ordinaria?.calificacion < calificacionAprobatoria && !extraordinaria) {
      calificacionesError.push({
        success: false,
        error: 'El alumno debe tener una calificación extraordinaria si la ordinaria es menor a la calificación aprobatoria',
        alumno: { matricula },
        calificaciones: { ordinaria, extraordinaria },
      });
      failures += 1;
      return;
    }

    if (ordinaria?.calificacion < calificacionAprobatoria) {
      if (ESTATUS_CALIFICACION.includes(extraordinaria?.calificacion)) {
        return;
      }

      if (extraordinaria?.calificacion < calificacionMinima
        || extraordinaria?.calificacion > calificacionMaxima
        || (!calificacionDecimal && !Number.isInteger(extraordinaria))
      ) {
        calificacionesError.push({
          success: false,
          error: `Calificación extraordinaria ${extraordinaria?.calificacion} no válida para el alumno con matrícula ${matricula}`,
          alumno: { matricula },
          calificaciones: { ordinaria, extraordinaria },
        });
        failures += 1;
      }
    }
  }));

  // Lanzar error si hay errores de validación
  if (alumnosError.length > 0 || calificacionesError.length > 0) {
    return {
      successes,
      failures,
      alumnos: alumnosError,
      calificaciones: calificacionesError,
    };
  }

  // Validar que los alumnos existan en el programa
  await Promise.all(dataArray.map(async (data) => {
    const { matricula, calificaciones } = data;

    const { ordinaria, extraordinaria } = calificaciones;

    const alumnoGrupo = await findOneAlumnoGrupoQuery(
      { grupoId: grupoFound.id },
      { include: [{ association: 'alumno', where: { matricula, programaId: programa.id } }], strict: true },
    );

    const calificacionFound = await findOneCalificacionQuery({
      alumnoId: alumnoGrupo.alumnoId,
      asignaturaId: asigFound ? asigFound.id : asigOptFound.id,
      grupoId: grupoFound.id,
      tipo: 1,
    });

    await updateCalificacionQuery({ id: calificacionFound.id }, {
      calificacion: ordinaria.calificacion,
      fechaExamen: ordinaria.fechaExamen,
    });

    // Si la calificación extraordinaria es válida, crearla
    if (extraordinaria.calificacion) {
      const calificacionExtFound = await findOneCalificacionQuery({
        alumnoId: alumnoGrupo.alumnoId,
        asignaturaId: asigFound ? asigFound.id : asigOptFound.id,
        grupoId: grupoFound.id,
        tipo: 2,
      });

      if (calificacionExtFound) {
        await updateCalificacionQuery({ id: calificacionExtFound.id }, {
          calificacion: extraordinaria.calificacion,
          fechaExamen: extraordinaria.fechaExamen,
        });
      } else {
      // Crear la calificación extraordinaria
        await createCalificacionQuery({
          alumnoId: alumnoGrupo.alumnoId,
          asignaturaId: asigFound ? asigFound.id : asigOptFound.id,
          grupoId: grupoFound.id,
          tipo: 2,
          calificacion: extraordinaria.calificacion,
          fechaExamen: extraordinaria.fechaExamen,
        });
      }
    }

    calificacionesSuccess.push({
      success: true,
      message: `Calificaciones actualizadas para el alumno con matrícula ${matricula}`,
      alumno: { matricula },
      calificaciones: { ordinaria, extraordinaria },
    });
    successes += 1;
  }));

  return {
    successes,
    failures,
    calificaciones: calificacionesSuccess,
  };
};

module.exports = createCalificaciones;
