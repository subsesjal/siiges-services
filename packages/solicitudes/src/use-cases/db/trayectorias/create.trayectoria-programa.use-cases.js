const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const createTrayectoriaPrograma = (
  findOneProgramaQuery,
  findOneTrayectoriaQuery,
  createTrayectoriaQuery,
) => async (data) => {
  const { programaId } = data;

  // find programa
  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  // find trayectoria
  const trayectoriaFound = await findOneTrayectoriaQuery({ programaId });

  if (trayectoriaFound?.id) {
    // error if tipo instalacion programaId = null
    throw boom.conflict(
      '[trayectoria:create]: trayectoria already exist',
    );
  }

  const trayectoriaPrograma = await createTrayectoriaQuery(data);

  return trayectoriaPrograma;
};

module.exports = createTrayectoriaPrograma;
