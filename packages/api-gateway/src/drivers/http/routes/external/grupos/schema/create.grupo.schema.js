const { grupo } = require('./properties/grupo');
const { grado } = require('./properties/grado');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { turno } = require('./properties/turno');
const { responseProperties } = require('./properties/responseProperties');

const createGrupo = {
  tags: ['Grupos'],
  description: 'Crea un nuevo Grupo asociado a un Programa Educativo específico.',
  querystring: {
    type: 'object',
    properties: {
      rvoe: { type: 'string' },
      cicloEscolar: { type: 'string' },
      grado: { type: 'string' },
      turno: { type: 'string' },
    },
    required: ['rvoe', 'cicloEscolar', 'grado'],
  },
  body: {
    type: 'object',
    properties: { ...grupo },
    required: ['descripcion', 'generacion', 'generacionFechaInicio', 'generacionFechaFin'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...grupo,
            ...responseProperties,
            cicloEscolar: {
              type: 'object',
              properties: {
                ...cicloEscolar,
                ...responseProperties,
              },
            },
            turno: {
              type: 'object',
              properties: {
                ...turno,
                ...responseProperties,
              },
            },
            grado: {
              type: 'object',
              properties: {
                ...grado,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { createGrupo };
