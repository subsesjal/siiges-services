const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');
const { checkDocumentosAlumno } = require('../alumnos/documentos-requeridos.helpers');

const SITUACION_VALIDACION_AUTENTICO = 1;
const SITUACION_ACTIVO_ID = 1;

const updateAlumnoValidacion = (
  findOneSituacionesValidacionQuery,
  findOneTipoValidacionesQuery,
  findOneValidacionesQuery,
  updateValidacionesQuery,
  findOneUsuarioQuery,
  findOneEstadoQuery,
  findOneNivelQuery,
  findAllFilesQuery,
  updateAlumnoQuery,
) => async ({ alumnoId, ...data }) => {
  const include = [
    {
      association: 'alumno',
      include: [
        { association: 'persona' },
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

  if (situacionValidacionId === SITUACION_VALIDACION_AUTENTICO) {
    const documentosOk = await checkDocumentosAlumno(alumnoId, findAllFilesQuery);
    if (!documentosOk) {
      throw boom.badRequest(
        'Este alumno no se puede validar como Auténtico: Le faltan documentos requeridos (certificado, acta de nacimiento, CURP o archivo de validación).',
      );
    }
  }

  const validacionUpdated = await updateValidacionesQuery({ alumnoId }, data, { include });

  if (situacionValidacionId === SITUACION_VALIDACION_AUTENTICO) {
    await updateAlumnoQuery({ id: alumnoId }, { situacionId: SITUACION_ACTIVO_ID });
  }

  return validacionUpdated;
};

module.exports = { updateAlumnoValidacion };
