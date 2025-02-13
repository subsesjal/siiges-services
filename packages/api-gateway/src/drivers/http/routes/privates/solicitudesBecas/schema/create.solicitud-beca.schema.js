const { solicitudBeca } = require('./properties/solicitudBeca');
const { estatusSolicitudBeca } = require('./properties/estatusSolcitudBeca');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { usuario } = require('../../usuarios/schema/properties/usuario');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudBecaSchema = {
  tags: ['Solicitudes Becas'],
  description: 'Recibe un objeto con los datos requeridos para una solicitud de beca y guarda por primera vez dicha solicitud en la base de datos.',
  body: {
    type: 'object',
    properties: { ...solicitudBeca },
    required: [
      'estatusSolicitudBecaId',
      'programaId',
      'cicloEscolarId',
      'usuarioId',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudBeca,
            ...responseProperties,
            estatusSolicitudBeca: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...estatusSolicitudBeca,
                ...responseProperties,
              },
            },
            programa: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
                ...responseProperties,
              },
            },
            cicloEscolar: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...cicloEscolar,
                ...responseProperties,
              },
            },
            usuario: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...usuario,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createSolicitudBecaSchema;
