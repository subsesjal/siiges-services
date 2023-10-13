const { institucion } = require('./properties/institucion');
const { plantel } = require('./properties/plantel');
const { plantelEdificioNivel } = require('../../planteles/schema/properties/plantelEdificioNivel');
const { tipoInmueble } = require('./properties/tipoInmueble');
const { edificioNivel } = require('../../planteles/schema/properties/edificioNivel');
const { plantelSeguridadSistema } = require('../../planteles/schema/properties/plantelSeguridadSistema');
const { seguridadSistema } = require('../../planteles/schema/properties/seguridadSistema');
const { plantelHigiene } = require('../../planteles/schema/properties/plantelHigiene');
const { higiene } = require('../../planteles/schema/properties/higiene');
const { saludInstitucion } = require('../../planteles/schema/properties/saludInstitucion');
const { infraestructura } = require('../../planteles/schema/properties/infraestructura');
const { asignaturaInfraestructura } = require('../../planteles/schema/properties/asignaturaInfraestructura');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { director } = require('./properties/director');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { persona } = require('../../usuarios/schema/properties/persona');
const { municipio } = require('../../usuarios/schema/properties/municipio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { responseProperties } = require('./properties/responseProperties');

const findOnePlantelDetallesSchema = {
  tags: ['Plantel'],
  description: 'Given a plantel id and a institucion id, then return a plantel from database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
    },
    required: ['institucionId', 'plantelId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...plantel,
            ...responseProperties,
            tipoInmueble: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...tipoInmueble,
                ...responseProperties,
              },
            },
            institucion: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...institucion,
                ...responseProperties,
              },
            },
            directores: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...director,
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
            domicilio: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...domicilio,
                ...responseProperties,
                municipio: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...municipio,
                    ...responseProperties,
                  },
                },
                estado: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...estado,
                    ...responseProperties,
                  },
                },
              },
            },
            plantelEdificioNiveles: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...plantelEdificioNivel,
                  ...responseProperties,
                  edificioNivel: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...edificioNivel,
                      ...responseProperties,
                    },
                  },
                },
              },
            },
            plantelSeguridadSistemas: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...plantelSeguridadSistema,
                  ...responseProperties,
                  seguridadSistema: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...seguridadSistema,
                      ...responseProperties,
                    },
                  },
                },
              },
            },
            plantelHigienes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...plantelHigiene,
                  ...responseProperties,
                  higiene: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...higiene,
                      ...responseProperties,
                    },
                  },
                },
              },
            },
            saludInstituciones: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...saludInstitucion,
                  ...responseProperties,
                },
              },
            },
            infraestructuras: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...infraestructura,
                  ...responseProperties,
                  asignaturasInfraestructura: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...asignaturaInfraestructura,
                        ...responseProperties,
                        asignatura: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer' },
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
        },
      },
    },
  },
};

module.exports = findOnePlantelDetallesSchema;
