const { solicitudBeca } = require('./properties/solicitudBeca');
const { usuario } = require('../../usuarios/schema/properties/usuario');
const { persona } = require('../../usuarios/schema/properties/persona');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { responseProperties } = require('./properties/responseProperties');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { estatusSolicitudBeca } = require('./properties/estatusSolcitudBeca');

const findOneSolicitudBecaSchema = {
  tags: ['Solicitudes Becas'],
  description: 'Este endpoint devuelve un objeto que contiene los detalles de una solicitud de beca, incluyendo su estatus, ciclo escolar y programa asociado.',
  response: {
    200: {
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
            cicloEscolar: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...cicloEscolar,
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
            usuario: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...usuario,
                ...responseProperties,
                persona: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...persona,
                    ...responseProperties,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findOneSolicitudBecaSchema;
