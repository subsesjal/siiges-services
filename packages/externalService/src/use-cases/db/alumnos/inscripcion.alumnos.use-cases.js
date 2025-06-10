/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const boom = require('@hapi/boom');
// const { Logger, checkers } = require('@siiges-services/shared');

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

const createAlumnoAsignaturasRelations = async ({
  findOneCalificacionQuery,
  findOneAsignaturaQuery,
  createCalificacionQuery,
  alumnoAsignaturas,
  asignaturas,
  alumnoId,
  programaId,
  grupoId,
}) => {
  await Promise.all(asignaturas.map(async (asignatura) => {
    if (alumnoAsignaturas.some(({ asignaturaId }) => asignaturaId === asignatura)) {
      await findOneCalificacionQuery({
        asignaturaId: asignatura,
        grupoId,
        alumnoId,
      });
    } else {
      const asignaturaFound = await findOneAsignaturaQuery({
        id: asignatura,
        programaId,
      });

      if (asignaturaFound) {
        await createCalificacionQuery({
          alumnoId,
          asignaturaId: asignatura,
          grupoId,
          tipo: 1,
        });
      }
    }
  }));
};

const deleteAlumnoAsignaturasRelations = async ({
  deleteCalificacionQuery,
  alumnoAsignaturas,
  asignaturas,
}) => {
  const toDelete = alumnoAsignaturas.filter((
    alumnoAsignatura,
  ) => !asignaturas.includes(alumnoAsignatura.asignaturaId));

  await Promise.all(toDelete.map(({ id }) => deleteCalificacionQuery({ id })));
};

const inscripcionAlumnos = (
  findUserUsersQuery,
  findOneGrupoQuery,
  findOneProgramaQuery,
  findOneAlumnoQuery,
  findOneAsignaturaQuery,
  findOneAlumnoGrupoQuery,
  createAlumnoGrupoQuery,
  findAllCalificacionesQuery,
  findOneCalificacionQuery,
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

  const errores = [];

  // Validar que los alumnos existan en el programa
  await Promise.all(dataArray.map(async (data) => {
    const { matricula, asignaturas } = data;
    const alumno = await findOneAlumnoQuery({ matricula, programaId: programa.id });
    if (!alumno) {
      errores.push(`Alumno con matrícula ${matricula} no encontrado`);
      return; // No seguir validando asignaturas si no existe el alumno
    }

    await Promise.all(asignaturas.map(async (asignatura) => {
      const asignaturaFound = await findOneAsignaturaQuery({
        clave: asignatura,
        programaId: programa.id,
      });

      if (!asignaturaFound) {
        errores.push(`Asignatura con clave ${asignatura} no encontrada en el programa ${programa.acuerdoRvoe}`);
      }
    }));
  }));

  // Lanzar error si hay errores de validación
  if (errores.length > 0) {
    throw boom.badRequest(`Errores de validación:\n${errores.join('\n')}`);
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
    });

    await Promise.all([
      createAlumnoAsignaturasRelations({
        findOneCalificacionQuery,
        findOneAsignaturaQuery,
        createCalificacionQuery,
        alumnoAsignaturas,
        alumnoId: alumno.id,
        asignaturas,
        programaId: programa.id,
        grupoId: grupoFound.id,
      }),
      deleteAlumnoAsignaturasRelations({
        deleteCalificacionQuery,
        alumnoAsignaturas,
        alumnoId: alumno.id,
        asignaturas,
      }),
    ]);
  }

  return grupoFound;
};

module.exports = inscripcionAlumnos;
