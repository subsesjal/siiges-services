/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');

const OPTATIVA = 25; // Clave de asignatura optativa
const VALIDACIONES_CORRECTAS = [1, 3]; // Situaciones válidas para la validación de alumnos

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

const inscripcionAlumnos = (
  findUserUsersQuery,
  findOneGrupoQuery,
  findOneProgramaQuery,
  findOneAlumnoQuery,
  findOneAsignaturaQuery,
  findOneAlumnoGrupoQuery,
  findAllCalificacionesQuery,
  createAlumnoGrupoQuery,
  createCalificacionQuery,
  deleteCalificacionQuery,
) => async (identifiers, dataArray) => {
  const {
    rvoe, grupo, cicloEscolar, turno, grado, userId,
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
  const asignaturasSucesses = [];
  const alumnosError = [];
  const asignaturasError = [];

  // Validar que los alumnos existan en el programa
  await Promise.all(dataArray.map(async (data) => {
    const { matricula, asignaturas } = data;
    const alumno = await findOneAlumnoQuery(
      { matricula, programaId: programa.id },
      {
        include: [{
          association: 'validacion',
          attributes: ['id', 'situacionValidacionId'],
        }],
        strict: false,
      },
    );

    // Validar que el alumno exista
    if (!alumno) {
      alumnosError.push({
        success: false,
        error: `Alumno con matrícula ${matricula} no encontrado`,
        alumno: { matricula },
      });

      failures += 1;
      return;
    }

    // Validar que el alumno esté activo
    if (alumno.situacionId !== 1) {
      alumnosError.push({
        success: false,
        error: `El alumno con matrícula ${matricula} no está activo`,
        alumno: { matricula },
      });
      failures += 1;
      return;
    }

    // Validar que el alumno tenga una validación correcta
    if (!alumno.validacion
      || !VALIDACIONES_CORRECTAS.includes(alumno.validacion.situacionValidacionId)) {
      alumnosError.push({
        success: false,
        error: `El alumno con matrícula ${matricula} no tiene una validación correcta`,
        alumno: { matricula },
      });
      failures += 1;
      return;
    }

    // Validar que las asignaturas existan en el programa y grado
    await Promise.all(asignaturas.map(async (asignatura) => {
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
        asignaturasError.push({
          success: false,
          error: `Asignatura con clave ${asignatura} no encontrada en el programa ${programa.acuerdoRvoe} grado ${grupoFound.grado.nombre}.`,
          asignatura: { clave: asignatura, alumno: { matricula } },
        });
        failures += 1;
      }
    }));
  }));

  // Lanzar error si hay errores de validación
  if (alumnosError.length > 0 || asignaturasError.length > 0) {
    return {
      successes,
      failures,
      alumnos: alumnosError,
      asignaturas: asignaturasError,
    };
    // throw boom.badRequest(`Errores de validación:\n${errores.join('\n')}`);
  }

  for (const data of dataArray) {
    const { matricula, asignaturas } = data;
    const alumno = await findOneAlumnoQuery({ matricula, programaId: programa.id });

    const existingAlumnoGrupo = await findOneAlumnoGrupoQuery(
      { alumnoId: alumno.id, grupoId: grupoFound.id },
    );

    if (!existingAlumnoGrupo) {
      await createAlumnoGrupoQuery({ alumnoId: alumno.id, grupoId: grupoFound.id });
    }

    const alumnoAsignaturas = await findAllCalificacionesQuery({
      alumnoId: alumno.id,
      grupoId: grupoFound.id,
      tipo: 1,
    }, {
      include: [{
        association: 'asignatura',
        attributes: ['id', 'clave'],
      }],
    });

    // Extraer las claves de las asignaturas del alumno
    const existingAsignaturas = new Set(alumnoAsignaturas.map((item) => item.asignatura.clave));

    // Filtrar asignaturas que ya existen en las calificaciones del alumno
    const toDelete = alumnoAsignaturas
      .filter((item) => !asignaturas.includes(item.asignatura.clave));

    await Promise.all(toDelete.map(({ id }) => {
      Logger.info(`Eliminando calificación con ID: ${id}`);
      return deleteCalificacionQuery({ id });
    }));

    // Crear calificaciones para las asignaturas que no existen
    // eslint-disable-next-line no-loop-func
    await Promise.all(asignaturas.map(async (clave) => {
      if (!existingAsignaturas.has(clave)) {
        Logger.info(`Creando registro en calificaciones para alumno ${alumno.matricula}, asignatura ${clave}, grupo ${grupoFound.descripcion}`);

        const asignaturaFound = await findOneAsignaturaQuery({
          clave,
          programaId: programa.id,
        });

        await createCalificacionQuery({
          alumnoId: alumno.id,
          grupoId: grupoFound.id,
          asignaturaId: asignaturaFound.id,
          tipo: 1, // Tipo 1 para calificaciones ordinarias
        });

        asignaturasSucesses.push({
          success: true,
          message: `Alumno ${matricula} inscrito en asignatura ${clave} del grupo ${grupoFound.descripcion}`,
          asignatura: { clave, alumno: { matricula } },
        });
        successes += 1;
      } else {
        asignaturasSucesses.push({
          success: true,
          message: `Alumno ${matricula} ya inscrito en asignatura ${clave} del grupo ${grupoFound.descripcion}`,
          asignatura: { clave, alumno: { matricula } },
        });
        successes += 1;
      }
    }));
  }

  // Todas las validaciones y operaciones se realizaron correctamente
  return {
    successes,
    failures,
    asignaturas: asignaturasSucesses,
  };
};

module.exports = inscripcionAlumnos;
