const { Logger, checkers } = require('@siiges-services/shared');

const deleteAlumno = (
  findOneAlumnoQuery,
  findOneAlumnoTipoTramiteQuery,
  deleteAlumnoQuery,
  deleteAlumnoTipoTramiteQuery,
  deletePersonaQuery,
) => async (identifierObj) => {
  const include = [
    { association: 'persona' },
    { association: 'alumnoTipoTramites' },
  ];

  const alumnoFound = await findOneAlumnoQuery(identifierObj, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(alumnoFound, 'alumnos', identifierObj.id);

  const alumnoDeleted = await deleteAlumnoQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(alumnoDeleted, 'alumnos', identifierObj.id);

  const personaDeleted = await deletePersonaQuery({ id: alumnoFound.dataValues.personaId });
  checkers.throwErrorIfDataIsFalsy(personaDeleted, 'personas', personaDeleted.id);

  const alumnoTipoTramiteFound = await findOneAlumnoTipoTramiteQuery({ alumnoId: alumnoFound.id });

  if (alumnoTipoTramiteFound) {
    const alumnoTipoTramiteDeleted = await deleteAlumnoTipoTramiteQuery({
      id: alumnoTipoTramiteFound.id,
    });
    checkers.throwErrorIfDataIsFalsy(alumnoTipoTramiteDeleted, 'alumnos_tipo_tramites', alumnoTipoTramiteDeleted.id);
  }

  Logger.info('[alumno/delete]: Alumno deleted');

  return alumnoDeleted;
};

module.exports = deleteAlumno;
