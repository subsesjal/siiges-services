const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');

const findAllGrupos = (
  findUserUsersQuery,
  findOneProgramaQuery,
  findAllGruposQuery,
) => async (identifiers) => {
  Logger.info(`[Grupos.findAllGrupos.use-case]: Grupos por Rvoe: ${identifiers.rvoe}`);
  const {
    rvoe, userId, cicloEscolar, grado,
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

  const include = [
    {
      association: 'cicloEscolar',
      where: { nombre: cicloEscolar },
      include: [{
        association: 'programa',
        where: { acuerdoRvoe: rvoe },
      }],
    },
    { association: 'grado', where: { nombre: grado } },
    { association: 'turno' },
  ];

  return findAllGruposQuery(null, {
    include,
    strict: true,
  });
};

module.exports = findAllGrupos;
