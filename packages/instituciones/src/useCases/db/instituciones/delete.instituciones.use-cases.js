const { checkers } = require('@siiges-services/shared');

const deleteInstitucion = (
  findOneInstitucionQuery,
  deleteInstitucionQuery,
  deleteRectorQuery,
) => async (identifierObject) => {
  const include = [
    { association: 'rector' },
  ];

  const institucion = await findOneInstitucionQuery(identifierObject, { include, strict: false });
  checkers.throwErrorIfDataIsFalsy(institucion, 'instituciones', identifierObject.id);

  const institucionDeleted = await deleteInstitucionQuery({ id: institucion.id });

  const { rector } = institucion.dataValues;

  if (rector) {
    await deleteRectorQuery({ id: rector.dataValues.id });
  }

  return institucionDeleted;
};

module.exports = deleteInstitucion;
