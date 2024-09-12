const TipoDeProyecto = {
  proyectoId: { type: 'integer' },
  tipoProyectoId: {
    type: 'integer',
    minimum: 1,
    maximum: 6,
  },
};

module.exports = { TipoDeProyecto };
