const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { datos } = require('./properties/datos');
const { contratoYContrato } = require('./properties/contratoYCalendario');
const { TipoDeProyecto } = require('./properties/tipoDeProyecto');
const { espaciosDeEquipamiento } = require('./properties/espacioYEquipamiento');

const {
  planesMaestroId,
  montoNoContratado: ___,
  remanente,
  tipoDeProyectoId,
  contratoYCalendarioId,
  ...datosBody
} = datos;
const { datosDelProyectoId: __, ...espaciosDeEquipamientoBody } = espaciosDeEquipamiento;
const { proyectoId: _, ...TipoDeProyectoBody } = TipoDeProyecto;

const createDatosDeProyectoSchema = {
  tags: ['Planes Maestros'],
  description: 'Create datos for plan maestro.',
  params: {
    type: 'object',
    properties: {
      planMaestroId: { type: 'integer' },
    },
    required: ['planMaestroId'],
  },
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...datosBody,
      contrato: {
        type: 'object',
        properties: {
          ...contratoYContrato,
        },
      },
      proyectoTipoProyecto: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...TipoDeProyectoBody,
          },
        },
      },
      proyectoEspacio: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...espaciosDeEquipamientoBody,
          },
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...datos,
            contrato: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...contratoYContrato,
                ...responseProperties,
              },
            },
            proyectoTipoProyecto: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...TipoDeProyecto,
                  tipoProyecto: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      nombre: { type: 'string' },
                      descripcion: { type: 'string' },
                    },
                  },
                  ...responseProperties,
                },
              },
            },
            proyectoEspacio: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...espaciosDeEquipamiento,
                  ...responseProperties,
                },
              },
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createDatosDeProyectoSchema };
