const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { asignaturaAntecedenteEquivalente } = require('./properties/asignaturaAntecedenteEquivalente');
const { asignaturaEquivalentePrograma } = require('./properties/asignaturaEquivalentePrograma');
const { responseProperties } = require('./properties/responseProperties');

const createAsignaturaAntecedenteEquivalenteSquema = {
  tags: ['Solicitudes Antecedente Asignaturas'],
  description: 'Crear una Asignatura para el antecddente academico, on asignatura id o sin asignatura id',
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
