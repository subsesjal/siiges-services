const createAlumno = (
  createAlumnoQuery,
) => async (identifiers, data) => {
  // createAlumnoQuery({ data, createdBy });

  console.log('data', data);
  console.log('createdBy', identifiers);
};

module.exports = createAlumno;
