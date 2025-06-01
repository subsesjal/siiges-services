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
  const findAlumno = await findOneValidacionesQuery({ alumnoId }, { attributes: ['id'] });
  checkers.throwErrorIfDataIsFalsy(findAlumno, 'Alumno', alumnoId);

  await checkers.findValidator(queryFunctions);

  const updateAlumno = await updateValidacionesQuery({ alumnoId }, data);

  return updateAlumno;
};

module.exports = { updateAlumnoValidacion };
