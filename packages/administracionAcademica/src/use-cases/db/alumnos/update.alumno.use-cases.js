const { checkers } = require('@siiges-services/shared');

const updateAlumno = (
  findOneAlumnoQuery,
  findOneAlumnoTipoTramiteQuery,
  createAlumnoTipoTramiteQuery,
  updateAlumnoQuery,
  updateAlumnoTipoTramiteQuery,
  updatePersonaQuery,
) => async (identifierObj, changes) => {
  const { id } = identifierObj;
  const alumno = await findOneAlumnoQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', id);

  let personaUpdated;
  const alumnoUpdated = await updateAlumnoQuery(identifierObj, changes);

  if (changes.persona) {
    const { persona } = changes;
    personaUpdated = await updatePersonaQuery({ id: alumno.personaId }, persona);
    alumnoUpdated.dataValues.persona = personaUpdated.dataValues;
  }

  if (changes.alumnoTipoTramite) {
    const existingAlumnoTipoTramite = await findOneAlumnoTipoTramiteQuery({ alumnoId: alumno.id });

    if (existingAlumnoTipoTramite) {
      // Update the existing alumnoTipoTramite record
      const updatedAlumnoTipoTramite = await updateAlumnoTipoTramiteQuery(
        existingAlumnoTipoTramite.id,
        { tipoTramiteId: changes.alumnoTipoTramite },
      );
      alumnoUpdated.dataValues.alumnoTipoTramite = updatedAlumnoTipoTramite.dataValues;
    } else {
      // Create a new alumnoTipoTramite record
      const newAlumnoTipoTramite = await createAlumnoTipoTramiteQuery({
        alumnoId: alumno.id,
        tipoTramiteId: changes.alumnoTipoTramite,
      });
      alumnoUpdated.dataValues.alumnoTipoTramite = newAlumnoTipoTramite.dataValues;
    }
  }

  return alumnoUpdated;
};

module.exports = updateAlumno;
