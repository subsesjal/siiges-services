// External dependencies
const { checkers } = require('@siiges-services/shared');
// Internal dependencies
const userModule = require('./usuario');
const personModule = require('./persona');

function getPersonInformation(data) {
  const person = {
    apellidoMaterno: data.lastname2,
    apellidoPaterno: data.lastname1,
    celular: data.cellphone,
    correo: data.email,
    curp: data.curp,
    ine: data.ine,
    nacionalidad: data.nationality,
    nombre: data.name,
    rfc: data.rfc,
    sexo: data.sexo,
    telefono: data.phone,
    tituloCargo: data.cargo,
  };
  Object.keys(person).forEach((key) => {
    if (checkers.isUndefined(person[key])) delete person[key];
  });

  return person;
}

function getUserInforamtion(data) {
  const user = {
    correo: data.email,
    rolId: data.rol,
  };

  return user;
}

function divideInformation(data) {
  const user = getUserInforamtion(data);
  const person = getPersonInformation(data);

  return { user, person };
}

async function updateUserDetail(data, usuarioId) {
  const { user, person } = divideInformation(data);
  const userUpdated = await userModule.updateUser(usuarioId, user);
  const personUpdated = await personModule.update({ id: userUpdated.personaId }, person);

  return {
    ...userUpdated.dataValues,
    ...personUpdated.dataValues,
  };
}

module.exports = updateUserDetail;
