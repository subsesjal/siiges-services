const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { Logger } = require('@siiges-services/shared');

const findAllCiclos = (
  findUserUsersQuery,
  findOneProgramaQuery,
  findAllCiclosEscolaresQuery,
) => async (identifiers) => {
  Logger.info(`[CicloEscolar.findAllCiclos.use-case]: Ciclo escolar por Rvoe: ${identifiers.rvoe}`);
  const { rvoe, userId } = identifiers;
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

  const cicloEscolar = await findAllCiclosEscolaresQuery({ programaId: programa.id }, {
    query: { nombre: { [Op.not]: 'EQUIV' } },
  });

  return cicloEscolar;
};

module.exports = findAllCiclos;
