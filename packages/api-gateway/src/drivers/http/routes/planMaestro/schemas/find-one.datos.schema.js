const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { datos } = require('./properties/datos');
const { contratoYContrato } = require('./properties/contratoYCalendario');
const { TipoDeProyecto } = require('./properties/tipoDeProyecto');
const { espaciosDeEquipamiento } = require('./properties/espacioYEquipamiento');

const findOneDatosDeProyectoSchema = {
  tags: ['Planes Maestros'],
  description: 'find all the datos of a Plan maestro.',
  params: {
    type: 'object',
    properties: {
      planMaestroId: { type: 'integer' },
    },
    required: ['planMaestroId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
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
              tipoProyecto: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...TipoDeProyecto,
                  ...responseProperties,
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
  },
};

module.exports = { findOneDatosDeProyectoSchema };
