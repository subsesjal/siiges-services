const boom = require('@hapi/boom');

const updateManyProgramas = (
  updateProgramaQuery,
) => async (body) => {
  const { ids, permisoAlumno } = body;

  if (!Array.isArray(ids) || ids.length === 0) {
    throw boom.badRequest('Debes enviar al menos un id de programa');
  }

  const programasActualizados = await Promise.all(
    ids.map((id) => updateProgramaQuery({ id }, { permisoAlumno })),
  );

  return programasActualizados;
};

module.exports = updateManyProgramas;
