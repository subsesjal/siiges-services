const { checkers } = require('@siiges-services/shared');

const findGroupDocentesPrograma = (
  findOneProgramaQuery,
  findAllDocentesQuery,
) => async (
  identifierObj,
) => {
  const { programaId } = identifierObj;

  const include = [
    { association: 'persona' },
    {
      association: 'formacionesDocentes',
      include: [
        { association: 'formacion' },
      ],
    },
    {
      association: 'asignaturasDocentes',
      include: [
        { association: 'asignatura' },
      ],
    },
  ];

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  const docentesPrograma = await findAllDocentesQuery(identifierObj, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(docentesPrograma, 'docentes', identifierObj);

  return docentesPrograma;
};

module.exports = findGroupDocentesPrograma;
