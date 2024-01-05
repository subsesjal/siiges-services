const { checkers } = require('@siiges-services/shared');

const findOneVigilante = (findOneVigilanteQuery) => async (id) => {
  const include = [{ association: 'persona' }];
  const vigilante = await findOneVigilanteQuery(id, { include });
  checkers.throwErrorIfDataIsFalsy(vigilante, 'Persona', id.personaId);

  return vigilante;
};

module.exports = { findOneVigilante };
