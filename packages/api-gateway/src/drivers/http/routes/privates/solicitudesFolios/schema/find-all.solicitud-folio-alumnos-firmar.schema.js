const { alumno } = require('../../alumnos/schema/properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { situacion } = require('../../alumnos/schema/properties/situacion');
const { equivalencia } = require('../../alumnos/schema/properties/equivalencia');
const { validacion } = require('../../alumnos/schema/properties/validacion');
const { situacionesValidacion } = require('../../alumnos/schema/properties/situacionValidacion');
const { alumnoGrupo } = require('../../alumnos/schema/properties/alumnoGrupo');
const { grupo } = require('../../grupos/schema/properties/grupo');
const { grado } = require('../../grupos/schema/properties/grado');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudFolioAlumnosFirmar = {
  tags: ['Alumnos'],
  description: 'Return an array of Alumnos grouped by programa.',
  params: {
    title: 'findAllSolicitudFolioAlumnosFirmar',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
    },
    required: ['programaId'],
  },
  querystring: {
    type: 'object',
    properties: {
      matricula: { type: 'string' },
      situacionId: { type: 'integer' },
      tipoDocumentoId: { type: 'integer' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          if: {
            type: 'array',
          },
          then: {
            type: 'array',
            items: {
              properties: {
                id: { type: 'integer' },
                ...alumno,
                ...responseProperties,
                persona: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...persona,
                    ...responseProperties,
                  },
                },
                situacion: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...situacion,
                    ...responseProperties,
                  },
                },
                validacion: {
                  type: ['object', 'null'],
                  properties: {
                    id: { type: 'integer' },
                    ...validacion,
                    ...responseProperties,
                    situacionValidacion: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...situacionesValidacion,
                        ...responseProperties,
                      },
                    },
                  },
                },
                alumnoGrupos: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...alumnoGrupo,
                      ...responseProperties,
                      grupo: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          ...grupo,
                          ...responseProperties,
                          grado: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              ...grado,
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
          },
          else: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...alumno,
              ...responseProperties,
              persona: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...persona,
                  ...responseProperties,
                },
              },
              situacion: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...situacion,
                  ...responseProperties,
                },
              },
              equivalencia: {
                type: ['object', 'null'],
                properties: {
                  id: { type: 'integer' },
                  ...equivalencia,
                  ...responseProperties,
                },
              },
              validacion: {
                type: ['object', 'null'],
                properties: {
                  id: { type: 'integer' },
                  ...validacion,
                  ...responseProperties,
                  situacionValidacion: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...situacionesValidacion,
                      ...responseProperties,
                    },
                  },
                },
              },
              alumnoGrupos: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...alumnoGrupo,
                    ...responseProperties,
                    grupo: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...grupo,
                        ...responseProperties,
                        grado: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer' },
                            ...grado,
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
        },
      },
    },
  },
};

module.exports = findAllSolicitudFolioAlumnosFirmar;
