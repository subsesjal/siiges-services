// Ratificacion de nombre
const ratificacionNombre = {
  institucionId: { type: 'integer' },
  autoridad: { type: 'string' },
  nombrePropuesto1: { type: 'string' },
  nombrePropuesto2: { type: 'string' },
  nombrePropuesto3: { type: 'string' },
  nombreSolicitado: { type: 'string' },
  nombreAutorizado: { type: 'string' },
  esNombreAutorizado: { type: 'boolean' },
};

module.exports = { ratificacionNombre };
