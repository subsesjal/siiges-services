const { asignaturaAntecedenteEquivalente } = require('./properties/asignaturaAntecedenteEquivalente');
const { asignaturaEquivalentePrograma } = require('./properties/asignaturaEquivalentePrograma');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const findOneAsignaturaAntecedenteEquivalenteSchema = {
  tags: ['Solicitudes Rev Equiv'],
  description: 'Returns an Equivalencia by providing an equivalencia ID.',
  params: {
    title: 'findOneEquivalenciaSchema',
    type: 'object',
    properties: {
      solicitudRevEquivId: { type: 'integer' },
    },
    required: ['asignaturaAntecedenteEquivalenteId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...asignaturaAntecedenteEquivalente,
            ...responseProperties,
            asignaturaEquivalentePrograma: {
              type: 'object',
              properties: {
                ...asignaturaEquivalentePrograma,
                ...responseProperties,
                asignatura: {
                  type: 'object',
                  properties: {
                    ...asignatura,
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

module.exports = findOneAsignaturaAntecedenteEquivalenteSchema;
