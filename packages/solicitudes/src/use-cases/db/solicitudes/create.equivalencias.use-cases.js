function createEquivalencia(createEquivalenciaQuery) {
  console.log("createEquivalencia");
  return async (data) => {
    try {
      const newEquivalencia = await createEquivalenciaQuery(data);
      return newEquivalencia;
    } catch (error) {
      console.error("Error en createEquivalencia:", error);
      throw error; // Propaga el error para que sea manejado en el controlador
    }
  };
}

module.exports = createEquivalencia;
