const { solicitud } = require('./properties/solicitud');
const { programa } = require('./properties/programa');

const createSolicitudProgramaSchema = {
  tags: ['Solicitudes'],
  description: 'Given an object with solicitud and programa required data, then save the first time a new solicitud in database.',
  body: {
    type: 'object',
    properties: {
      ...solicitud,
      programa: {
        type: 'object',
        properties: {
          ...programa,
        },
        required: ['cicloId', 'nivelId', 'modalidadId', 'plantelId'],
      },
    },
    required: ['tipoSolicitudId', 'usuarioId', 'estatusSolicitudId'],
  },
};

module.exports = createSolicitudProgramaSchema;
