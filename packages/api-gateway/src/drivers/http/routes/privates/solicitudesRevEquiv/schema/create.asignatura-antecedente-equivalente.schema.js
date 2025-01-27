const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { asignaturaAntecedenteEquivalente } = require('./properties/asignaturaAntecedenteEquivalente');
const { asignaturaEquivalentePrograma } = require('./properties/asignaturaEquivalentePrograma');
const { responseProperties } = require('./properties/responseProperties');

const createAsignaturaAntecedenteEquivalenteSquema = {
  tags: ['Solicitudes Antecedente Asignaturas'],
  description: 'This endpoint allows the creation of a new record for an equivalent antecedent subject in the system.',
  body: {
    type: 'object',
    properties: {
      ...asignaturaAntecedenteEquivalente,
    },
    required: [
      'interesadoId',
      'nombreAsignaturaEquivalente',
      'calificacionEquivalente',
      'nombreAsignaturaAntecedente',
      'calificacionAntecedente',
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

module.exports = createAsignaturaAntecedenteEquivalenteSquema;
