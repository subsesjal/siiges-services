const { checkers } = require('@siiges-services/shared');

const findProgramaAsignatura = (findProgramaAsignaturaQuery) => async (identifierObj) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
      {
        association: 'asignatura',
        include: [{
          association: 'nombre',
          include: [
            { association: 'area' },
            { association: 'clave' },
          ],
        }],
      }],
  },
  {
    association: 'programaId',
  }];

  const asignaturas = await findProgramaAsignaturaQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(asignaturas, 'asignaturas', identifierObj.id);

  return asignaturas;
};

module.exports = findProgramaAsignatura;
