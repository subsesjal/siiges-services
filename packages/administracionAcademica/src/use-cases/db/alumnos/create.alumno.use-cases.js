const boom = require('@hapi/boom');
const { Logger, checkers } = require('@siiges-services/shared');

const createAlumno = (
  findOneAlumnoQuery,
  findOneProgramaQuery,
  createAlumnoQuery,
  createAlumnoTipoTramiteQuery,
) => async (data) => {
  const { programaId, matricula } = data;

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  // Check if alumno with the same matricula and programaId already exists
  const existingAlumno = await findOneAlumnoQuery({
    matricula,
    programaId,
  });

  if (existingAlumno) {
    throw boom.conflict(`An alumno with matricula ${matricula} already exists in programaId ${programaId}`);
  }

  const include = [{
    association: 'persona',
    include: [{ association: 'domicilio' }],
  }];

  const newAlumno = await createAlumnoQuery(data, include);
  checkers.throwErrorIfDataIsFalsy(newAlumno, 'alumnos', newAlumno.id);

  if (data.alumnoTipoTramite) {
    const alumnoTipoTramite = await createAlumnoTipoTramiteQuery({
      alumnoId: newAlumno.id,
      tipoTramiteId: data.alumnoTipoTramite,
    });

    newAlumno.dataValues.alumnoTipoTramite = alumnoTipoTramite.dataValues;
  }

  Logger.info('[alumno/create]: Alumno created');

  return newAlumno;
};

module.exports = createAlumno;
