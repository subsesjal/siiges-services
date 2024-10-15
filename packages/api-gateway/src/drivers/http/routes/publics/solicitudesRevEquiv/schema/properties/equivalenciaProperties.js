const equivalenciaProperties = {
  tipoTramiteId: { type: 'string' },
  estatusSolicitud: { type: 'string' },
  fecha: { type: 'string', format: 'date-time' },
  observaciones: { type: 'string' },
  interesado: {
    type: 'object',
    properties: {
      persona: {
        type: 'object',
        properties: {
          nombre: { type: 'string' },
          apellidoPaterno: { type: 'string' },
        },
        required: ['nombre', 'apellidoPaterno'],
      },
      institucionProcedencia: {
        type: 'object',
        properties: {
          tipoInstitucion: { type: 'string' },
          nombre: { type: 'string' },
          estadoId: { type: 'string' },
          nombreCarrera: { type: 'string' },
        },
        required: ['tipoInstitucion', 'nombre', 'estadoId', 'nombreCarrera'],
      },
      institucionDestino: {
        type: 'object',
        properties: {
          tipoInstitucion: { type: 'string' },
          nombre: { type: 'string' },
          acuerdoRvoe: { type: 'string' },
          nombreCarrera: { type: 'string' },
        },
        required: ['tipoInstitucion', 'nombre'],
      },
    },
    required: ['persona', 'institucionProcedencia', 'institucionDestino'],
  },
  alumnoId: { type: 'string', nullable: true },
  folioExpediente: { type: 'string', nullable: true },
};

module.exports = equivalenciaProperties;
