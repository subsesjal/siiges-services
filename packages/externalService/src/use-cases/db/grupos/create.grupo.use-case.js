const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');

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

const createGrupo = (
  findUserUsersQuery,
  findOneProgramaQuery,
  findOneCicloEscolarQuery,
  findOneGradoQuery,
  findOneTurnoQuery,
  findOneGrupoQuery,
  createGrupoQuery,
) => async (identifiers, data) => {
  Logger.info(`[CicloEscolar.createGrupo.use-case]: Ciclo escolar por Rvoe: ${identifiers.rvoe}`);
  const {
    rvoe, userId, cicloEscolar, grado, turno,
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

  const cicloEscolarFound = await findOneCicloEscolarQuery({
    programaId: programa.id,
    nombre: cicloEscolar,
  });

  if (!cicloEscolarFound) {
    throw boom.notFound(`Ciclo escolar no válido: ${cicloEscolar}`);
  }

  const gradoFound = await findOneGradoQuery({ nombre: grado });

  if (!gradoFound) {
    throw boom.notFound(`Grado no válido: ${grado}`);
  }

  const turnoFound = await findOneTurnoQuery({ nombre: turno });

  if (!turnoFound) {
    throw boom.notFound(`Turno no válido: ${turno}`);
  }

  // Validar que el grupo exista en el programa
  const grupoFound = await validateGrupo({
    findOneGrupoQuery, grupo: data.descripcion, grado, cicloEscolar, turno, rvoe,
  });

  if (grupoFound) {
    throw boom.notFound(`El grupo ya existe en el programa ${rvoe}`);
  }

  const grupo = await createGrupoQuery({
    cicloEscolarId: cicloEscolarFound.id,
    turnoId: turnoFound.id,
    gradoId: gradoFound.id,
    ...data,
  });

  const include = [
    { association: 'cicloEscolar' },
    { association: 'grado' },
    { association: 'turno' },
  ];

  return findOneGrupoQuery({ id: grupo.id }, {
    include,
    strict: true,
  });
};

module.exports = createGrupo;
