const path = require('path');
const csvToJson = require('convert-csv-to-json');

const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { planMaestro } = require('./properties/planMaestro');

const periodos = path.join(__dirname, '../../../../../../../core/src/drivers/db/CSVFiles/periodos.csv');
const sesiones = path.join(__dirname, '../../../../../../../core/src/drivers/db/CSVFiles/sesiones.csv');

const convertCSVtoJSON = (data) => {
  const dataJson = csvToJson.fieldDelimiter(',').getJsonFromCsv(data);
  return dataJson.map((item) => parseInt(item.id, 10));
};

const findAllPlanMaestroSchema = {
  tags: ['Planes Maestros'],
  description: 'find all planes maestros.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
  },
  querystring: { // Aquí se define el esquema para los parámetros de consulta
    type: 'object',
    properties: {
      periodoId: {
        type: 'integer',
        enum: convertCSVtoJSON(periodos),
        description: 'Periodo de la consulta',
      },
      sesionId: {
        type: 'integer',
        enum: convertCSVtoJSON(sesiones),
        description: 'Sesion de la consulta',
      },
    },
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
              ...planMaestro,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllPlanMaestroSchema };
