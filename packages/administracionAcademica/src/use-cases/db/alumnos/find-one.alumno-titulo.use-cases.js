const { checkers } = require('@siiges-services/shared');

const findOneAlumnoTitulo = (findOneAlumnoTituloQuery) => async (identifierObj) => {
  const folioControl = await findOneAlumnoTituloQuery(identifierObj);

  checkers.throwErrorIfDataIsFalsy(folioControl, 'tituloElectronico', identifierObj.folioControl);

  return folioControl;
};

module.exports = findOneAlumnoTitulo;
