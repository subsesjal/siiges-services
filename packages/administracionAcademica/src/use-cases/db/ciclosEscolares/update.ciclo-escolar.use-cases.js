const updateCicloEscolar = (
  findOneCicloEscolarQuery,
  updateCicloEscolarQuery,
) => async ({ id, data }) => {
  const { nombre } = data;

  const cicloEscolar = await findOneCicloEscolarQuery({ id });

  if (nombre && cicloEscolar.nombre !== nombre) {
    const exists = await findOneCicloEscolarQuery({ programaId: cicloEscolar.programaId, nombre });

    if (exists) {
      throw new Error(`El ciclo escolar ${nombre} ya existe para este programa`);
    }
  }

  const cicloEscolarUpdate = await updateCicloEscolarQuery({ id }, data);

  return cicloEscolarUpdate;
};

module.exports = { updateCicloEscolar };
