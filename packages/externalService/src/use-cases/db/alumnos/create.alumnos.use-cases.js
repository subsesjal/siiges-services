/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const boom = require('@hapi/boom');
const { Logger } = require('@siiges-services/shared');

const ACTIVO = 1;

const createAlumnos = (
  findUserUsersQuery,
  findOneProgramaQuery,
  findOneAlumnoQuery,
  createAlumnoQuery,
) => async (identifiers, data) => {
  if (data.length > 100) {
    throw boom.badRequest('El número máximo de alumnos a crear es 100');
  }
  const { rvoe, userId } = identifiers;
  const usuarios = await findUserUsersQuery({ secundarioId: userId });

  if (!usuarios || !usuarios.principalId) {
    throw boom.badRequest('El usuario no tiene un usuario principal asociado');
  }
  const { principalId } = usuarios;

  const includePrograma = [{
    association: 'plantel',
    include: [
      { association: 'institucion' },
    ],
  }];

  const programa = await findOneProgramaQuery({ acuerdoRvoe: rvoe }, { include: includePrograma });

  if (programa?.plantel?.institucion?.usuarioId !== principalId) {
    throw boom.forbidden(`El usuario no tiene acceso a la institucion del programa ${rvoe}`);
  }

  const alumnos = [];
  let successes = 0;
  let failures = 0;

  for (const alumno of data) {
    const existingAlumno = await findOneAlumnoQuery({
      matricula: alumno.matricula,
      programaId: programa.id,
    });

    if (existingAlumno) {
      failures += 1;
      alumnos.push({ success: false, alumno, error: 'El alumno ya existe' });
      // eslint-disable-next-line no-continue
      continue;
    }

    const includeAlumno = [{ association: 'persona' }, { association: 'situacion' }];

    const newData = {
      ...alumno,
      situacionId: ACTIVO, // Situación  por defecto
      programaId: programa.id,
      estatus: 1,
    };

    try {
      await createAlumnoQuery(newData, includeAlumno);
      successes += 1;
      alumnos.push({ success: true, alumno: newData });
    } catch (error) {
      Logger.error('Error al crear el alumno:', error);
      failures += 1;
      alumnos.push({ success: false, alumno: newData, error: error.message || 'Error al crear el alumno' });
    }
  }

  return {
    successes,
    failures,
    alumnos,
  };
};

module.exports = createAlumnos;
