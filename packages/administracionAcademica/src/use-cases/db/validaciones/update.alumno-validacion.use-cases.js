const { checkers } = require('@siiges-services/shared');

const updateAlumnoValidacion = (
  findOneSituacionesValidacionQuery,
  findOneTipoValidacionesQuery,
  findOneValidacionesQuery,
  updateValidacionesQuery,
  findOneUsuarioQuery,
  findOneEstadoQuery,
  findOneNivelQuery,
) => async ({ alumnoId, ...data }) => {
  const include = [
    {
      association: 'alumno',
      include: [
        {
          association: 'programa',
          include: [
            {
              association: 'plantel',
              include: [
                {
                  association: 'institucion',
                  include: [
                    {
                      association: 'usuario',
                      include: [
                        { association: 'persona' },
                      ],
                    },
                  ],

                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const {
    usuarioId,
    estadoId,
    nivelId,
    tipoValidacionId,
    situacionValidacionId,
  } = data;

  const queryFunctions = {
    Usuario: [usuarioId, findOneUsuarioQuery],
    Estado: [estadoId, findOneEstadoQuery],
    Nivel: [nivelId, findOneNivelQuery],
    TipoValidaciones: [tipoValidacionId, findOneTipoValidacionesQuery],
    SituacionesValidacion: [situacionValidacionId, findOneSituacionesValidacionQuery],
  };

  const validacion = await findOneValidacionesQuery({ alumnoId }, { attributes: ['id'] });
  checkers.throwErrorIfDataIsFalsy(validacion, 'validaciones', JSON.stringify({ alumnoId }));

  await checkers.findValidator(queryFunctions);

  return updateValidacionesQuery({ alumnoId }, data, { include });
};

module.exports = { updateAlumnoValidacion };
