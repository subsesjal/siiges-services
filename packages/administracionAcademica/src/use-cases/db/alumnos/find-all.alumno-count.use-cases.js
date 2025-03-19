const findAllAlumnosCount = (findAllAlumnosQuery) => async ({
  programaId,
  situacionId,
}) => {
  const filters = {
    programaId,
    situacionId,
  };

  const alumnos = await findAllAlumnosQuery(filters);

  const totalAlumnos = alumnos.length;

  return {
    totalAlumnos,
    alumnos,
  };
};

module.exports = findAllAlumnosCount;
