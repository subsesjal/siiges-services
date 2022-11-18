const { checkers } = require('@siiges-services/shared');

const updateUser = (
  findOneUserQuery,
  updateUserQuery,
  updatePersonaQuery,
  updateDomicilioQuery,
  createDomicilioQuery,
) => async (identifierObj, data) => {
  const include = [{ association: 'persona' }];

  const userFound = await findOneUserQuery(identifierObj, { undefined, include });
  checkers.throwErrorIfDataIsFalsy(userFound, 'usuario', identifierObj);

  let personaUpdated;
  let domicilioUpdated;
  let domicilioCreated;
  const userUpdated = await updateUserQuery({ id: userFound.id }, data);

  if (data.persona) {
    const { persona } = data;
    personaUpdated = await updatePersonaQuery({ id: userFound.personaId }, persona);
    userUpdated.dataValues.persona = personaUpdated.dataValues;
  }

  if (data.persona.domicilio) {
    const { domicilio } = data.persona;

    if (userFound.persona.domicilioId === 1) {
      domicilioCreated = await createDomicilioQuery(domicilio);
      personaUpdated = await updatePersonaQuery(
        { id: userFound.personaId },
        { domicilioId: domicilioCreated.id },
      );
      userUpdated.dataValues.persona = personaUpdated.dataValues;
      userUpdated.dataValues.persona.domicilio = domicilioCreated.dataValues;
    } else {
      domicilioUpdated = await updateDomicilioQuery(
        { id: userFound.persona.domicilioId },
        domicilio,
      );
      userUpdated.dataValues.persona.domicilio = domicilioUpdated.dataValues;
    }
  }

  return userUpdated;
};

module.exports = updateUser;
