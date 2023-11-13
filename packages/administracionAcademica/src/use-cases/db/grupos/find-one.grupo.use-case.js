const { checkers } = require('@siiges-services/shared');

const findOneGrupo = (findOneGrupoQuery) => async ({ id }) => {
  const include = [
    {
      association: 'cicloEscolar',
      include: [
        {
          association: 'programa',
          include: [
            { association: 'nivel' },
          ],
        },
      ],
    },
    { association: 'grado' },
    { association: 'turno' },
  ];

  const getGrupo = await findOneGrupoQuery({ id }, { include });
  checkers.throwErrorIfDataIsFalsy(getGrupo, 'Grupo', id);

  return getGrupo;
};

module.exports = { findOneGrupo };
