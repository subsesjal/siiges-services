const createInstitucion = (createInstitucionQuery, createRectorQuery) => async (data) => {
  const include = [{ association: 'ratificacionesNombre' }];

  const { rector, ...dataInstitucion } = data;

  const newInstitucion = await createInstitucionQuery(dataInstitucion, include);

  if (rector) {
    const includeRector = [{ association: 'persona' }];
    const rectorData = { institucionId: newInstitucion.id, ...rector };
    const newRectorInstitucion = await createRectorQuery(
      rectorData,
      includeRector,
    );
    newInstitucion.dataValues.rector = newRectorInstitucion;
  }

  return newInstitucion;
};

module.exports = createInstitucion;
